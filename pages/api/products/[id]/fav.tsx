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
    session: { user }
  } = req;

  if (!id || typeof id !== 'string' || !user?.id) {
    return res.status(402).json({
      ok: false,
      message: ''
    });
  }

  const cleanProductId = cleanId(id);

  const foundFav = await client.favourite.findFirst({
    where: {
      productId: cleanProductId,
      userId: user.id
    },
    select: { id: true }
  });

  if (!foundFav) {
    await client.favourite.create({
      data: {
        product: {
          connect: {
            id: cleanProductId
          }
        },
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    await client.record.create({
      data: {
        product: {
          connect: {
            id: cleanProductId
          }
        },
        user: {
          connect: {
            id: user.id
          }
        },
        type: 'Fav'
      }
    });

    return res.status(200).json({
      ok: true
    });
  }

  await client.favourite.delete({
    where: {
      id: foundFav.id
    }
  });

  const foundRecord = await client.record.findFirst({
    where: {
      productId: cleanProductId,
      userId: user.id,
      type: 'Fav'
    },
    select: {
      id: true
    }
  });

  await client.record.delete({
    where: {
      id: foundRecord?.id
    }
  });

  return res.status(200).json({
    ok: true
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: MakeProductFav,
    isPrivate: true
  })
);
