import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

export interface GetProductResponse {
  ok: boolean;
  created: boolean;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    query: { id },
    session: { user }
  } = req;

  if (!id || !user) return res.json({ ok: false });

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
      created: true
    });
  }

  const deletedFavorite = await client?.favorite.delete({
    where: {
      id: isExist?.id
    }
  });

  return res.json({
    ok: true,
    created: false
  });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true
  })
);
