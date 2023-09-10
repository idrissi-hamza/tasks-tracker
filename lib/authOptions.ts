import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import { session } from "./auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
      const user = await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          image: (profile as any)?.picture,
          org: {
            create: {},
          },
        },
        update: {
          name: profile.name,
          image: (profile as any)?.picture,
        },
      });
      return true;
    },
    session,
    async jwt({ token, user, account, profile }) {
      console.log(
        "token before ****************",
        token,
        account,
        profile,
        user,
      );
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          throw new Error("no User");
        }
        token.userId = user.id;
        token.org = {
          orgId: user.orgId,
        };
      }
      return token;
    },
  },
};
