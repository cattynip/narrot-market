import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export type TMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

interface IWithHandler {
  methods: TMethod[];
  handler: NextApiHandler;
  isPrivate?: boolean;
  beChecked?: boolean;
}

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export interface FailResponseType {
  ok: false;
  reason: string | string[];
  [key: string]: any;
}

function withHandler({
  methods,
  handler,
  isPrivate = false,
  beChecked = false
}: IWithHandler) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    const {
      method,
      session: { user },
      query
    } = req;

    if (method && !methods.includes(method as any))
      return res.status(405).end();

    if (isPrivate && !user) return res.status(401).json({ ok: false });

    if (beChecked && !query) {
      return res.status(401).json({ ok: false });
    }

    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}

export default withHandler;
