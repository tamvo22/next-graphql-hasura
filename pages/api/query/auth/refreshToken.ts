import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import { hasuraClaims } from '@/utils/hasura/hasuraClaims';
import { EncryptTokens, VerifyTokens } from '@/utils/auth/cryptToken';

const secret = process.env.JWT_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    if (!session.accessToken || !session.refreshToken) {
      res.status(200).json({ error: 'Missing tokens.' });
    }

    const { isMatched } = await VerifyTokens(session.accessToken, session.refreshToken);

    if (isMatched) {
      const token = (await getToken({ req, secret })) as JWT;
      const jwtClaims = hasuraClaims({ token });

      const { accessToken, refreshToken, tokenExpires } = await EncryptTokens(jwtClaims);

      session.accessToken = accessToken;
      session.refreshToken = refreshToken;
      session.tokenExpires = tokenExpires;

      res.status(200).json(session);
    } else {
      res.status(200).json({ error: 'Invalid refreshToken.' });
    }
  } else {
    res.status(200).json({ error: 'Invalid session.' });
  }
};
