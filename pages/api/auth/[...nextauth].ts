import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
// import DiscordProvider from "next-auth/providers/discord";


export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: typeof process.env.FACEBOOK_CLIENT_ID === "string" ? process.env.FACEBOOK_CLIENT_ID : "",
      clientSecret: typeof process.env.FACEBOOK_CLIENT_SECRET === "string" ? process.env.FACEBOOK_CLIENT_SECRET : ""
    })
    // DiscordProvider({
    //   clientId: typeof process.env.DISCORD_CLIENT_ID === "string" ? process.env.DISCORD_CLIENT_ID : "",
    //   clientSecret: typeof process.env.DISCORD_CLIENT_SECRET === "string" ? process.env.DISCORD_CLIENT_SECRET : ""
    // })
  ],
  pages: {
    signIn: "/auth",
  }
}

export default NextAuth(authOptions)