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
              className="pointer-events-none absolute bottom-0 h-full w-full select-none"
              alt=""
              objectFit="cover"
              layout="fill"
            />
          </div>
        ) : mediaSm ? (
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

      <div
        className="custom-gradient group relative z-10 rounded p-[1px]"
        key={provider.name}>
        <div className="custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 group-hover:opacity-70"></div>
        <button
          className="relative flex select-none items-center rounded bg-black p-[1px] py-2 pl-4 pr-5 text-xl font-semibold"
          onClick={() =>
            signIn(provider.id, { callbackUrl: "http://localhost:3000/" })
          }>
          <BsFacebook className="mr-4" /> Sign in with {provider.name}
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-white/50">
        *OneWay only works with{" "}
        <span className="font-bold">Public Instagram Business Accounts.</span>
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
