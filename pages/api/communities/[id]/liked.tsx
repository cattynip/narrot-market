import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPICommunitiesLikeReturn {
  ok: boolean;
}

const CommunityPostLiked: NextApiHandler = async (req, res) => {
  const {
    query: { id: postId },
    session: { user },
    body: { answerId }
  } = req;

  if (!postId || typeof postId !== 'string') {
    return res.status(402).json({
      ok: false,
      message: ''
    });
  }

  const cleanPostId = cleanId(postId);
  const cleanAnswerId = cleanId(answerId);

  const foundPost = await client.post.findUnique({
    where: {
      id: cleanPostId
    }
  });

  if (!foundPost) {
    return res.status(404).json({
      ok: false,
      message: 'The Post is not found.'
    });
  }

  const foundAnswer = await client.answer.findUnique({
    where: {
      id: cleanAnswerId
    }
  });

  if (!foundAnswer) {
    return res.status(404).json({
      ok: false,
      message: 'Answer is not found.'
    });
  }

  const foundLiked = await client.like.findFirst({
    where: {
      answerId: cleanAnswerId,
      userId: user?.id
    },
    select: {
      id: true
    }
  });

  if (!foundLiked) {
    await client.like.create({
      data: {
        answer: {
          connect: {
            id: cleanAnswerId
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
  }

  await client.like.delete({
    where: {
      id: foundLiked?.id
    }
  });

  return res.status(200).json({
    ok: true
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: CommunityPostLiked,
    isPrivate: true
  })
);
