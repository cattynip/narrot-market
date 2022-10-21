import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { Product } from '@prisma/client';

interface FavoritesInProduct {
  userId: number;
}

interface ProductCount {
  fav: number;
}

export interface GetProductsProduct extends Product {
  fav: FavoritesInProduct[];
  _count: ProductCount;
}

export interface GetProductsResponse {
  ok: boolean;
  products: GetProductsProduct[];
}

export interface PostProductsResponse extends ResponseType {
  ok: boolean;
  productId: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        fav: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            fav: true
          }
        }
      }
    });

    return res.json({
      ok: true,
      products
    });
  }

  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user }
    } = req;

    const createdProduct = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: 'This field will be filled.',
        user: {
          connect: {
            id: user?.id
          }
        }
      }
    });

    return res.json({
      ok: true,
      productId: createdProduct.id
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ['POST', 'GET'],
    handler,
    isPrivate: true
  })
);
