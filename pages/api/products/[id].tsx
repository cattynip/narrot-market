import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Product, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export interface GetProductResponse {
  ok: boolean;
  product: Product & User;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    query: { id }
  } = req;

  console.log(req.query);

  if (!id) return res.json({ ok: false });

  const foundProduct = await client?.product.findUnique({
    where: {
      id: +id.toString()
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

  return res.json({
    ok: true,
    product: foundProduct
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
