import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface UserId {
  userId: number;
}

interface CommunityPostAnswer {
  id: number;
  answer: string;
  userId: number;
  userName: string;
  userAvatar: string;
  createdAt: Date;
  updatedAt: Date;
  likes: UserId[];
  helps: UserId[];
  _count: {
    likes: number;
    helps: number;
  };
}

export interface CommunityPost {
  id: number;
  question: string;
  description: string;
  userId: number;
  userName: string;
  userAvatar: string;
  createdAt: Date;
  updatedAt: Date;
  wonderings: UserId[];
  answers: CommunityPostAnswer[];
  _count: {
    wonderings: number;
    answers: number;
  };
}

export interface IAPICommunitiesReturn {
  ok: boolean;
  foundPost: CommunityPost;
}

const CommunityPostGet: NextApiHandler = async (req, res) => {
  const {
    query: { id: postId },
    session: { user }
  } = req;

  if (!postId || typeof postId !== 'string') {
    return res.status(402).json({
      ok: false,
      message: ''
    });
  }

  const cleanPostId = cleanId(postId);

  const foundPost = await client.post.findUnique({
    where: {
      id: cleanPostId
    },
    include: {
      _count: true,
      wonderings: {
        where: {
          userId: user?.id
        },
        select: {
          userId: true
        }
      },
      answers: {
        include: {
          _count: true,
          likes: {
            where: {
              userId: user?.id
            },
            select: {
              userId: true
            }
          },
          helps: {
            where: {
              userId: user?.id
            },
            select: {
              userId: true
            }
          }
        }
      }
    }
  });

  if (!foundPost) {
    return res.status(404).json({
      ok: false,
      message: 'Post can not be found.'
    });
  }

  res.revalidate(`/community/${foundPost.id}`);

  return res.status(200).json({
    ok: true,
    foundPost
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: CommunityPostGet,
    isPrivate: true
  })
);
