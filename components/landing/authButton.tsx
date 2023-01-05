import { useSession, signIn, signOut } from "next-auth/react"
import { IoMdLogIn, IoMdLogOut } from "react-icons/io"

const AuthButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {/* <p className="mb-6 max-w-3xl text-center text-xs text-neutral-500">
          {JSON.stringify(session)}
        </p> */}
        <div
          className="relative flex w-full select-none items-center rounded border-[1px] border-white/25 py-1 pl-2 pr-3 font-medium duration-200 hover:border-white/75 hover:bg-white/10"
          onClick={() => signOut()}>
          <IoMdLogOut className="mr-2 h-5 w-5" />
          Sign Out
        </div>
      </>
    )
  }
  return (
    <>
      <div className="custom-gradient group relative z-10 rounded p-[1px]">
        <div className="custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 group-hover:opacity-70"></div>
        <button
          className="relative flex select-none items-center rounded bg-black py-3 pl-5 pr-7 text-2xl font-semibold"
          onClick={() => signIn()}>
          <IoMdLogIn className="mr-4" />
          Get Started
        </button>
      </div>
    </>
  )
}

export default AuthButton
