import { nanoid } from 'nanoid';
import { SignJWT, JWTPayload } from 'jose';

export async function EncryptTokens(token: JWTPayload, secret: string) {
  const iat = new Date().getTime() / 1000;

  const accessToken = await new SignJWT(token)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt(iat)
    .setExpirationTime('1hr')
    .sign(new TextEncoder().encode(secret));

  const tokenExpires = iat + 60; // 1 hour

  return { accessToken, tokenExpires };
}
