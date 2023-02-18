import cleanId, { convertKindToString } from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { RecordType } from '@prisma/client';
import { NextApiHandler } from 'next';

interface FoundRecords {
  id: number;
  productId: number;
  userId: number;
  type: RecordType;
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    comments: number;
    userId: number;
    userName: string;
    userAvatar: string;
    favourites: {
      id: number;
      productId: number;
      userId: number;
    }[];
    _count: {
      favourites: number;
    };
  };
}

export interface IAPIGetUserKindProductsReturns {
  ok: boolean;
  foundRecords: FoundRecords[];
}

const GetUserKindProducts: NextApiHandler = async (req, res) => {
  const {
    session: { user },
    query: { id, kind }
  } = req;

  if (!id || typeof id !== 'string' || !kind || isNaN(Number(kind)) || !user) {
    return res.status(402).json({
      ok: false,
      message: 'You have to put the values correctly.'
    });
  }

  const cleanUserId = cleanId(id);

  const foundUser = await client.user.findUnique({
    where: {
      id: cleanUserId
    },
    select: {
      id: true
    }
  });

  if (!foundUser) {
    return res.status(404).json({
      ok: false,
      message: 'We can not find the user.'
    });
  }

  const numberKind = Number(kind);

  if (!(1 <= numberKind && numberKind <= 3)) {
    return res.status(402).json({
      ok: false,
      message: 'You have to put the right values corrently.'
    });
  }

  const cleanKind = convertKindToString(numberKind);

  const foundRecords = await client.record.findMany({
    where: {
      userId: cleanUserId,
      type: cleanKind as RecordType
    },
    include: {
      product: {
        include: {
          favourites: {
            where: {
              userId: user.id
            }
          },
          _count: true
        }
      }
    }
  });

  return res.status(200).json({
    ok: true,
    foundRecords
  });
};

export default withSession(
  withHandler({
    handler: GetUserKindProducts,
    method: 'GET',
    isPrivate: true
  })
);
