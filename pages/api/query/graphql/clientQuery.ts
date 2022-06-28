import type { NextApiRequest, NextApiResponse } from 'next';
import { hasuraClaims } from '@/utils/hasura/hasuraClaims';
import useAxios from '@/utils/hooks/useAxios';
import { getToken, JWT } from 'next-auth/jwt';
import { nanoid } from 'nanoid';
import { SignJWT } from 'jose';

const secret = process.env.JWT_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (secret) {
    const query = req.body;

    const token = (await getToken({ req, secret })) as JWT;

    if (token) {
      const jwtClaims = hasuraClaims({ token });

      const accessToken = await new SignJWT(jwtClaims)
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

      const header = {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken!}`,
        'x-hasura-role': token?.user?.role as string,
      };

      const axiosServer = useAxios({
        headers: header!,
      });

      try {
        const result = await axiosServer.add(process.env.HASURA_API_ENDPOINT!, query);

        res.status(200).json(result ?? null);
      } catch (error: any) {
        res.status(400).json(error);
      }
    } else {
      res.status(403).json('');
    }
  }
};
