import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPICommunitiesReturn {
  ok: boolean;
}

const CommunityPostWondered: NextApiHandler = async (req, res) => {
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

  const foundWondering = await client.wondering.findFirst({
    where: {
      postId: cleanPostId,
      userId: user?.id
    },
    select: {
      id: true
    }
  });

  if (!foundWondering) {
    await client.wondering.create({
      data: {
        post: {
          connect: {
            id: cleanPostId
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

  await client.wondering.delete({
    where: {
      id: foundWondering?.id
    }
  });

  return res.status(200).json({
    ok: true
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: CommunityPostWondered,
    isPrivate: true
  })
);
