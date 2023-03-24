import { NextApiHandler } from 'next';

type THandlerMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ServerHandlerResponseType {
  ok: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

interface IWithHandlerConfiguration {
  method: THandlerMethod | THandlerMethod[];
  handler: NextApiHandler;
  isPrivate?: boolean;
}

const withHandler = ({
  method,
  handler,
  isPrivate = false
}: IWithHandlerConfiguration): NextApiHandler<ServerHandlerResponseType> => {
  return async (req, res) => {
    if (!req.method) {
      return res.status(500).end();
    }

    if (typeof method === 'string') {
      if (method !== req.method) {
        return res.status(405).end();
      }
    }

    if (typeof method !== 'string') {
      if (!method.includes(req.method as any)) {
        return res.status(405).end();
      }
    }

    if (isPrivate) {
      if (!req.session.user) {
        return res.status(401).json({
          ok: false,
          message: 'Please log in first.'
        });
      }
    }

    try {
      console.log('I am here');
      await new Promise(resolve => setTimeout(resolve, 50000));
      console.log('I am here after waiting');

      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  };
};

export default withHandler;
