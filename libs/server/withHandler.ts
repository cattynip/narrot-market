import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type TMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

interface IWithHandler {
  method: TMethod;
  handler: NextApiHandler;
  isPrivate?: boolean;
}

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

function withHandler({ method, handler, isPrivate = false }: IWithHandler) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) return res.status(405).end();

    if (isPrivate && !req.session.user)
      return res.status(401).json({ ok: false });

    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}

export default withHandler;
