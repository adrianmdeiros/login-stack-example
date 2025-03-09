import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/schema";

export const authConfig = {
  providers: [Google],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token
    }
  },
  session: {
    strategy: "jwt"
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)