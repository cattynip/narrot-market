import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import { Post } from '@prisma/client';
import client from '@libs/server/client';

export interface GetPostsPost extends Post {
  user: {
    name: string;
  };
  _count: {
    wonderings: number;
    answers: number;
  };
}

export interface GetPostsResponse {
  ok: boolean;
  foundPosts: GetPostsPost[];
}

export interface PostPostReponse {
  ok: boolean;
  createdPost: Post;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    body,
    method,
    session: { user }
  } = req;

  if (method === 'GET') {
    const foundPosts = await client?.post.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            wonderings: true,
            answers: true
          }
        }
      }
    });

    return res.json({
      ok: true,
      foundPosts
    });
  }

  if (method === 'POST') {
    if (!body.question || body.question.trim() === '')
      return res.status(401).json({ ok: false });

    try {
      const createdPost = await client?.post.create({
        data: {
          question: body.question,
          user: {
            connect: {
              id: user?.id
            }
          }
        }
      });

      return res.json({
        ok: true,
        createdPost
      });
    } catch (error) {
      return res.json({
        ok: false,
        error
      });
    }
  }
};

export default withApiSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
    isPrivate: true
  })
);
