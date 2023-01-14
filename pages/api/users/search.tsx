import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { NextApiHandler } from 'next';
import withSession from '@libs/server/withSession';

const UserSearchHandler: NextApiHandler = async (req, res) => {
  const foundUser = await client.user.findUnique({
    where: {
      id: req.session?.user.id
    }
  });

  if (!foundUser) {
    return res.status(404).json({
      ok: false
    });
  }

  return res.status(200).json({
    ok: true,
    user: foundUser
  });
};

export default withSession(withHandler('GET', UserSearchHandler));
