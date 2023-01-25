import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface FoundProduct {
  name: string;
  price: number;
  description: string;
  userName: string;
  userAvatar: string;
}

export interface IAPIProductReturn {
  ok: boolean;
  foundProduct: FoundProduct;
  isFav: boolean;
}

const ProductGet: NextApiHandler = async (req, res) => {
  const {
    query: { id: productId },
    session: { user }
  } = req;

  if (!productId || typeof productId !== 'string' || !user?.id) {
    return res.status(402).json({
      ok: false,
      message: ''
    });
  }

  const cleanProductId = cleanId(productId);

  const foundProduct = await client.product.findUnique({
    where: {
      id: cleanProductId
    },
    select: {
      name: true,
      price: true,
      description: true,
      userName: true,
      userAvatar: true
    }
  });

  if (!foundProduct) {
    return res.status(404).json({
      ok: false,
      message: 'Product NOT FOUND.'
    });
  }

  const isFav = Boolean(
    await client.favourite.findFirst({
      where: {
        productId: cleanProductId,
        userId: user?.id
      },
      select: {
        id: true
      }
    })
  );

  return res.status(200).json({
    ok: true,
    foundProduct,
    isFav
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: ProductGet,
    isPrivate: true
  })
);
