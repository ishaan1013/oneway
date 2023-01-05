import NextAuth, { Account, Profile, Session, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  callbacks: {
    async jwt({ token, user, account }:{ token: JWT, user?: User | AdapterUser | undefined, account?: Account | null | undefined, profile?: Profile | undefined, isNewUser?: boolean | undefined }): Promise<JWT> {
      if (account && account.access_token && user) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token;
    },
    async session({ session, token }:{ session: Session, user: User, token: JWT }): Promise<Session> {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    // session({ session, user }) {
    //   if (session.user) {
    //     session.user.id = user.id;
    //   }
    //   return session;
    // },
  },
  providers: [
    FacebookProvider({
      clientId: typeof process.env.FACEBOOK_CLIENT_ID === "string" ? process.env.FACEBOOK_CLIENT_ID : "",
      clientSecret: typeof process.env.FACEBOOK_CLIENT_SECRET === "string" ? process.env.FACEBOOK_CLIENT_SECRET : ""
    })
  ],
  pages: {
    signIn: "/auth",
  }
}

export default NextAuth(authOptions)