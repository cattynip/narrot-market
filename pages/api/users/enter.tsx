import { randomChar } from '@libs/server/cleanValue';
import client from '@libs/server/client';
import { tokenMessage } from '@libs/server/twilioClient';
import withHandler from '@libs/server/withHandler';
import { NextApiHandler } from 'next';

const UserEnterHandler: NextApiHandler = async (req, res) => {
  const {
    body: { name: userName, email: userEmail, phone: userPhone }
  } = req;

  if (!userName) {
    return res.status(422).json({
      ok: false,
      message: 'You have to enter your name.'
    });
  }

  const sameNameUser = await client.user.findUnique({
    where: {
      name: userName
    },
    select: {
      id: true,
      phone: true,
      email: true
    }
  });

  const payload = userPhone
    ? {
        phone: userPhone
      }
    : {
        email: userEmail
      };

  if (!sameNameUser) {
    const createdUser = await client.user.create({
      data: {
        name: userName,
        ...payload
      }
    });

    const createdToken = await client.token.create({
      data: {
        value: randomChar(5),
        user: {
          connect: {
            id: createdUser.id
          }
        }
      }
    });

    if (userPhone) {
      tokenMessage(createdToken.value, userPhone);
    }

    if (userEmail) {
      // tokenEmail(createdToken.value, userEmail);
    }

    return res.status(200).json({
      ok: true
    });
  }

  if (
    (sameNameUser.phone && !userPhone) ||
    (sameNameUser.email && !userEmail)
  ) {
    return res.status(422).json({
      ok: false,
      message: 'The payloads are different.'
    });
  }

  if (
    (sameNameUser.phone && userPhone && sameNameUser.phone !== userPhone) ||
    (sameNameUser.email && userEmail && sameNameUser.email !== userEmail)
  ) {
    return res.status(422).json({
      ok: false,
      message: `The ${
        userPhone ? 'Phone Number' : 'Email Address'
      } are different`
    });
  }

  const createdToken = await client.token.create({
    data: {
      value: randomChar(5),
      user: {
        connect: {
          id: sameNameUser.id
        }
      }
    }
  });

  if (userPhone) {
    tokenMessage(createdToken.value, userPhone);
  }

  if (userEmail) {
    // tokenEmail(createdToken.value, userEmail);
  }

  return res.status(200).json({
    ok: true
  });
};

export default withHandler({
  method: 'POST',
  handler: UserEnterHandler
});
