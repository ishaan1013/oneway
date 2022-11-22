import { GetServerSideProps } from "next"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import { BsFacebook } from "react-icons/bs"

import Grid from "../../assets/grid.svg"

const Login = ({ providers }: { providers: any }) => {
  const provider: any = Object.values(providers)[0]

  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute h-full w-full">
        <div className="grid-gradient relative mt-[50vh] h-[50vh] w-full">
          <Image
            src={Grid}
            className="absolute bottom-0 h-full w-full"
            alt=""
            objectFit="cover"
            layout="fill"
          />
        </div>
      </div>

      <div
        className="custom-gradient group relative z-10 rounded p-[1px]"
        key={provider.name}>
        <div className="custom-gradient absolute -z-10 h-full w-full opacity-40 blur-3xl duration-200 group-hover:opacity-80"></div>
        <button
          className="relative flex items-center rounded bg-black p-[1px] py-2 pl-4 pr-5 text-xl font-semibold"
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
