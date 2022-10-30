import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

type NextMiddleWareProps = NextApiRequest & Pick<NextRequest, 'nextUrl' | 'cookies'>;

const isSecure = process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL;

export async function middleware(req: NextMiddleWareProps) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const session = await getToken({ req, secureCookie: isSecure });

    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/query/refreshToken/:path*'],
};
