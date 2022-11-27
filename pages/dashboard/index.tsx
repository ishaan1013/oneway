import Head from "next/head"
import Link from "next/link"
import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { FiPlus } from "react-icons/fi"

import DashboardNav from "../../components/dashboard/nav"

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>OneWay Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="xs:px-8 relative z-10 flex min-h-screen w-screen flex-col items-center justify-start overflow-x-hidden px-4 pt-32 pb-16 md:px-16">
        {/* dashboard */}

        <DashboardNav />

        <div className="mb-3 flex w-full items-center justify-between">
          <div>
            <h2 className="text-left text-xl font-bold">Account Overview</h2>
            <p className="text-sm opacity-50">Hover images for options.</p>
          </div>

          <Link href="/dashboard/create">
            <button className="relative flex select-none items-center rounded border-[1px] border-white/25 bg-black py-1 pl-2 pr-3.5 text-base font-medium duration-200 hover:border-white/75  hover:bg-white/10">
              <FiPlus className="mr-2" />
              Create
            </button>
          </Link>
        </div>
        <div className="xs:auto-cols-[300px] slider relative grid w-full auto-cols-[250px] grid-flow-col gap-8 overflow-x-auto pt-2 pb-4 md:auto-cols-[350px] ">
          <div className="xs:h-[300px] aspect-square h-[250px] rounded border-[1px] border-white/10 bg-white/5 md:h-[350px]"></div>
          <div className="xs:h-[300px] aspect-square h-[250px] rounded border-[1px] border-white/10 bg-white/5 md:h-[350px]"></div>
          <div className="xs:h-[300px] aspect-square h-[250px] rounded border-[1px] border-white/10 bg-white/5 md:h-[350px]"></div>
          <div className="xs:h-[300px] aspect-square h-[250px] rounded border-[1px] border-white/10 bg-slate-500 md:h-[350px]"></div>
          <div className="xs:h-[300px] aspect-square h-[250px] rounded border-[1px] border-white/10 bg-white/5 md:h-[350px]"></div>
          <div className="xs:h-[300px] aspect-square h-[250px] rounded border-[1px] border-white/10 bg-white/5 md:h-[350px]"></div>
          <div className="xs:h-[300px] aspect-square h-[250px] rounded border-[1px] border-white/10 bg-white/5 md:h-[350px]"></div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default Dashboard
