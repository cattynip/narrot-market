import withHandler, {
  FailResponseType,
  ResponseType
} from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';

export interface GetPostResponse {
  ok: boolean;
  created: boolean;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | FailResponseType>
): Promise<any> => {
  const {
    query: { id },
    session: { user }
  } = req;

  console.log('Hello');
  if (!id || !user?.id)
    return res
      .status(401)
      .json({ ok: false, reason: 'Id or User id is not exist.' });

  const cleanId = +id?.toString();

  const isExist = await client?.wondering.findFirst({
    where: {
      userId: user.id,
      postId: cleanId
    },
    select: { id: true }
  });

  if (!isExist) {
    await client?.wondering.create({
      data: {
        post: {
          connect: {
            id: cleanId
          }
        },
        user: {
          connect: {
            id: user?.id
          }
        }
      }
    });

    return res.json({
      ok: true,
      created: true
    });
  }

  await client?.wondering.delete({
    where: {
      id: isExist.id
    }
  });

  return res.json({
    ok: true,
    created: false
  });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true
  })
);
