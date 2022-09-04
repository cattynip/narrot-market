import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userData = await client.user.create({
    data: {
      email: 'hi',
      name: 'hi'
    }
  });

  res.json({
    ok: true,
    data: {
      userData
    }
  });
}

export default handler;
