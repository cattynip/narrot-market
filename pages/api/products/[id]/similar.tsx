import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface SimilarProduct {
  id: number;
  name: string;
  price: number;
}

export interface IAPISimilarProductReturn {
  ok: boolean;
  similarProducts: SimilarProduct[];
}

const SimilarProductsGet: NextApiHandler = async (req, res) => {
  const {
    query: { id: productId }
  } = req;

  if (!productId || typeof productId !== 'string') {
    return res.status(402).json({
      ok: false,
      message: ''
    });
  }

  const cleanProductId = cleanId(productId);

  const product = await client.product.findUnique({
    where: {
      id: cleanProductId
    },
    select: {
      id: true,
      name: true
    }
  });

  const term = product?.name.split(' ').map(word => ({
    name: {
      contains: word
    }
  }));

  const similarProducts = await client.product.findMany({
    where: {
      OR: term,
      NOT: {
        id: cleanProductId
      }
    },
    select: {
      id: true,
      name: true,
      price: true
    }
  });

  return res.status(200).json({
    ok: true,
    similarProducts
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: SimilarProductsGet,
    isPrivate: true
  })
);
