import { kindTypes } from '@libs/client/generateKinds';
import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

export interface GetProductFaveResponse {
  ok: boolean;
  isFavorite: boolean;
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

  const isExist = await client?.favorite.findFirst({
    where: {
      productId: cleanProductId,
      userId: cleanUserId
    }
  });

  const recordId = await client?.record.findFirst({
    where: {
      productId: cleanProductId,
      userId: cleanUserId
    }
  });

  if (!isExist) {
    await client?.favorite.create({
      data: {
        user: {
          connect: {
            id: cleanUserId
          }
        },
        product: {
          connect: {
            id: cleanProductId
          }
        }
      }
    });

    await client?.record.create({
      data: {
        kind: 'Fav',
        user: {
          connect: {
            id: cleanUserId
          }
        },
        product: {
          connect: {
            id: cleanProductId
          }
        }
      }
    });

    return res.json({
      ok: true,
      isFavorite: true
    });
  }

  await client?.favorite.delete({
    where: {
      id: isExist?.id
    }
  });

  await client?.record.delete({
    where: {
      id: recordId?.id
    }
  });

  return res.json({
    ok: true,
    isFavorite: false
  });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true
  })
);
