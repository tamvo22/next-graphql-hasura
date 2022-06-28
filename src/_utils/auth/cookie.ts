import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';
import { jsonResponse } from './jsonRes';

export interface UserJwtPayload {
  jti: string;
  iat: number;
}

export async function verifyAuth(request: NextRequest, secret: string) {
  const token = request.cookies['USER_TOKEN'];

  if (!token) {
    return jsonResponse(401, { error: { message: 'Missing user token' } });
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));
    return verified.payload as UserJwtPayload;
  } catch (err) {
    return jsonResponse(401, { error: { message: 'Your token has expired.' } });
  }
}

export async function setUserCookie(request: NextRequest, response: NextResponse) {
  const cookie = request.cookies['USER_TOKEN'];

  if (!cookie) {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));
    response.cookie('USER_TOKEN', token, { httpOnly: true });
  }

  return response;
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.searchParams.has('edge')) {
    const resOrPayload = await verifyAuth(req, process.env.JWT_SECRET_KEY!);

    return resOrPayload instanceof Response ? resOrPayload : jsonResponse(200, { nanoid: nanoid(), jwtID: resOrPayload.jti });
  }
}

export function setHeader() {
  // Store the response so we can modify its headers
  const response = NextResponse.next();

  // Set custom header
  response.headers.set('x-modified-edge', 'true');

  // Return response
  return response;
}
