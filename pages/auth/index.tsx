import { GetServerSideProps } from "next"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import { BsFacebook } from "react-icons/bs"
import { useMediaQuery } from "../../hooks"
import { useEffect, useState } from "react"

import Grid from "../../assets/grid.svg"
import GridSm from "../../assets/grid-sm.svg"
import GridLg from "../../assets/grid-lg.svg"

const Login = ({ providers }: { providers: any }) => {
  const provider: any = Object.values(providers)[0]
  const mediaLg_ = useMediaQuery("(min-width: 1024px)")
  const mediaSm_ = useMediaQuery("(min-width: 640px)")

  const [mediaLg, setMediaLg] = useState<boolean>(false)
  const [mediaSm, setMediaSm] = useState<boolean>(false)

  useEffect(() => {
    setMediaLg(mediaLg_)
    setMediaSm(mediaSm_)
  }, [])

  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute h-full w-full">
        {mediaLg ? (
          <div className="grid-gradient relative mt-[60vh] h-[40vh] w-full">
            <Image
              src={GridLg}
              priority
              className="pointer-events-none absolute bottom-0 h-full w-full select-none object-cover"
              alt=""
            />
          </div>
        ) : mediaSm && !mediaLg ? (
          <div className="grid-gradient relative mt-[55vh] h-[45vh] w-full">
            <Image
              src={Grid}
              priority
              className="pointer-events-none absolute bottom-0 h-full w-full select-none object-cover"
              alt=""
            />
          </div>
        ) : (
          <div className="grid-gradient relative mt-[55vh] h-[45vh] w-full">
            <Image
              src={GridSm}
              priority
              className="pointer-events-none absolute bottom-0 h-full w-full select-none object-cover"
              alt=""
            />
          </div>
        )}
      </div>

      <div
        className="custom-gradient group relative z-10 rounded p-[1px]"
        key={provider.name}>
        <div className="custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 group-hover:opacity-70"></div>
        <button
          className="relative flex select-none items-center rounded bg-black py-2 pl-4 pr-5 text-xl font-semibold"
          onClick={() =>
            signIn(provider.id, { callbackUrl: "http://localhost:3000/" })
          }>
          <BsFacebook className="mr-4" /> Sign in with {provider.name}
        </button>
      </div>

      <p className="mt-8 text-center text-base text-neutral-500">
        OneWay only works with{" "}
        <span className="font-bold text-white/60">
          public Instagram business accounts.
        </span>
      </p>
      <p className="mt-3 text-center text-base text-neutral-500">
        The Instagram account must be{" "}
        <span className="font-bold text-white/60">
          connected to a Facebook page.
        </span>
      </p>
      <p className="mt-3 text-center text-base text-neutral-500">
        In the login screen, you can create a page and link an Instagram account
        to it easily.
      </p>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default Login
