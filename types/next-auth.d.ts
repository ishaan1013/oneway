import { Session } from "inspector";
import NextAuth, {
  DefaultSession,
  Account,
  User,
  CallbacksOptions
} from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    customTokenProperty: string;
  }
}

declare module "next-auth" {
  interface Session {
    customSessionProperty: string;
  }
}