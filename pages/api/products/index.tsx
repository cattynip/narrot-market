import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface IProduct {
  id: number;
  name: string;
  price: number;
  descriptoin: string;
  comments: number;
  userId: number;
  userName: string;
  userAvatar: string;
  _count: {
    favourites: number;
  };
}

export interface IAPIProductsReturn {
  ok: boolean;
  datas: IProduct[];
}

const ProductGet: NextApiHandler = async (req, res) => {
  const products = await client.product.findMany({
    include: {
      _count: true
    }
  });

  return res.status(200).json({
    ok: true,
    datas: products
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: ProductGet,
    isPrivate: true
  })
);
