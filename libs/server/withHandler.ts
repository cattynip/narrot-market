import { NextApiHandler } from 'next';

type THandlerMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ServerHandlerResponseType {
  ok: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

const withHandler = (
  method: THandlerMethod,
  fn: NextApiHandler
): NextApiHandler<ServerHandlerResponseType> => {
  return async (req, res) => {
    if (req.method !== method) {
      return res.status(405).end();
    }

    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };
};

export default withHandler;
