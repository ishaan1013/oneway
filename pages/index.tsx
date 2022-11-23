import Head from "next/head"
import Image from "next/image"
import { useMediaQuery } from "../hooks"
import { useEffect, useState } from "react"

import Grid from "../assets/grid.svg"
import GridSm from "../assets/grid-sm.svg"
import GridLg from "../assets/grid-lg.svg"
import Glow from "../assets/glow.png"

import LoginButton from "../components/landing/loginButton"

const Home = () => {
  const mediaLg_ = useMediaQuery("(min-width: 1024px)")
  const mediaSm_ = useMediaQuery("(min-width: 640px)")

  const [mediaLg, setMediaLg] = useState<boolean>(false)
  const [mediaSm, setMediaSm] = useState<boolean>(false)

  useEffect(() => {
    setMediaLg(mediaLg_)
    setMediaSm(mediaSm_)
  }, [])

  return (
    <div>
      <Head>
        <title>OneWay</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative z-10 flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute flex h-full w-full items-center justify-center">
          <Image
            src={Glow}
            alt=""
            className="aspect-[5/3] w-[90%] max-w-5xl -translate-y-6 opacity-50"
          />
        </div>
        <div className="absolute -z-10 h-full w-full">
          {/* {`The view port is ${
            mediaLg
              ? "at least 1024px"
              : mediaSm
              ? "at least 640px"
              : "less than 640px"
          }`} */}
          {mediaLg ? (
            <div className="grid-gradient relative mt-[60vh] h-[40vh] w-full">
              <Image
                src={GridLg}
                className="pointer-events-none absolute bottom-0 h-full w-full select-none"
                alt=""
                objectFit="cover"
                layout="fill"
              />
            </div>
          ) : mediaSm && !mediaLg ? (
            <div className="grid-gradient relative mt-[55vh] h-[45vh] w-full">
              <Image
                src={Grid}
                className="pointer-events-none absolute bottom-0 h-full w-full select-none"
                alt=""
                objectFit="cover"
                layout="fill"
              />
            </div>
          ) : (
            <div className="grid-gradient relative mt-[55vh] h-[45vh] w-full">
              <Image
                src={GridSm}
                className="pointer-events-none absolute bottom-0 h-full w-full select-none"
                alt=""
                objectFit="cover"
                layout="fill"
              />
            </div>
          )}
        </div>

        {/* <h2 className="mb-2 text-2xl font-semibold uppercase text-white/50">
          OneWay
        </h2>
        <h1 className="mb-16 text-center text-8xl font-bold mix-blend-soft-light">
          Social Media
          <br />
          <span className="italic">The Right Way</span>
        </h1> */}
        <LoginButton />
      </main>
    </div>
  )
}

export default Home
