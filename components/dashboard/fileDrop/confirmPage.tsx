import { useAtom } from "jotai"
import Image from "next/image"
import { useState } from "react"
import { FiCheck, FiX } from "react-icons/fi"
import { RiArrowLeftLine } from "react-icons/ri"
import { accessTokenAtom, igIdAtom } from "../../../utils/store"
import SizeChecks from "./sizeChecks"

const ConfirmPost = ({
  files,
  horizontalCheck,
  setHorizontalCheck,
  verticalCheck,
  setVerticalCheck,
  dimensions,
  loading,
  setLoading,
  setFiles,
  setSuccess,
  setFailure,
}: {
  files: any
  horizontalCheck: boolean
  setHorizontalCheck: (horizontalCheck: boolean) => void
  verticalCheck: boolean
  setVerticalCheck: (verticalCheck: boolean) => void
  dimensions: {
    width: number
    height: number
    aspectRatio: string
    valid: boolean
  }
  loading: boolean
  setLoading: (loading: boolean) => void
  setFiles: (files: any) => void
  setSuccess: (success: boolean) => void
  setFailure: (success: boolean) => void
}) => {
  const [accessToken] = useAtom(accessTokenAtom)
  const [igId] = useAtom(igIdAtom)

  const [caption, setCaption] = useState("")

  const uploadPost = async () => {
    const s3Res = await fetch(`/api/s3/upload`, {
      method: "POST",
      body: JSON.stringify({ name: files[0].name, type: files[0].type }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const s3data = await s3Res.json()
    console.log("🚀 ~ file: confirmPage.tsx:53 ~ uploadPost ~ s3data", s3data)

    const uploadRes = await fetch(s3data.url, {
      method: "PUT",
      body: files[0],
      headers: {
        "Content-Type": files[0].type,
        "Access-Control-Allow-Origin": "*",
      },
    })
    console.log(
      "🚀 ~ file: confirmPage.tsx:63 ~ uploadPost ~ uploadRes",
      uploadRes
    )
    // const uploadData = await uploadRes.json()

    const postRes = await fetch(
      `/api/fbGraph/igMedia?igUserId=${igId}&imageUrl=${
        s3data.url.split("?")[0]
      }&caption=${caption}&token=${accessToken}`,
      {
        method: "POST",
      }
    )
    const postData = await postRes.json()
    console.log(
      "🚀 ~ file: confirmPage.tsx:78 ~ uploadPost ~ postData",
      postData
    )

    console.log("1 postData?.json?.id:", postData?.json?.id)
    if (postData?.json?.id) {
      const publishRes = await fetch(
        `/api/fbGraph/igPublish?igUserId=${igId}&creationId=${postData?.json?.id}&token=${accessToken}`,
        {
          method: "POST",
        }
      )
      const publishData = await publishRes.json()
      console.log(
        "🚀 ~ file: confirmPage.tsx:89 ~ uploadPost ~ publishData",
        publishData
      )
    } else {
      console.log("2 postData?.json?.id:", postData?.json?.id)
      setFailure(true)
    }
    console.log("3 postData?.json?.id:", postData?.json?.id)
    setSuccess(true)
  }

  return (
    <>
      <div className="mt-4 flex h-[400px]">
        <div
          className="inline-flex h-[400px] w-[400px] overflow-hidden rounded border-[1px] border-white/25 bg-black"
          key={files[0].name}>
          <div className="relative flex min-w-0 overflow-hidden">
            {horizontalCheck ? (
              <>
                <div className="absolute top-0 z-10 h-[23.82%] w-full border-b-[3px] border-dashed border-red-500 bg-black/70" />
                <div className="absolute bottom-0 z-10 h-[23.82%] w-full border-t-[3px] border-dashed border-red-500 bg-black/70" />
              </>
            ) : verticalCheck ? (
              <>
                <div className="absolute left-0 z-10 h-full w-[10%] border-r-[3px] border-dashed border-red-500 bg-black/70" />
                <div className="absolute right-0 z-10 h-full w-[10%] border-l-[3px] border-dashed border-red-500 bg-black/70" />
              </>
            ) : null}

            <Image
              src={files[0].preview}
              alt="Uploaded file preview"
              width={400}
              height={400}
              className="object-contain "
            />
          </div>
        </div>

        {!loading ? (
          <div className="ml-12 flex h-full flex-col items-center justify-center">
            <button
              onClick={() => {
                setFiles([])
                setVerticalCheck(false)
                setHorizontalCheck(false)
              }}
              className={`flex items-center p-2 text-center text-base ${
                dimensions.valid
                  ? "text-neutral-500 hover:text-neutral-600"
                  : "text-neutral-400 hover:text-neutral-500"
              } duration-200`}>
              <RiArrowLeftLine className="mr-1.5" />
              Cancel Post
            </button>
            <textarea
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="my-4 h-24 w-full resize-none rounded border-[1px] border-white/25 bg-white/5 p-2  placeholder:text-neutral-600 hover:border-white/75 focus:border-white/75"
            />
            <div className="text-neutral-500">
              Dimensions:{" "}
              <span className="font-semibold text-white">
                {dimensions.width} x {dimensions.height}
              </span>
            </div>
            <div className="mt-1 flex items-center text-neutral-500">
              Aspect Ratio:{" "}
              <span className="ml-1 font-semibold text-white">
                {dimensions.aspectRatio}
              </span>
              {dimensions.valid ? (
                <FiCheck className="ml-1.5 text-lg text-violet-500" />
              ) : (
                <FiX className="ml-1.5 text-lg text-red-500" />
              )}
            </div>

            {dimensions.valid ? null : (
              <>
                <div className="mt-1.5 text-center text-xs font-bold text-red-500">
                  Invalid Aspect Ratio
                </div>
                <div className="mt-0.5 text-center text-xs font-medium text-red-500">
                  Maximum <span className="font-bold underline">1:1.25</span> or{" "}
                  <span className="font-bold underline">1.91:1</span>
                </div>
              </>
            )}

            <div className="mt-3 flex space-x-2">
              <SizeChecks
                horizontal
                horizontalCheck={horizontalCheck}
                verticalCheck={verticalCheck}
                setHorizontalCheck={setHorizontalCheck}
                setVerticalCheck={setVerticalCheck}
              />
              <SizeChecks
                horizontal={false}
                horizontalCheck={horizontalCheck}
                verticalCheck={verticalCheck}
                setHorizontalCheck={setHorizontalCheck}
                setVerticalCheck={setVerticalCheck}
              />
            </div>

            <div className="mb-3 mt-6 h-[1px] w-72 bg-white/25" />

            <div
              className={`custom-gradient group relative z-10 mt-5 w-full rounded p-[1px]`}>
              <div
                className={`custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 ${
                  dimensions.valid ? "group-hover:opacity-70" : ""
                }`}></div>
              <button
                onClick={() => {
                  setLoading(true)
                  setVerticalCheck(false)
                  setHorizontalCheck(false)

                  uploadPost()
                }}
                disabled={!dimensions.valid}
                className="relative flex w-full select-none items-center justify-center rounded bg-black py-1.5 pl-3 pr-4 text-lg font-medium disabled:cursor-not-allowed">
                Publish Image
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="ml-12 flex h-full flex-col items-center justify-center">
              <span className="loader"></span>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ConfirmPost
