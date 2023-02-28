import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface Message {
  content: string;
  userName: string;
  userAvatar: string;
}

interface FoundStream {
  id: number;
  title: string;
  description: string;
  productName: string;
  price: number;
  userId: number;
  userAvatar: string;
  userName: string;
  messages: Message[];
}

export interface IAPIGetStreamReturn {
  ok: boolean;
  foundStream: FoundStream;
}

const GetStream: NextApiHandler = async (req, res) => {
  const {
    query: { id: streamId }
  } = req;

  if (!streamId || typeof streamId !== 'string') {
    return res.status(402).json({
      ok: false,
      message: 'You have to put the value of the id correctly.'
    });
  }

  const cleanStreamId = cleanId(streamId);

  const foundStream = await client.stream.findUnique({
    where: {
      id: cleanStreamId
    },
    include: {
      messages: {
        select: {
          content: true,
          userName: true,
          userAvatar: true
        }
      }
    }
  });

  if (!foundStream) {
    return res.status(404).json({
      ok: false,
      message: 'There are no streams that has an id of it.'
    });
  }

  return res.status(200).json({
    ok: true,
    foundStream
  });
};

export default withSession(
  withHandler({
    handler: GetStream,
    method: 'GET',
    isPrivate: true
  })
);
