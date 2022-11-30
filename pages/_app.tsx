import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import Space from "@next/font/local"

const font = Space({ src: "../assets/Space.ttf" })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={font.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
