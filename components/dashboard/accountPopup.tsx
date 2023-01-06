import * as Dialog from "@radix-ui/react-dialog"
import { useAtom } from "jotai"
import Image from "next/image"
import { BsFacebook } from "react-icons/bs"
import { FiChevronLeft } from "react-icons/fi"
import { accountPopupAtom } from "../../utils/store"

const AccountPopup = () => {
  const [opened, setOpened] = useAtom(accountPopupAtom)

  return (
    <Dialog.Root open={opened} onOpenChange={setOpened}>
      {/* <Dialog.Trigger /> */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md" />
        <Dialog.Content className="dialog custom-gradient fixed left-1/2 top-1/2 z-50 flex w-[95%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md p-[1px] sm:w-2/3 xl:w-1/2 2xl:w-1/3">
          <div className="relative flex w-full flex-col items-center justify-center rounded-[5px] bg-black p-5">
            <Dialog.Close className="absolute top-4 left-4 flex select-none items-center rounded-full border-[1px] border-white/25 p-1.5 text-xl backdrop-blur-md duration-200 hover:border-white/75 hover:bg-white/10">
              <FiChevronLeft className="" />
            </Dialog.Close>
            <div className="mb-6 flex items-center text-lg font-semibold">
              Select <BsFacebook className="mx-2" /> Page
            </div>

            <div className="flex w-full flex-col space-y-1 rounded border-[1px] border-white/25 p-2 duration-200 hover:border-white/75 hover:bg-white/10">
              <div className="font-semibold">Page Title</div>
              <div className="self-start rounded bg-white/[0.15] py-0.5 px-1.5 text-xs">
                Category
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AccountPopup
