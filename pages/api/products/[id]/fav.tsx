import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface GetFav {
  id: number;
}

export interface IAPIGetProductFavReturn {
  ok: boolean;
  foundFav: GetFav;
}

export interface IAPIPostProductFavReturn {
  ok: boolean;
}

const MakeProductFav: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    session: { user },
    method: reqMethod
  } = req;

  if (!id || typeof id !== 'string') {
    return res.status(402).json({
      ok: false,
      message: ''
    });
  }

  const cleanProductId = cleanId(id);

  if (reqMethod === 'GET') {
    const foundFav = await client.favourite.findFirst({
      where: {
        productId: cleanProductId,
        userId: user?.id
      },
      select: {
        id: true
      }
    });

    if (!foundFav) {
      return res.status(404).json({
        ok: false,
        message: 'Favourite is not found.'
      });
    }

    return res.status(200).json({
      ok: true,
      foundFav
    });
  }

  if (reqMethod === 'POST') {
    if (!req.body?.favId) {
      await client.favourite.create({
        data: {
          product: {
            connect: {
              id: cleanProductId
            }
          },
          user: {
            connect: {
              id: user?.id
            }
          }
        }
      });

      return res.status(202).json({
        ok: true,
        message: 'Created Successfully'
      });
    }

    if (req.body.favId) {
      const {
        body: { favId }
      } = req;

      const cleanFavId = cleanId(favId);

      await client.favourite.delete({
        where: {
          id: cleanFavId
        }
      });

      return res.status(202).json({
        ok: true,
        message: 'Delete Successfully'
      });
    }
  }
};

export default withSession(
  withHandler({
    method: ['GET', 'POST'],
    handler: MakeProductFav,
    isPrivate: true
  })
);
