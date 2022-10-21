import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

export interface GetProductFaveResponse {
  ok: boolean;
  isWondering: boolean;
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

  const isExist = await client?.favorite.findFirst({
    where: {
      productId: cleanId,
      userId: user.id
    }
  });

  if (!isExist) {
    const createdFavorite = await client?.favorite.create({
      data: {
        user: {
          connect: {
            id: user.id
          }
        },
        product: {
          connect: {
            id: cleanId
          }
        }
      }
    });

    return res.json({
      ok: true,
      isWondering: true
    });
  }

  const deletedFavorite = await client?.favorite.delete({
    where: {
      id: isExist?.id
    }
  });

  return res.json({
    ok: true,
    isWondering: false
  });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true
  })
);