import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

export interface PostFilesResponse {
  ok: boolean;
  url: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  return res.json({
    ok: true,
    url: ''
  });
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
    isPrivate: true
  })
);
