import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export function hasuraClaims({ token, user }: { token: JWT; user?: User }) {
  const isAdmin = user?.role === 'admin' || token?.user?.role === 'admin' ? true : false;

  const iat = Date.now() / 1000;

  const jwtClaims = {
    id: user?.id ?? token?.id,
    sub: user?.id ?? token?.sub,
    name: token?.name,
    admin: isAdmin,
    email: token?.email,
    picture: token?.picture,
    user: user ?? token?.user,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['admin', 'managers', 'users', 'customers'],
      'x-hasura-default-role': 'customers',
      'x-hasura-role': user?.role ?? (token?.user as User)?.role,
      'x-hasura-user-id': user?.id ?? token?.id,
      //'x-hasura-org-id': '123',
      //'x-hasura-custom': 'custom-value',
    },
  };

  return jwtClaims;
}
