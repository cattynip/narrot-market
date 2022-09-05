import type { NextApiRequest, NextApiResponse } from 'next';
// import client from '../../../libs/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') res.status(401).end();

  console.log('Request Body : ', req.body);
  res.json({ ok: true });
}

export default handler;
