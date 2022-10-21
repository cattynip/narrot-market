import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import { Post } from '@prisma/client';
import client from '@libs/server/client';

export interface GetPostPost extends Post {
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
  foundPosts: GetPostPost[];
}

export interface PostPostReponse {
  ok: boolean;
  createdPost: Post;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | FailResponseType>
): Promise<any> => {
  const {
    body,
    method,
    query,
    session: { user }
  } = req;

  if (method === 'GET') {
    if (!query.latitude || !query.longitude)
      return res
        .status(401)
        .json({ ok: false, reason: 'Latitude or Longitude do not exist.' });

    const latitude = parseFloat(query.latitude.toString());
    const longitude = parseFloat(query.longitude.toString());

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
      },
      where: {
        latitude: {
          gte: latitude - 0.01,
          lte: latitude + 0.01
        },
        longitude: {
          gte: longitude - 0.01,
          lte: longitude + 0.01
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
      return res
        .status(401)
        .json({ ok: false, reason: 'Question is not exist or blank.' });

    const createdPost = await client?.post.create({
      data: {
        latitude: body.latitude,
        longitude: body.longitude,
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
  }
};

export default withApiSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
    isPrivate: true
  })
);
