import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type TMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

const withHandler = (method: TMethod, handler: NextApiHandler) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) return res.status(405).end();

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
};

export default withHandler;
