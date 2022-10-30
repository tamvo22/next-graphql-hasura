import { verifyIdToken } from '@/utils/firebase-v9/firebase-admin/useAuth';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import HasuraAdapter from '@/utils/auth/hasuraAdapter';
import { getUser } from '@/utils/hasura/server/users';
import { hasuraClaims } from '@/utils/auth/hasuraClaims';
import { EncryptTokens } from '@/utils/auth/encryptToken';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'firebase-credential',
      name: 'Credentials',
      credentials: {
        auth: { label: 'auth', type: 'text' },
      },
      async authorize(credentials, req) {
        const authUser = JSON.parse(credentials?.auth!);
        //Verify firebase access_token with verifyIdToken
        const isValidUser = await verifyIdToken(authUser.userIdToken);

        if (isValidUser) {
          // fetch user's profile by uid
          const profile = await getUser(isValidUser.uid);

          const user: User = {
            id: authUser.uid,
            name: profile?.name!,
            role: profile?.role!,
            email: authUser.email,
            image: authUser.image,
            emailVerified: authUser.emailVerified,
          };

          return user;
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // @ts-ignore
      scope: 'read:user',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name ?? profile.login,
          email: profile.email!,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  adapter: HasuraAdapter(),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (token.tokenExpires && new Date().getTime() / 1000 < token.tokenExpires) {
        return token;
      }

      console.log('token', token, user);

      // generate Hasura claims on first login
      if (user) {
        token.user = { ...user, role: user?.role ?? 'user', ...hasuraClaims(user as User) };
      }

      // generate hasura accessToken for Hasura authorization
      const { accessToken, tokenExpires } = await EncryptTokens(token.user, process.env.HASURA_JWT_SECRET!);
      token = { ...token, accessToken, tokenExpires };

      console.log('token', token, accessToken, tokenExpires);

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.tokenExpires = token.tokenExpires;

      console.log('session', session);

      return session;
    },
  },
  theme: {
    colorScheme: 'light',
  },
  debug: false,
});
