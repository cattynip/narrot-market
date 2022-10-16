import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

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
    return res.status(200).json({
      ok: true,
      profile
    });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      profile: null,
      error
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
