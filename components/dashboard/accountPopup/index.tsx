import * as Dialog from "@radix-ui/react-dialog"
import { useAtom } from "jotai"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BsFacebook, BsInstagram } from "react-icons/bs"
import { FiChevronLeft } from "react-icons/fi"
import { accountPopupAtom, fbPagesAtom } from "../../../utils/store"
import Page from "./page"

const AccountPopup = () => {
  const [data] = useAtom(fbPagesAtom)
  const [opened, setOpened] = useAtom(accountPopupAtom)
  const [on, setOn] = useState(false)
  const [igOn, setIgOn] = useState(false)
  useEffect(() => {
    if (on) {
      const timer = setTimeout(() => {
        setIgOn(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setIgOn(false)
    }
  }, [on])

  useEffect(() => {
    if (!opened) {
      setOn(false)
      setIgOn(false)
    }
  }, [opened])

  return (
    <Dialog.Root open={opened} onOpenChange={setOpened}>
      {/* <Dialog.Trigger /> */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md" />
        <Dialog.Content className="dialog custom-gradient fixed left-1/2 top-1/2 z-50 flex w-[95%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md p-[1px] xs:w-[450px]">
          <div className="relative flex w-full items-start justify-between space-x-4 rounded-[5px] bg-black px-5 py-2">
            <div className="flex h-[320px] flex-col items-center justify-between py-4">
              <Dialog.Close className="flex select-none items-center rounded-full border-[1px] border-white/25 p-1 text-xl backdrop-blur-md duration-200 hover:border-white/75 hover:bg-white/10">
                <FiChevronLeft className="" />
              </Dialog.Close>
              <div className="flex flex-col items-center space-y-2">
                <BsFacebook className="mt-4 text-2xl" />
                <div className="relative h-14 w-1 overflow-hidden rounded-full">
                  <div
                    data-state={on ? "on" : "off"}
                    className="absolute top-0 h-full w-full bg-white/20"
                  />
                  <div
                    data-state={on ? "on" : "off"}
                    className="absolute top-0 h-0 w-full bg-white duration-500 data-[state=on]:h-full"
                  />
                </div>
                <BsInstagram
                  data-state={igOn ? "on" : "off"}
                  className="mt-4 text-2xl text-white/20 duration-300 data-[state=on]:text-white"
                />
              </div>
            </div>

            <div>
              <div className="mt-4 mb-1 text-xl font-medium">
                Account Select
              </div>
              <div className="relative h-[275px] w-full">
                <div className="pointer-events-none absolute top-0 z-10 h-12 w-full -translate-y-2 bg-gradient-to-b from-black via-black/80 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 z-10 h-12 w-full translate-y-2 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="acct-select max-h-full w-full space-y-2 overflow-y-auto overflow-x-hidden py-6 pr-1">
                  {data?.data?.map((page: any, i: number) => {
                    return (
                      <>
                        <Page on={on} setOn={setOn} data={page} i={i} />
                      </>
                    )
                  })}
                  {/* <p className="max-w-[250px] break-words text-xs">
                    {JSON.stringify(data)}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AccountPopup
