import { JWT } from 'next-auth/jwt';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';
import * as bcrypt from 'bcrypt';

//https://thewidlarzgroup.com/nextjs-auth/

const saltOrRounds = 10;

interface EncryptTokens {
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
}

export async function EncryptTokens(token: JWT, expiredAt?: number): Promise<EncryptTokens> {
  const expAt = expiredAt ?? 30;
  const tokenExpires = new Date().getTime() / 1000 + expAt;
  const accessToken = await new SignJWT(token)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(expiredAt ?? '30s')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const refreshToken = await bcrypt.hash(process.env.JWT_SECRET, saltOrRounds);

  return { accessToken, refreshToken, tokenExpires };
}

interface VerifyTokens {
  isMatched: boolean;
}

export async function VerifyTokens(accessToken: string, refreshToken: string): Promise<VerifyTokens> {
  const decryptAccessToken = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET));
  const isMatched = decryptAccessToken && (await bcrypt.compare(process.env.JWT_SECRET, refreshToken));

  return { isMatched };
}
