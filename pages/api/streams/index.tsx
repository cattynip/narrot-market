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
    const { page } = req.query;

    if (!page || +page <= 0) return res.status(401).json({ ok: false });

    const cleanPage = +page - 1;
    const streamPerPage = 10;

    const foundStreams = await client?.stream.findMany({
      select: {
        id: true,
        name: true
      },
      take: streamPerPage,
      skip: cleanPage * streamPerPage
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

    const {
      result: {
        uid,
        rtmps: { streamKey, url }
      }
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_AC}/stream/live_inputs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CF_STREAM_ID}`
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 20}}`
        }
      )
    ).json();

    const cleanUserId = +user.id.toString();

    console.log(cleanUserId);

    const createdStream = await client?.stream.create({
      data: {
        name,
        price: +price,
        description,
        cloudflareId: uid + '',
        cloudflareKey: streamKey + '',
        cloudflareUrl: url + '',
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
      createdStreamId: createdStream.id
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
