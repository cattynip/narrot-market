import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { NextApiHandler } from 'next';

const cookieOpts = {
  cookieName: 'narrotsession',
  password: process.env.SESSION_PASSWORD
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const withSession = (fn: any): NextApiHandler => {
  return withIronSessionApiRoute(fn, cookieOpts);
};

export const withSsrSession = (handler: any) => {
  return withIronSessionSsr(handler, cookieOpts);
};

export default withSession;
