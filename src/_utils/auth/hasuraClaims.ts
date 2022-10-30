import { User } from 'next-auth';

export function hasuraClaims(user: User) {
  const jwtClaims = {
    ...user,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['admin', 'user'],
      'x-hasura-default-role': 'user',
      'x-hasura-role': user.role ?? 'user',
      'x-hasura-user-id': user.id,
    },
  };

  return jwtClaims;
}
