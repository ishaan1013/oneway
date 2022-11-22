import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <p className="mb-6 max-w-3xl text-center text-xs text-white/60">
          {JSON.stringify(session)}
        </p>
        <button
          className="rounded border-[1px] border-white/50 bg-white/5 py-1 px-3 duration-100 hover:bg-white/10"
          onClick={() => signOut()}>
          Sign Out
        </button>
      </>
    )
  }
  return (
    <>
      <button
        className="rounded border-[1px] border-white/50 bg-white/5 py-1 px-3 duration-100 hover:bg-white/10"
        onClick={() => signIn()}>
        Sign in
      </button>
    </>
  )
}

export default LoginButton
