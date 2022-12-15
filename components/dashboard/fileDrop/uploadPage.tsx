import React from "react"
import { RiArrowRightLine } from "react-icons/ri"

interface Props {
  children: React.ReactNode
}

const UploadPage: React.FC<Props> = ({ children }) => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Create</h1>
      <div className="custom-gradient group relative z-10 mt-10 w-96 rounded p-[1px]">
        <div className="peer flex w-full cursor-default items-center justify-center rounded bg-black p-4 py-12 duration-200">
          {children}
        </div>
        <div className="custom-gradient absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl duration-200 peer-hover:opacity-40" />
      </div>
      <div className="mt-8 h-[1px] w-96 bg-white/25" />
      <div className="mt-5 text-lg font-medium">Conversion Tools</div>
      <div className="mt-2 flex w-96 flex-col items-center sm:flex-row sm:justify-center">
        <a
          href="https://png2jpg.com"
          rel="noreferrer"
          target="_blank"
          className="relative mr-0 mb-3 flex w-full select-none items-center justify-center rounded border-[1px] border-white/25 bg-black py-1.5 font-medium duration-200 hover:border-white/75 hover:bg-white/10 sm:mr-3 sm:mb-0 sm:w-1/2  sm:pr-0.5">
          PNG <RiArrowRightLine className="mx-1" /> JPG
        </a>
        <a
          href="https://heictojpg.com/"
          rel="noreferrer"
          target="_blank"
          className="relative flex w-full select-none items-center justify-center rounded border-[1px] border-white/25 bg-black py-1.5 font-medium duration-200 hover:border-white/75 hover:bg-white/10 sm:w-1/2  sm:pr-0.5">
          HEIC <RiArrowRightLine className="mx-1" /> JPG
        </a>
      </div>
    </>
  )
}

export default UploadPage
