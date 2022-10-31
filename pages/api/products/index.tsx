import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { Favorite, Product } from '@prisma/client';

export interface GetProductsProduct extends Product {
  id: number;
  name: string;
  price: number;
  image: string;
  favs: Favorite[];
  _count: {
    favs: number;
  };
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
      select: {
        id: true,
        image: true,
        name: true,
        price: true,
        favs: true,
        _count: {
          select: {
            favs: true
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
      body: { name, price, description, productImage },
      session: { user }
    } = req;

    if (!user?.id)
      return res.status(401).json({
        ok: false
      });

    const cleanUserId = +user?.id.toString();

    const createdProduct = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: productImage,
        user: {
          connect: {
            id: cleanUserId
          }
        }
      }
    });

    const cleanProductId = +createdProduct.id.toString();

    // await client.sale.create({
    //   data: {
    //     product: {
    //       connect: {
    //         id: cleanProductId
    //       }
    //     },
    //     user: {
    //       connect: {
    //         id: cleanUserId
    //       }
    //     }
    //   }
    // });

    await client.record.create({
      data: {
        kind: 'Sale',
        product: {
          connect: {
            id: cleanProductId
          }
        },
        user: {
          connect: {
            id: cleanUserId
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
