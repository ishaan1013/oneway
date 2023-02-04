import Image from "next/image"
import Link from "next/link"
import { BsArrowRepeat, BsArrowReturnRight } from "react-icons/bs"
import { FiCheck, FiX } from "react-icons/fi"

const CompletePage = ({
  files,
  setFiles,
  setLoading,
  setSuccess,
  failure,
}: {
  files: any
  setFiles: (files: any) => void
  setLoading: (loading: boolean) => void
  setSuccess: (success: boolean) => void
  failure: boolean
}) => {
  const iconCn =
    "h-full w-full rounded-full border-[1px] border-white/25 bg-black px-2 pt-2.5 pb-1.5"

  return (
    <>
      <div className="relative z-10 mb-3 -mt-3 flex h-12 w-12 items-center justify-center">
        <div className="custom-gradient absolute -z-10 h-12 w-12 rounded-full blur-xl" />
        {failure ? <FiX className={iconCn} /> : <FiCheck className={iconCn} />}
      </div>
      <div className="text-lg font-medium">
        {failure ? "Upload Failed" : "Successfully Uploaded"}
      </div>
      {/* <div className="text-xs">{JSON.stringify(files[0].post)}</div> */}

      <div
        className="mt-4 inline-flex h-[350px] w-[350px] overflow-hidden rounded border-[1px] border-white/25 bg-black"
        key={files[0].name}>
        <div className="flex min-w-0 overflow-hidden">
          <Image
            src={files[0].preview}
            alt="Posted image preview"
            width={350}
            height={350}
            className="object-contain"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(files[0].preview)
            }}
          />
        </div>
      </div>

      <div className="mt-3 flex w-[350px] flex-col items-center sm:flex-row sm:justify-center">
        <button
          onClick={() => {
            setFiles([])
            setLoading(false)
            setSuccess(false)
          }}
          className="relative mr-0 mb-3 flex w-full select-none items-center justify-center rounded border-[1px] border-white/25 bg-black py-1.5 font-medium duration-200 hover:border-white/75 hover:bg-white/10 sm:mr-3 sm:mb-0 sm:w-1/2  sm:pr-0.5">
          <BsArrowRepeat className="mr-1.5" />
          Post Another
        </button>
        <Link
          href="/dashboard"
          className="relative flex w-full select-none items-center justify-center rounded border-[1px] border-white/25 bg-black py-1.5 font-medium duration-200 hover:border-white/75 hover:bg-white/10 sm:w-1/2  sm:pr-0.5">
          <BsArrowReturnRight className="mr-1.5" />
          Overview
        </Link>
      </div>
    </>
  )
}

export default CompletePage
