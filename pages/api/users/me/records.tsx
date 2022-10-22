import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { Kind } from '@prisma/client';
import { generatedKindType } from '@libs/client/generateKinds';

interface FoundRecordsItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    records: { userId: number }[];
    _count: {
      records: number;
    };
  };
}

export interface GetRecordsResponse extends ResponseType {
  kind: generatedKindType;
  foundItems: FoundRecordsItem[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    query: { kind },
    session: { user }
  } = req;

  if (!user?.id || !kind) return res.status(401).json({ ok: false });

  const cleanUserId = +user?.id.toString();
  const cleanKind = kind.toString();
  const generatedKind = (cleanKind.charAt(0).toUpperCase() +
    cleanKind.slice(1)) as Kind;

  const foundItems = await client.record.findMany({
    where: {
      userId: cleanUserId,
      kind: generatedKind
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          records: {
            where: {
              kind: 'Fav'
            },
            select: {
              userId: true
            }
          },
          _count: {
            select: {
              records: true
            }
          }
        }
      }
    }
  });

  return res.json({
    ok: true,
    kind: generatedKind,
    foundItems
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
