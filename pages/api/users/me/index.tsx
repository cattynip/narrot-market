import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { User } from '@prisma/client';

export interface GetUsersMeResponse {
  ok: boolean;
  profile: User;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id
    }
  });
  console.log(profile);

  return res.json({
    ok: true,
    profile
  });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
