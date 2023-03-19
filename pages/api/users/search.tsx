import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { NextApiHandler } from 'next';
import withSession from '@libs/server/withSession';

export interface SearchedUser {
  id: number;
  name: string;
  phone: null;
  email: string;
  avatar: string;
}

const UserSearchHandler: NextApiHandler = async (req, res) => {
  const {
    session: { user }
  } = req;

  const foundUser = await client.user.findUnique({
    where: {
      id: user?.id
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

export default withSession(
  withHandler({
    method: 'GET',
    handler: UserSearchHandler,
    isPrivate: true
  })
);
