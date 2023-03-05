import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPIEditProfileReturn {
  ok: boolean;
}

const EditProfile: NextApiHandler = async (req, res) => {
  const {
    session: { user },
    body: { name, email, phone, avatar }
  } = req;

  if (!user) {
    return res.status(402).json({
      ok: false
    });
  }

  if ((!email && !phone) || (email && phone)) {
    return res.status(402).json({
      ok: false,
      message: 'You have to put the one of them.'
    });
  }

  const foundUser = await client.user.findUnique({
    where: {
      id: user.id
    },
    select: { avatar: true }
  });

  console.log(avatar);

  await client.user.update({
    where: {
      id: user.id
    },
    data: {
      name,
      email,
      phone,
      avatar: avatar ? avatar : foundUser?.avatar
    }
  });

  return res.status(200).json({
    ok: true
  });
};

export default withSession(
  withHandler({
    handler: EditProfile,
    method: 'POST',
    isPrivate: true
  })
);
