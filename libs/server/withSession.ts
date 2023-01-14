import { withIronSessionApiRoute } from 'iron-session/next';

const cookieOpts = {
  cookieName: 'narrotsession',
  password: process.env.SESSION_PASSWORD
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const withSession = (fn: any) => {
  return withIronSessionApiRoute(fn, cookieOpts);
};

export default withSession;
