import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPICommunitiesWriteReturn {
  ok: boolean;
  id: number;
}

const CommunityWrite: NextApiHandler = async (req, res) => {
  const {
    session: { user },
    body: { title, question }
  } = req;

  const createdPost = await client.post.create({
    data: {
      question: title,
      description: question,
      user: {
        connect: {
          id: user?.id
        }
      }
    },
    select: {
      id: true
    }
  });

  return res.status(200).json({
    ok: true,
    id: createdPost.id
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: CommunityWrite,
    isPrivate: true
  })
);
