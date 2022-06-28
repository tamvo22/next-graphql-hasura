import { verifyIdToken } from '@/utils/firebase-v9/firebase-admin/useAuth';
import { FirestoreAdapter } from '@/utils/auth/next-auth/FirestoreAdapter';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
        const decodedToken = await verifyIdToken(authUser.access_token);

        if (decodedToken) {
          // perform additional custom credential data storage here.

          const user: User = {
            id: decodedToken.uid,
            name: authUser.name,
            role: decodedToken.role,
            email: decodedToken.email,
            image: authUser.image,
            emailVerified: null,
          };

          return user;
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
  adapter: FirestoreAdapter(),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1hour
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      const newToken = {
        ...token,
        user: {
          ...user!,
          ...token?.user,
          role: user?.role ?? token?.user?.role ?? 'user',
        },
      };

      return newToken;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token?.user,
      };

      return session;
    },
  },
  theme: {
    colorScheme: 'light',
  },
  debug: false,
});
