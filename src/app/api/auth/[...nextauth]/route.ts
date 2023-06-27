import NextAuth, { NextAuthOptions } from 'next-auth';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';

import { client } from '@/libs/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    // CredentialsProvider({
    //   name: 'Email & Password',
    //   credentials: {
    //     username: {
    //       label: 'User Id (Email)',
    //       type: 'text',
    //       placeholder: 'hoge@example.com',
    //       value: 'noripi10@example.com',
    //     },
    //     password: { label: 'Password', type: 'password', value: 'password' },
    //   },
    //   authorize: async (credentials, req) => {
    //     const users = [{ id: '1', username: 'noripi10@example.com', password: 'password' }];
    //     if (credentials) {
    //       const { username, password } = credentials;
    //       const user = users.find((e) => e.username === username && e.password === password);
    //       console.info('findedUser', user);
    //       if (user) {
    //         return user;
    //       }
    //     }
    //     return null;
    //   },
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'repo',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? '',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      console.info({ token, user, account });
      if (user) {
        return { ...token, ...user };
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      console.info({ session, token, user });

      session = {
        ...session,
        user: {
          ...token,
          ...user,
        },
      };
      return session;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
