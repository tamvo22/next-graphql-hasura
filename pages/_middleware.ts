import type { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

type NextMiddleWareProps = NextApiRequest & Pick<NextRequest, 'nextUrl'>;

export const withVerifyToken = async (req: NextMiddleWareProps) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET!,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL,
  });

  return token;
};

export async function middleware(req: NextMiddleWareProps) {
  // prevent unauthorized access to dasboard by verifying the req token
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const token = await withVerifyToken(req);

    const url = req.nextUrl.clone();
    url.pathname = '/login';

    if (!token) return NextResponse.redirect(url);
  }

  // else continue access to Dashboard
}
