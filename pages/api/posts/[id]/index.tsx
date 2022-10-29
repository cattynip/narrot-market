import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import { Post } from '@prisma/client';

export interface GetPostUser {
  id: number;
  name: string;
  avatar: string;
}

export interface GetPostAnswer {
  id: number;
  answer: string;
  user: GetPostUser;
  createdAt: Date;
}

export interface GetPostCount {
  wonderings: number;
  answers: number;
}

export interface GetPostPost extends Post {
  user: GetPostUser;
  answers: GetPostAnswer[];
  _count: GetPostCount;
}

export interface GetPostResponse {
  ok: boolean;
  foundPost: GetPostPost;
  isWondering: boolean;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | FailResponseType>
): Promise<any> => {
  const {
    query: { id },
    session: { user }
  } = req;

  if (!id || !user?.id)
    return res.status(401).json({ ok: false, reason: 'Id is not exist.' });

  const cleanId = +id?.toString();

  const foundPost = await client?.post.findUnique({
    where: {
      id: cleanId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      answers: {
        take: 10,
        select: {
          answer: true,
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      },
      wonderings: {
        select: {
          userId: true
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

  const isWondering = Boolean(
    await client?.wondering.findFirst({
      where: {
        postId: cleanId,
        userId: user.id
      },
      select: {
        id: true
      }
    })
  );

  return res.json({
    ok: true,
    foundPost,
    isWondering
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
