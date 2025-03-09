import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/schema";

export const authConfig = {
  providers: [Google],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    }
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)