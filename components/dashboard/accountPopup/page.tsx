import { useEffect, useState } from "react"
import { RiArrowLeftLine } from "react-icons/ri"

const Page = ({ on, setOn }: { on: boolean; setOn: (on: boolean) => void }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setOn(open)
    }
  }, [open])

  return (
    <div
      onClick={() => {
        !on && setOpen(true)
        console.log("🚀 ~ file: page.tsx:31 ~ Page ~ on", on)
      }}
      className={`${
        open
          ? "-translate-x-72"
          : on
          ? "translate-x-0 opacity-30"
          : "translate-x-0 hover:border-white/75 hover:bg-white/10"
      } relative flex min-w-[340px] max-w-[360px] items-center rounded border-[1px] border-white/25 transition-all duration-200`}>
      <div className="absolute -right-[7.75rem]">Instagram Acct.</div>
      <div
        className={`relative flex w-full ${
          !open && on ? "cursor-not-allowed" : "cursor-default"
        } flex-col justify-center space-y-1 p-2`}>
        <div className="w-52 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
          Page Title
        </div>
        <div className="self-start rounded bg-white/[0.15] py-0.5 px-1.5 text-xs">
          Category
        </div>
        {open && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
              setOn(false)
            }}
            className="absolute right-2 rounded-full border-[1px] border-white/25 bg-white/10 p-1.5 text-lg duration-200 hover:border-white/75 hover:bg-white/20">
            <RiArrowLeftLine />
          </button>
        )}
      </div>
    </div>
  )
}

export default Page
