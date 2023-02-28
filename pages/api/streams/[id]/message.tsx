import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface ISendMessageBody {
  content: string;
}

export interface IAPISendMessageReturn {
  ok: boolean;
}

const SendMessage: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    session: { user },
    body: { content }
  } = req;

  if (!id || typeof id !== 'string' || !user) {
    return res.status(402).json({
      ok: false,
      message: 'You have to put the values corrently.'
    });
  }

  const cleanStreamId = cleanId(id);

  const foundStream = await client.stream.findUnique({
    where: {
      id: cleanStreamId
    }
  });

  if (!foundStream) {
    return res.status(404).json({
      ok: false,
      message: 'The Stream that has the id can not be found.'
    });
  }

  await client.streamMessage.create({
    data: {
      content: content,
      stream: {
        connect: {
          id: cleanStreamId
        }
      },
      user: {
        connect: {
          id: user.id
        }
      }
    }
  });

  return res.status(200).json({
    ok: true
  });
};

export default withSession(
  withHandler({
    handler: SendMessage,
    method: 'POST',
    isPrivate: true
  })
);
