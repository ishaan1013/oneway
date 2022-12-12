import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
// import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  // callbacks: {
  //   async jwt({ token, user, account, profile }) {
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.id = profile.id
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     session.user.id = token.id;
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
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