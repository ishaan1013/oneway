import { useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { Session, User } from "next-auth"
import { getSession, useSession } from "next-auth/react"

import DashboardNav from "../../components/dashboard/nav/nav"
import Post from "../../components/dashboard/slider/post"

import { FiFilePlus } from "react-icons/fi"

import { useHydrateAtoms } from "jotai/utils"
import {
  fbPagesAtom,
  accessTokenAtom,
  fbUserAtom,
  selectedPageAtom,
  igIdAtom,
} from "../../utils/store"
import { useAtom } from "jotai"
import AccountPopup from "../../components/dashboard/accountPopup"
import Slider from "../../components/dashboard/slider"

const Dashboard = ({
  user,
  accessToken,
  pages,
  igId,
}: {
  user: User
  accessToken: string
  pages: any
  igId: string
}) => {
  useHydrateAtoms([[fbUserAtom, user]] as const)
  useHydrateAtoms([[accessTokenAtom, accessToken]] as const)
  useHydrateAtoms([[fbPagesAtom, pages]] as const)
  useHydrateAtoms([[igIdAtom, igId]] as const)

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccountPopup />
      <main className="relative z-10 flex min-h-screen w-screen flex-col items-center justify-start overflow-x-hidden px-4 pt-32 pb-16 xs:px-8 md:px-16">
        <DashboardNav />
        <div className="mb-3 flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-left text-xl font-bold">Account Overview</h1>
              <p className="text-sm text-neutral-500">
                Hover images for options.
              </p>
            </div>
            <div className="rounded-full border-[1px] border-white/25 "></div>
          </div>

          <Link href="/dashboard/create">
            <button className="relative flex select-none items-center rounded border-[1px] border-white/25 bg-black py-1.5 pl-3 pr-4 text-lg font-medium duration-200 hover:border-white/75  hover:bg-white/10">
              <FiFilePlus className="mr-2" />
              Create
            </button>
          </Link>
        </div>
        <Slider />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const token = await getToken(context)
  // if (token) {
  //   console.log("JSON Web Token", JSON.stringify(token, null, 2))
  // } else {
  //   console.log("no token")
  // }
  const session = await getSession(context)
  if (session) {
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    console.log("no session")
  }

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const { user, accessToken } = session

  const pRes = await fetch(
    `https://graph.facebook.com/v15.0/${user.id}/accounts?access_token=${accessToken}`
  )
  const pData = await pRes.json()
  // console.log(
  //   "🚀 ~ file: index.tsx:98 ~ constgetServerSideProps:GetServerSideProps= ~ pagesData",
  //   pData
  // )

  return {
    props: { user, accessToken, pages: pData },
  }
}

export default Dashboard
