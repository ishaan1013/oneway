import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { FiFile, FiInstagram } from "react-icons/fi"
import { RiArrowLeftLine } from "react-icons/ri"
import {
  accessTokenAtom,
  accountPopupAtom,
  selectedPageAtom,
} from "../../../utils/store"

const Page = ({
  on,
  setOn,
  data,
  i,
}: {
  on: boolean
  setOn: (on: boolean) => void
  data: any
  i: number
}) => {
  const [open, setOpen] = useState(false)
  const [accessToken] = useAtom(accessTokenAtom)
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom)
  const [opened, setOpened] = useAtom(accountPopupAtom)
  const [igData, setIgData] = useState<{ id?: number; username: string }>({
    username: "No IG",
  })

  const match = selectedPage === i

  useEffect(() => {
    const getIg = async () => {
      const res = await fetch(
        `/api/fbGraph/igAccount?pageId=${data.id}&token=${accessToken}`,
        {
          method: "GET",
        }
      )
      return await res.json()
    }
    getIg().then((res) => {
      console.log("🚀 ~ file: page.tsx:33 ~ getIg ~ res", res)
      setIgData(res.message)
    })
  }, [])

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
      key={i}
      className={`${
        open
          ? "-translate-x-72"
          : on
          ? "translate-x-0 opacity-30"
          : `translate-x-0 ${
              match
                ? "hover:border-white hover:bg-white/[0.15]"
                : "hover:border-white/75 hover:bg-white/10"
            }`
      } relative flex min-w-[340px] max-w-[360px] items-center rounded border-[1px] ${
        match ? "border-white/75 bg-white/5" : "border-white/25 bg-black"
      } transition-all duration-200`}>
      <div className="absolute left-[22rem] flex flex-col space-y-1 text-left">
        <div className="flex items-center space-x-1">
          <FiInstagram />
          <div className="w-48 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
            {igData.username}
          </div>
        </div>
        {open && (
          <button
            onClick={() => {
              setOpened(false)
              setSelectedPage(i)
            }}
            className="self-start rounded border-[1px] border-white/25 bg-white/10 py-1 px-2 text-sm duration-200 hover:border-white/75 hover:bg-white/20">
            Select Account
          </button>
        )}
      </div>

      <div
        className={`relative flex w-full ${
          !open && on ? "cursor-not-allowed" : "cursor-default"
        } flex-col justify-center space-y-1 p-2`}>
        <div className="flex items-center space-x-1">
          <FiFile />
          <div className="w-52 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
            {data.name ?? "Page Name Error"}
          </div>
        </div>
        <div className="self-start rounded bg-white/[0.15] py-0.5 px-1.5 text-xs">
          {data.category ?? "Page Category Error"}
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
