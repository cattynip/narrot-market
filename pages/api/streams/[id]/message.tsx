import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';

interface StreamMessage {
  id: number;
  message: string;
}

export interface StreamMessageReturn {
  ok: boolean;
  message: StreamMessage;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    query: { id },
    session: { user },
    body: { message }
  } = req;

  if (!id || !user?.id) return res.status(401).json({ ok: false });

  const cleanStreamId = +id.toString();
  const cleanUserId = +user.id.toString();

  const isExist = Boolean(
    await client.stream.findUnique({
      where: {
        id: cleanStreamId
      }
    })
  );

  if (!isExist) return res.status(404).json({ ok: false });

  const createdMessage = await client.message.create({
    data: {
      message,
      user: {
        connect: {
          id: cleanUserId
        }
      },
      stream: {
        connect: {
          id: cleanStreamId
        }
      }
    },
    select: {
      message: true,
      id: true
    }
  });

  return res.json({
    ok: true,
    message: createdMessage
  });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true
  })
);
