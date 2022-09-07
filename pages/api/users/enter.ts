import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const token = await client.token.create({
    data: {
      payload: '1234',
      user: {
        // connectOrCreate
        // If user exists, connect the user and the token,
        // If not, create a user using `create` field.
        connectOrCreate: {
          where: {
            ...payload
          },
          create: {
            name: 'Anonymous',
            ...payload
          }
        }
      }
    }
  });

  console.log(token);

  res.status(200).json({ ok: true });
};

export default withHandler('POST', handler);
