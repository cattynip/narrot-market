import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface FoundProductFav {
  userId: number;
}

interface FoundProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  userName: string;
  userAvatar: string;
  favourites: FoundProductFav[];
}

export interface IAPIProductReturn {
  ok: boolean;
  foundProduct: FoundProduct;
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
      image: true,
      userName: true,
      userAvatar: true,
      favourites: {
        where: {
          userId: user?.id
        },
        select: {
          userId: true
        }
      }
    }
  });

  if (!foundProduct) {
    return res.status(404).json({
      ok: false,
      message: 'Product NOT FOUND.'
    });
  }

  return res.status(200).json({
    ok: true,
    foundProduct
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: ProductGet,
    isPrivate: true
  })
);
