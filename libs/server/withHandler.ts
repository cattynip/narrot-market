import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type TMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

const withHandler = (method: TMethod, handler: NextApiHandler) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) return res.status(405).end();

    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
};

export default withHandler;
