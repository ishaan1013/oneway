import { useSession, signIn, signOut } from "next-auth/react"
import { IoMdLogIn, IoMdLogOut } from "react-icons/io"

const LoginButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {/* <p className="mb-6 max-w-3xl text-center text-xs text-white/50">
          {JSON.stringify(session)}
        </p> */}
        <div className="custom-gradient group relative z-10 rounded p-[1px]">
          <div className="custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 group-hover:opacity-70"></div>
          <button
            className="relative flex select-none items-center rounded bg-black py-1 pl-2 pr-3 font-medium"
            onClick={() => signOut()}>
            <IoMdLogOut className="mr-4" />
            Sign Out
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="custom-gradient group relative z-10 rounded p-[1px]">
        <div className="custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 group-hover:opacity-70"></div>
        <button
          className="relative flex select-none items-center rounded bg-black p-[1px] py-3 pl-5 pr-7 text-2xl font-semibold"
          onClick={() => signIn()}>
          <IoMdLogIn className="mr-4" />
          Get Started
        </button>
      </div>
    </>
  )
}

export default LoginButton
