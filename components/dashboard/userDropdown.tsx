import { AiOutlineUser } from "react-icons/ai"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { TbChevronDownLeft } from "react-icons/tb"
import { BiLink } from "react-icons/bi"
import { BsInstagram, BsFacebook } from "react-icons/bs"
import LoginButton from "../landing/authButton"
import { useAtom } from "jotai"
import { fbUserAtom } from "../../utils/store"
import Image from "next/image"

const UserDropdown = () => {
  const [fbUser] = useAtom(fbUserAtom)
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="group hidden md:block">
        <button className="peer overflow-hidden rounded-full border-[1px] border-white/25 bg-black p-1 backdrop-blur-md duration-200 hover:border-white/75 hover:bg-white/10 ">
          {/* <AiOutlineUser className="h-[2.7rem] w-[2.7rem] p-2.5" /> */}
          <Image
            src={fbUser?.image}
            alt="Profile Picture"
            width={44}
            height={44}
            className="select-none rounded-full brightness-95 duration-200 group-hover:brightness-110 group-data-[state=open]:brightness-50"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-menu-content z-50 w-48 select-none rounded border-[1px] border-white/20 bg-[#191919]/80 p-2 shadow-[0_0px_100px_15px_rgba(0,0,0,0.5)] backdrop-blur duration-200 ease-in-out will-change-[opacity]"
          sideOffset={5}
          align="end">
          <div className="relative overflow-hidden rounded border-[1px] border-white/10 bg-white/5 px-2 py-3">
            <div className="custom-gradient absolute -top-12 -right-2 -z-10 h-24 w-24 -rotate-45 rounded-full blur-[32px]" />
            <div className="flex items-center text-neutral-500">
              <BsFacebook className="mr-2" />
              FB Profile
            </div>
            <div className="flex items-center  text-neutral-500">
              <TbChevronDownLeft className="ml-2" />
              FB Page
            </div>
            <BiLink className="my-2 translate-x-6 text-neutral-500" />
            <div className="flex items-center">
              <BsInstagram className="mr-2" />
              IG Profile
            </div>
          </div>

          <DropdownMenu.Item className="mt-2 cursor-pointer rounded outline-none duration-200 focus:outline-neutral-500">
            <LoginButton />
          </DropdownMenu.Item>

          {/* <DropdownMenu.Arrow className="fill-[#191919]/80" /> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default UserDropdown
