import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPICreateStreamReturn {
  ok: boolean;
  id: number;
}

const CreateStream: NextApiHandler = async (req, res) => {
  const {
    body: { name, productName, price, description },
    session: { user }
  } = req;

  if (!user || !user.id) {
    return res.status(402).json({
      ok: false,
      message: 'You have to put the user id value correctly'
    });
  }

  const createdStream = await client.stream.create({
    data: {
      productName: productName,
      title: name,
      price: +price,
      description: description,
      user: {
        connect: {
          id: user.id
        }
      }
    },
    select: {
      id: true
    }
  });

  return res.status(200).json({
    ok: true,
    id: createdStream.id
  });
};

export default withSession(
  withHandler({
    handler: CreateStream,
    method: 'POST',
    isPrivate: true
  })
);
