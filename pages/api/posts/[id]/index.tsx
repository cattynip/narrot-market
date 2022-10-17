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
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | FailResponseType>
): Promise<any> => {
  const {
    query: { id }
  } = req;

  if (!id)
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
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
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
    foundPost
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
