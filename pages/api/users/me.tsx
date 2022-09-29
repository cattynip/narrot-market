import { withIronSessionApiRoute } from 'iron-session/next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id
    }
  });

  console.log(profile);

  return res.status(200).json({
    ok: true,
    profile
  });
};

export default withIronSessionApiRoute(withHandler('GET', handler), {
  cookieName: 'narrotsession',
  password: process.env.SESSION_PASSWORD!
});
