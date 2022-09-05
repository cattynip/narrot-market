import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    where: {
      ...payload
    },
    create: {
      name: 'Anonymous',
      ...payload
    },
    update: {}
  });

  console.log('Upsert User : ', user);

  res.status(200).json({ user });
};

export default withHandler('POST', handler);
