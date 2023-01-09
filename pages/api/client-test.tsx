import client from '@libs/client';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const createdUser = await client.user.create({
    data: {
      email: 'cattynip.cattynip@gmail.com',
      name: 'Cattynip'
    }
  });

  return res.status(200).json({
    ok: true,
    data: {
      createdUser
    }
  });
};

export default handler;
