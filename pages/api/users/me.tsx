import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { User } from '@prisma/client';

export interface GetUsersMeResponse extends ResponseType {
  profile: User | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  try {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id
      }
    });
    console.log(profile);
    return res.status(200).json({
      ok: true,
      profile
    });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      profile: null
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
