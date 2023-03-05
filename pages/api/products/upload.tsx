import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPIProductsUploadReturn {
  ok: boolean;
  id: number;
}

const ProductUpload: NextApiHandler = async (req, res) => {
  const {
    session: { user },
    body: { name, price, description, image }
  } = req;

  if (!user) {
    return res.status(402).json({
      ok: false,
      message: 'User should exist.'
    });
  }

  const createdProduct = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image,
      user: {
        connect: {
          id: user?.id
        }
      }
    },
    select: {
      id: true
    }
  });

  await client.record.create({
    data: {
      product: {
        connect: {
          id: createdProduct.id
        }
      },
      user: {
        connect: {
          id: user.id
        }
      },
      type: 'Sale'
    }
  });

  return res.status(200).json({
    ok: true,
    id: createdProduct.id
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: ProductUpload,
    isPrivate: true
  })
);
