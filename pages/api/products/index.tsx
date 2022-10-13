import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { Product } from '@prisma/client';

export interface GetProductResponse {
  ok: boolean;
  products: Product[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  if (req.method === "GET") {
    const products = await client.product.findMany({});

    return res.json({
      ok: true,
      products,
    })
  }

  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user }
    } = req;

    const createdProduct = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "This field will be filled.",
        user: {
          connect: {
            id: user?.id,
          }
        }
      },
    });

    return res.json({
      ok: true,
      productId: createdProduct.id,
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
    isPrivate: true
  })
);
