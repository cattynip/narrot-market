import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Product } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ProductUser {
  id: number;
  name: string;
  avatar: string;
}

export interface ProductWithUser extends Product {
  user: ProductUser;
}

export interface RelatedProductUser {
  avatar: string;
  name: string;
}

export interface RelatedProduct {
  id: number;
  userId: number;
  name: string;
  price: number;
  image: string;
  user: RelatedProductUser;
}

export interface GetProductResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: RelatedProduct[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    query: { id }
  } = req;

  if (!id) return res.json({ ok: false });

  const cleanId = +id.toString();

  const foundProduct = await client?.product.findUnique({
    where: {
      id: cleanId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    }
  });

  if (!foundProduct) return res.status(404).json({ ok: false });

  const terms = foundProduct?.name.split(' ').map(word => ({
    name: {
      contains: word
    }
  }));

  const relatedProducts = await client?.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: foundProduct.id
        }
      }
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          name: true
        }
      }
    }
  });

  return res.json({
    ok: true,
    product: foundProduct,
    relatedProducts
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
