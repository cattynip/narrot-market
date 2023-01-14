import { NextApiHandler } from 'next';

type THandlerMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ServerHandlerResponseType {
  ok: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

interface IWithHandlerConfiguration {
  method: THandlerMethod;
  handler: NextApiHandler;
  isPrivate?: boolean;
}

const withHandler = ({
  method,
  handler,
  isPrivate = false
}: IWithHandlerConfiguration): NextApiHandler<ServerHandlerResponseType> => {
  return async (req, res) => {
    if (req.method !== method) {
      return res.status(405).end();
    }

    try {
      if (isPrivate && !req.session.user) {
        return res.status(401).json({
          ok: false,
          message: 'Please log in first.'
        });
      }

      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };
};

export default withHandler;
