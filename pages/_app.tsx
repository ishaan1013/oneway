import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Space_Grotesk } from "@next/font/google"

const spaceGrotesk = Space_Grotesk({
  weight: "variable",
  subsets: ["latin"],
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={spaceGrotesk.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
