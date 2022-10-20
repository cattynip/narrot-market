import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';

export interface PostPostAnswerReturn {
  ok: boolean;
  answer: {
    id: number;
    createdAt: Date;
  };
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | FailResponseType>
): Promise<any> => {
  const {
    query: { id },
    session: { user },
    body: { answer }
  } = req;

  if (!id || !user?.id) return res.status(401).json({ ok: false });

  const cleanId = +id.toString();

  const createdAnswer = await client?.answer.create({
    data: {
      answer,
      post: {
        connect: {
          id: cleanId
        }
      },
      user: {
        connect: {
          id: user.id
        }
      }
    },
    select: {
      id: true,
      answer: true,
      createdAt: true
    }
  });

  return res.json({
    ok: true,
    answer: createdAnswer
  });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true
  })
);
