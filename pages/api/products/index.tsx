import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
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
};

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
    isPrivate: true
  })
);
