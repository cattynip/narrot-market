import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';

interface StreamUser {
  id: number;
  name: string;
  avatar: string;
}

interface StreamMessage {
  message: string;
  user: StreamUser;
  id: number;
}

interface GetStreamStream {
  name: string;
  description: string;
  price: number;
  user: StreamUser;
  cloudflareId: string;
  cloudflareUrl?: string;
  cloudflareKey?: string;
  messages: StreamMessage[];
}

export interface GetStreamReturn extends ResponseType {
  foundStream: GetStreamStream;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    query: { id },
    session: { user }
  } = req;

  if (!id || !user?.id)
    return res.status(401).json({
      ok: false
    });

  const cleanUserId = +user?.id.toString();
  const cleanStreamId = +id?.toString();

  const foundStream = await client?.stream.findUnique({
    where: {
      id: cleanStreamId
    },
    include: {
      messages: {
        select: {
          message: true,
          id: true,
          user: {
            select: {
              avatar: true,
              id: true,
              name: true
            }
          }
        }
      },
      user: {
        select: {
          name: true,
          id: true,
          avatar: true
        }
      }
    }
  });

  const isOwner = foundStream?.user?.id === cleanUserId;

  if (foundStream && isOwner) {
    foundStream.cloudflareKey === 'Not Allowed';
    foundStream.cloudflareUrl === 'Not Allowed';
  }

  return res.json({
    ok: true,
    foundStream
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: true
  })
);
