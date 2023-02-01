import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiFile, FiMenu } from "react-icons/fi"
import {
  accessTokenAtom,
  accountPopupAtom,
  fbPagesAtom,
  fbUserAtom,
  selectedPageAtom,
} from "../../../utils/store"

import UserDropdown from "./userDropdown"
import { BiLink } from "react-icons/bi"

const DashboardNav = () => {
  const router = useRouter()
  const [fbPages] = useAtom(fbPagesAtom)
  const [accessToken] = useAtom(accessTokenAtom)
  const [selected, setSelected] = useAtom(selectedPageAtom)

  const [opened, setOpened] = useAtom(accountPopupAtom)

  const [username, setUsername] = useState("")

  useEffect(() => {
    const getIg = async () => {
      const data = await fetch(
        `https://graph.facebook.com/v15.0/${fbPages?.data?.[selected]?.id}?fields=instagram_business_account&access_token=${accessToken}`
      )
      return await data.json()
    }
    const getUsername = async (igData: any) => {
      const data = await fetch(
        `https://graph.facebook.com/v15.0/${igData?.instagram_business_account?.id}?fields=username&access_token=${accessToken}`
      )
      return await data.json()
    }
    getIg().then((igData) => {
      getUsername(igData).then((res) => setUsername(res?.username))
    })
  }, [selected])

  return (
    <nav className="fixed top-0 z-50 w-screen overflow-hidden border-b-[1px] border-white/20 bg-black/60 px-4 pt-4 backdrop-blur-lg xs:px-8 md:px-16">
      <div className="custom-gradient absolute -left-12 -z-10 h-2/3 w-[150px] rotate-180 opacity-50 blur-xl xs:w-[250px] xs:blur-2xl md:-left-24 md:w-[330px] md:opacity-80 md:blur-3xl" />

      <div className="flex w-full items-center justify-between">
        <div>
          <div className="flex items-center">
            <Link href="/dashboard" className="select-none text-xl font-bold">
              OneWay
            </Link>
            <div className="ml-3 mr-1 h-5 w-[1.5px] rotate-12 bg-neutral-500 xs:!mx-4" />
            <button
              onClick={() => setOpened(true)}
              className="flex items-center space-x-1 rounded px-2 pt-1 pb-0.5 text-[0.9rem] font-medium text-white/80 duration-200 hover:bg-white/[0.15]">
              <div className="flex items-center space-x-1">
                <FiFile />
                <div className="max-w-[200px] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                  {fbPages?.data?.[0]?.name ?? "No Page Detected"}
                </div>
              </div>
              {fbPages?.data?.[0]?.name && (
                <>
                  <BiLink className="text-neutral-500" />
                  <div
                    className={`max-w-[250px] overflow-hidden text-ellipsis ${
                      username ? "" : "font-semibold text-red-500"
                    }`}>
                    @{username ?? "No Instagram Account Linked"}
                  </div>
                </>
              )}
            </button>
          </div>
          <ul className="mt-3 list-none space-x-3">
            <li
              className={`inline-block ${
                router.pathname == "/dashboard"
                  ? "border-b-[2px] border-white"
                  : ""
              }
                       pb-2 duration-200`}>
              <Link
                href="/dashboard"
                className={`rounded px-2 py-1 font-light duration-200 ${
                  router.pathname == "/dashboard"
                    ? "opacity-100 hover:bg-white/[0.15]"
                    : "opacity-40 hover:bg-white/20 hover:opacity-70"
                }`}>
                Overview
              </Link>
            </li>
            <li
              className={`inline-block ${
                router.pathname == "/dashboard/create"
                  ? "border-b-[2px] border-white"
                  : ""
              } pb-2 duration-200`}>
              <Link
                href="/dashboard/create"
                className={`rounded px-2 py-1 font-light duration-200 ${
                  router.pathname == "/dashboard/create"
                    ? "opacity-100 hover:bg-white/[0.15]"
                    : "opacity-40 hover:bg-white/20 hover:opacity-70"
                }`}>
                Create
              </Link>
            </li>
          </ul>
        </div>

        <UserDropdown fbPage={fbPages?.data?.[0]?.name} igPage={username} />
        <button className="block rounded border-[1px] border-white/25 p-2 text-xl duration-200 hover:border-white/75 hover:bg-white/10 md:hidden">
          <FiMenu />
        </button>
      </div>
    </nav>
  )
}

export default DashboardNav
