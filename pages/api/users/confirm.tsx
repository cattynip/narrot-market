import { withApiSession } from '@libs/server/withSession';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { token } = req.body;

  const foundToken = await client.token.findUnique({
    where: {
      payload: token
    },
    include: {
      user: true
    }
  });

  if (!foundToken) return res.status(404).end();

  req.session.user = {
    id: foundToken.userId
  };

  await req.session.save();

  await client.token.deleteMany({
    where: {
      userId: foundToken.userId
    }
  });

  return res.json({ ok: true });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler
  })
);
