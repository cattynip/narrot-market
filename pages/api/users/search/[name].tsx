import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPIUserSearchForName {
  ok: boolean;
  id: number;
}

const UserSearchName: NextApiHandler = async (req, res) => {
  const {
    query: { name }
  } = req;

  if (!name || typeof name !== 'string') {
    return res.status(402).json({
      ok: false,
      message: 'You must put the value of name'
    });
  }

  const foundUser = await client.user.findUnique({
    where: {
      name
    }
  });

  if (!foundUser) {
    return res.status(404).json({
      ok: false,
      message: 'We can not find the user.'
    });
  }

  return res.status(200).json({
    ok: true,
    id: foundUser.id
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: UserSearchName,
    isPrivate: true
  })
);
