import withHandler from '@libs/server/withHandler';
// import client from "@libs/server/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ hello: true });
};

export default withHandler('POST', handler);
