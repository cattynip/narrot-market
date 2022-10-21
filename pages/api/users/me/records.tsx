import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { Kind } from '@prisma/client';

interface FoundRecordsItem {
  product: {
    name: string;
    image: string;
    price: number;
    id: number;
    _count: {
      fav: number;
    };
  };
}

export interface GetRecordsResponse extends ResponseType {
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

  const cleanId = +user?.id.toString();
  const cleanKind = (kind.toString().charAt(0).toUpperCase() +
    kind.toString().slice(1)) as Kind;

  const foundItems = await client.record.findMany({
    where: {
      userId: cleanId,
      kind: cleanKind
    },
    include: {
      product: {
        select: {
          name: true,
          image: true,
          price: true,
          id: true,
          _count: {
            select: {
              fav: true
            }
          }
        }
      }
    }
  });

  return res.json({
    ok: true,
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
