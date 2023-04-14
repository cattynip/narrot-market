import { NextResponse, userAgent } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

const middleware = (req: NextRequest, event: NextFetchEvent) => {
  const { isBot } = userAgent(req);

  if (isBot) {
    return new Response('Please do not use a bot. Be human', {
      status: 403
    });
  }

  if (!req.url.includes('/api')) {
    if (!req.url.includes('/enter') && !req.url.includes('/welcome')) {
      if (!req.cookies.has('narrotsession')) {
        return NextResponse.rewrite(new URL('/welcome', req.url));
      }
    }
  }

  return;
};

export default middleware;

export const config = {};
