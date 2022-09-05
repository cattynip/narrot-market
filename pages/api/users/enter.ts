import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../libs/server/withHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ hello: true });
};

export default withHandler('POST', handler);
