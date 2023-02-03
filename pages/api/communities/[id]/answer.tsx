import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPICommunitiesReturn {
  ok: boolean;
}

const CommunityWriteAnswer: NextApiHandler = async (req, res) => {
  const {
    session: { user },
    query: { id: postId },
    body: { answer }
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
    select: {
      id: true
    }
  });

  if (!foundPost) {
    return res.status(404).json({
      ok: false,
      message: 'Post can not be found.'
    });
  }

  await client.answer.create({
    data: {
      answer,
      post: {
        connect: {
          id: foundPost.id
        }
      },
      user: {
        connect: {
          id: user?.id
        }
      }
    }
  });

  return res.status(200).json({
    ok: true
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: CommunityWriteAnswer,
    isPrivate: true
  })
);
