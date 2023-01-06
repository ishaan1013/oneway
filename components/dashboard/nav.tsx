import Link from "next/link"
import { useRouter } from "next/router"

import UserDropdown from "./userDropdown"

const DashboardNav = () => {
  const router = useRouter()

  return (
    <nav className="xs:px-8 fixed top-0 z-50 w-screen overflow-hidden border-b-[1px] border-white/20 bg-black/60 px-4 pt-4 backdrop-blur-lg md:px-16">
      <div className="custom-gradient xs:w-[250px] xs:blur-2xl absolute -left-24 -z-10 h-2/3 w-[100px] rotate-180 opacity-80 blur-xl md:w-[330px] md:blur-3xl" />

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-8">
          <div>
            <div className="flex items-center">
              <Link href="/dashboard" className="select-none text-xl font-bold">
                OneWay
              </Link>
              <div className="mx-4 h-5 w-[1.5px] rotate-12 bg-neutral-500" />
              <button className="rounded px-2 pt-1 pb-0.5 text-[0.9rem] font-medium text-white/80 duration-200 hover:bg-white/[0.15]">
                @ig_account
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
                }
                       pb-2 duration-200`}>
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
          <div>test</div>
        </div>

        <UserDropdown />
      </div>
    </nav>
  )
}

export default DashboardNav
