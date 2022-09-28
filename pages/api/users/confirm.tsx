import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { code } = req.body;

  console.log(code);
  return res.json({ ok: true, confirm: true });
};

export default withHandler('POST', handler);
