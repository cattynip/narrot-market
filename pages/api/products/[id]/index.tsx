import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Product } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ProductWithUser extends Product {
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

export interface RelatedProducts {
  id: number;
  userId: number;
  name: string;
  price: number;
  image: string;
  user: {
    name: string;
    avatar: string;
  };
}

export interface GetProductResponse extends ResponseType {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: RelatedProducts[];
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

  const isLiked = Boolean(
    await client?.favorite.findFirst({
      where: {
        productId: foundProduct.id,
        userId: user.id
      },
      select: {
        id: true
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
