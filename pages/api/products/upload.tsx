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
    body: { name, price, description }
  } = req;

  const createdProduct = await client.product.create({
    data: {
      name,
      price: +price,
      description,
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
