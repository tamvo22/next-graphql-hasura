import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  type Role = 'admin' | 'users';

  interface Credential {
    email: string;
    password: string;
  }
  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified?: string | null;
    role?: Role;
  }

  interface Account {
    id: string;
    compound_id: string;
    userId: string;
    providerType: string;
    providerId: string;
    providerAccountId: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: string;
  }
  interface Session {
    user: User;
    accessToken?: string;
    tokenExpires?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    email: string;
    picture: string;
    sub: string;
    id: string;
    user: User;
    accessToken?: string;
    tokenExpires?: number;
  }
}
