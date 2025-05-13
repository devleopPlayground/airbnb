import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
    Naver({
      clientId: process.env.AUTH_NAVER_ID || '',
      clientSecret: process.env.AUTH_NAVER_SECRET || '',
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID || '',
      clientSecret: process.env.AUTH_KAKAO_SECRET || '',
      // 중복 이메일 가입 예외처리
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: '/users/signin',
  },
  callbacks: {
    // session update
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    // jwt update
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
