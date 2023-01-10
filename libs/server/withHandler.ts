import { NextApiHandler } from 'next';

type THandlerMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const withHandler = (
  method: THandlerMethod,
  fn: NextApiHandler
): NextApiHandler => {
  return async (req, res) => {
    if (req.method !== method) {
      return res.status(405).end();
    }

    try {
      await fn(req, res);
    } catch (error) {
      return res.status(500).end();
    }
  };
};

export default withHandler;
