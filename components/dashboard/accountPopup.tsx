import * as Dialog from "@radix-ui/react-dialog"
import { useAtom } from "jotai"
import Image from "next/image"
import { BsFacebook, BsInstagram } from "react-icons/bs"
import { FiChevronLeft } from "react-icons/fi"
import { accountPopupAtom } from "../../utils/store"

const AccountPopup = () => {
  const [opened, setOpened] = useAtom(accountPopupAtom)

  return (
    <Dialog.Root open={opened} onOpenChange={setOpened}>
      {/* <Dialog.Trigger /> */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md" />
        <Dialog.Content className="dialog custom-gradient fixed left-1/2 top-1/2 z-50 flex w-[95%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md p-[1px] xs:w-[450px]">
          <div className="relative flex w-full items-start justify-between space-x-4 rounded-[5px] bg-black p-5">
            <div className="flex h-[275px] flex-col items-center justify-between">
              <Dialog.Close className="flex select-none items-center rounded-full border-[1px] border-white/25 p-1 text-xl backdrop-blur-md duration-200 hover:border-white/75 hover:bg-white/10">
                <FiChevronLeft className="" />
              </Dialog.Close>
              <div className="flex flex-col items-center space-y-2">
                <BsFacebook className="mt-4 text-2xl" />
                <div className="h-14 w-1 rounded-full bg-white/10"></div>
                <BsInstagram className="mt-4 text-2xl text-white/10" />
              </div>
            </div>

            <div className="relative h-[275px] w-full">
              <div className="pointer-events-none absolute top-0 z-10 h-14 w-full -translate-y-2 bg-gradient-to-b from-black via-black/70 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 z-10 h-14 w-full translate-y-2 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="acct-select max-h-full w-full space-y-2 overflow-y-auto py-6 pr-1">
                <button className="flex w-full flex-col space-y-1 rounded border-[1px] border-white/25 p-2 duration-200 hover:border-white/75 hover:bg-white/10">
                  <div className="font-semibold">Page Title</div>
                  <div className="self-start rounded bg-white/[0.15] py-0.5 px-1.5 text-xs">
                    Category
                  </div>
                </button>
                <button className="flex w-full flex-col space-y-1 rounded border-[1px] border-white/25 p-2 duration-200 hover:border-white/75 hover:bg-white/10">
                  <div className="font-semibold">Page Title</div>
                  <div className="self-start rounded bg-white/[0.15] py-0.5 px-1.5 text-xs">
                    Category
                  </div>
                </button>
                <button className="flex w-full flex-col space-y-1 rounded border-[1px] border-white/25 p-2 duration-200 hover:border-white/75 hover:bg-white/10">
                  <div className="font-semibold">Page Title</div>
                  <div className="self-start rounded bg-white/[0.15] py-0.5 px-1.5 text-xs">
                    Category
                  </div>
                </button>
                <button className="flex w-full flex-col space-y-1 rounded border-[1px] border-white/25 p-2 duration-200 hover:border-white/75 hover:bg-white/10">
                  <div className="font-semibold">Page Title</div>
                  <div className="self-start rounded bg-white/[0.15] py-0.5 px-1.5 text-xs">
                    Category
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AccountPopup
