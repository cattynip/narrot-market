import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';

interface GetStreamsStream {
  id: number;
  name: string;
}

export interface GetStreamsReturn extends ResponseType {
  foundStreams: GetStreamsStream[];
}

export interface PostStreamReturn extends ResponseType {
  createdStreamId: number;
}

export interface PostStreamBody {
  name: string;
  price: number;
  description?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const { method } = req;

  if (method === 'GET') {
    const foundStreams = await client?.stream.findMany({
      select: {
        id: true,
        name: true
      }
    });

    return res.json({
      ok: true,
      foundStreams
    });
  }

  if (method === 'POST') {
    const {
      body: { name, price, description },
      session: { user }
    } = req;

    if (!user?.id || !name || !price) return res.json({ ok: false });

    const cleanUserId = +user.id.toString();

    const createdStream = await client?.stream.create({
      data: {
        name,
        price: +price,
        description,
        user: {
          connect: {
            id: cleanUserId
          }
        }
      },
      select: {
        id: true
      }
    });

    return res.json({
      ok: true,
      createdStreamId: createdStream
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: true
  })
);
