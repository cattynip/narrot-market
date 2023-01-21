import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { NextApiHandler } from 'next';

const ProductGet: NextApiHandler = async (req, res) => {
  const products = await client.product.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      comments: true,
      favourites: {
        select: {
          id: true,
          userId: true
        }
      }
    }
  });

  return res.status(200).json({
    ok: true,
    datas: products
  });
};

export default withHandler({
  method: 'GET',
  handler: ProductGet
});
