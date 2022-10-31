import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ProductWithUser {
  id: number;
  name: string;
  avatar: string;
}

export interface RelatedProduct {
  id: number;
  userId: number;
  name: string;
  price: number;
  image: string;
  user: ProductWithUser;
}

export interface ProductProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  user: ProductWithUser;
}

export interface GetProductResponse extends ResponseType {
  ok: boolean;
  product: ProductProduct;
  relatedProducts: RelatedProduct[];
  isLiked: boolean;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | FailResponseType>
): Promise<any> => {
  const {
    query: { id },
    session: { user }
  } = req;

  if (!id || !user)
    return res.json({
      ok: false,
      reason: [
        !id ? 'Id is not exist.' : 'Id is Ok.',
        !user ? 'User is not exist.' : 'User is Ok.'
      ]
    });

  const cleanProductId = +id.toString();
  const cleanUserId = +user.id.toString();

  const foundProduct = await client?.product.findUnique({
    where: {
      id: cleanProductId
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    }
  });

  if (!foundProduct)
    return res
      .status(404)
      .json({ ok: false, reason: 'The Product is not found.' });

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
          not: cleanProductId
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
          id: true,
          avatar: true,
          name: true
        }
      }
    }
  });

  const isLiked = Boolean(
    await client?.favorite.findFirst({
      where: {
        productId: cleanProductId,
        userId: cleanUserId
      }
    })
  );

  return res.json({
    ok: true,
    product: foundProduct,
    relatedProducts,
    isLiked
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true,
    beChecked: true
  })
);
