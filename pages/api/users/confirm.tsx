import { withIronSessionApiRoute } from 'iron-session/next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  // The Session will be injected by `withIronSessionApiRoute`.
  const { token } = req.body;

  const exists = await client.token.findUnique({
    where: {
      payload: token
    },
    // Include === populate in mongoose.
    include: {
      user: true
    }
  });

  if (!exists) return res.status(404).end();

  // req.session.user = {
  //   id: exists.userId,
  // }

  // If you go to Application > Cookies > http://localhost:300, I will see a cookie.
  await req.session.save();

  return res.json({ ok: true, confirm: true });
};

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'narrotsession',
  password: process.env.SESSION_PASSWORD!
});
