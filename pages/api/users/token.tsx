import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
const UserTokenHandler: NextApiHandler = async (req, res) => {
  const {
    body: { token: tokenValue }
  } = req;

  if (!tokenValue) {
    return res.status(422).json({
      ok: false,
      error: 'You should send token value.'
    });
  }

  const foundToken = await client.token.findUnique({
    where: {
      value: tokenValue
    }
  });

  if (!foundToken) {
    return res.status(404).json({
      ok: false,
      error: 'API Token is not found.'
    });
  }

  await client.token.delete({
    where: {
      id: foundToken.id
    }
  });

  req.session.user = {
    id: foundToken.userId
  };

  await req.session.save();

  return res.status(200).json({
    ok: true,
    message: 'Your are logged in!'
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: UserTokenHandler
  })
);
