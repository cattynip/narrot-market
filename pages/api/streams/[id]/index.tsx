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
}

interface GetStreamStream {
  name: string;
  description: string;
  user: StreamUser;
  message: StreamMessage;
}

export interface GetStreamReturn extends ResponseType {
  foundStream: GetStreamStream;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    query: { id }
  } = req;

  if (!id)
    return res.status(401).json({
      ok: false
    });

  const cleanStreamId = +id?.toString();

  const foundStream = await client?.stream.findUnique({
    where: {
      id: cleanStreamId
    },
    select: {
      name: true,
      description: true,
      messages: {
        select: {
          message: true,
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
