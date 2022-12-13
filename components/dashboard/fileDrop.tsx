import { default as NextImage } from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineFileAdd } from "react-icons/ai"
import { FiCheck, FiX } from "react-icons/fi"
import { RiArrowRightLine } from "react-icons/ri"
import { BsArrowReturnRight, BsArrowRepeat } from "react-icons/bs"
import { TbLineDashed } from "react-icons/tb"

const loadImage = ({
  setDimensions,
  imgURL,
}: {
  setDimensions: (dimensions: any) => void
  imgURL: string
}) => {
  const img = new Image()
  img.src = imgURL
  img.onload = () => {
    const aspectRatio =
      img.width >= img.height
        ? Math.round((img.width / img.height + Number.EPSILON) * 100) / 100 +
          ":1"
        : "1:" +
          Math.round((img.height / img.width + Number.EPSILON) * 100) / 100

    const n1 = aspectRatio.substring(0, aspectRatio.indexOf(":"))
    const n2 = aspectRatio.substring(
      aspectRatio.indexOf(":") + 1,
      aspectRatio.length
    )
    const valid =
      parseFloat(n1) === 1 ? parseFloat(n2) < 1.25 : parseFloat(n1) < 1.91

    setDimensions({
      width: img.width,
      height: img.height,
      aspectRatio,
      valid,
    })
    console.log(img.width, img.height)
  }
  img.onerror = (err: any) => {
    console.log("img error")
    console.log(err)
  }
}

const FileDrop = () => {
  const [files, setFiles] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [horizontalCheck, setHorizontalCheck] = useState<boolean>(false)
  const [verticalCheck, setVerticalCheck] = useState<boolean>(false)
  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
    aspectRatio: string
    valid: boolean
  }>({ width: 0, height: 0, aspectRatio: "", valid: true })

  useEffect(() => {
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setSuccess(true)
      }
    }, 3000)
  }, [loading])

  useEffect(() => {
    if (files.length > 0) {
      loadImage({
        setDimensions,
        imgURL: files[0].preview,
      })
    }
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const thumbs = files.map((file: any) => (
    <div
      className="inline-flex h-[400px] w-[400px] overflow-hidden rounded border-[1px] border-white/25 bg-black"
      key={file.name}>
      <div className="relative flex min-w-0 overflow-hidden">
        {/* <div className="absolute">{file.preview}</div> */}
        {horizontalCheck ? (
          <>
            <div className="absolute top-0 z-10 h-[23.82%] w-full border-b-[3px] border-dashed border-red-500 bg-black/70 backdrop-blur-sm" />
            <div className="absolute bottom-0 z-10 h-[23.82%] w-full border-t-[3px] border-dashed border-red-500 bg-black/70 backdrop-blur-sm" />
          </>
        ) : verticalCheck ? (
          <>
            <div className="absolute left-0 z-10 h-full w-[10%] border-r-[3px] border-dashed border-red-500 bg-black/70 backdrop-blur-sm" />
            <div className="absolute right-0 z-10 h-full w-[10%] border-l-[3px] border-dashed border-red-500 bg-black/70 backdrop-blur-sm" />
          </>
        ) : null}

        <NextImage
          src={file.preview}
          alt="Uploaded file preview"
          width={400}
          height={400}
          className="object-contain "
        />
      </div>
    </div>
  ))

  const thumbs2 = files.map((file: any) => (
    <div
      className="mt-4 inline-flex h-[350px] w-[350px] overflow-hidden rounded border-[1px] border-white/25 bg-black"
      key={file.name}>
      <div className="flex min-w-0 overflow-hidden">
        <NextImage
          src={file.preview}
          alt="Posted image preview"
          width={350}
          height={350}
          className="object-contain"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  return (
    <>
      {/* <p className="opacity/50 text-xs">{JSON.stringify(files)}</p> */}
      {files.length === 0 ? (
        <>
          <h1 className="text-center text-3xl font-bold">Create</h1>
          <div className="custom-gradient group relative z-10 mt-10 w-96 rounded p-[1px]">
            <section className="peer flex w-full cursor-default items-center justify-center rounded bg-black p-4 py-12 duration-200">
              <div
                {...getRootProps({ className: "dropzone" })}
                className="flex flex-col items-center justify-center">
                <input {...getInputProps()} />
                <AiOutlineFileAdd className="mb-2 h-12 w-12 cursor-pointer text-white" />
                <div className="cursor-pointer text-lg font-medium">
                  Upload / Drop
                </div>
                <p className="text-sm opacity-50">.jpg or .jpeg</p>
              </div>
            </section>
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
      ) : success ? (
        <>
          <div className="relative z-10 mb-3 -mt-3 flex h-12 w-12 items-center justify-center">
            <div className="custom-gradient absolute -z-10 h-12 w-12 rounded-full blur-xl" />
            <FiCheck className="h-full w-full rounded-full border-[1px] border-white/25 bg-black px-2 pt-2.5 pb-1.5 text-white" />
          </div>
          <div className="text-lg font-medium">Successfully Uploaded</div>

          {thumbs2}

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
      ) : (
        <>
          <div className="mt-4 flex h-[400px]">
            {thumbs}
            {!loading ? (
              <div className="ml-12 flex h-full flex-col items-center justify-center">
                <div className="text-white/50">
                  Dimensions:{" "}
                  <span className="font-semibold text-white">
                    {dimensions.width} x {dimensions.height}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-white/50">
                  Aspect Ratio:{" "}
                  <span className="ml-1 font-semibold text-white">
                    {dimensions.aspectRatio}
                  </span>
                  {dimensions.valid ? (
                    <FiCheck className="ml-1.5 text-lg text-green-400" />
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
                      Maximum{" "}
                      <span className="font-bold underline">1:1.25</span> or{" "}
                      <span className="font-bold underline">1.91:1</span>
                    </div>
                  </>
                )}

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => setHorizontalCheck((prev) => !prev)}
                    disabled={verticalCheck}
                    className={`flex select-none items-center justify-center rounded border-[1px] ${
                      horizontalCheck
                        ? "border-white/50 bg-white/[0.15] hover:border-white/75 hover:bg-white/25"
                        : "border-white/25 bg-black hover:border-white/75 hover:bg-white/10 disabled:cursor-not-allowed disabled:hover:border-white/25 disabled:hover:bg-black"
                    } p-1.5 text-2xl font-medium duration-200`}>
                    <TbLineDashed />
                  </button>
                  <button
                    onClick={() => setVerticalCheck((prev) => !prev)}
                    disabled={horizontalCheck}
                    className={`flex rotate-90 select-none items-center justify-center rounded border-[1px] ${
                      verticalCheck
                        ? "border-white/50 bg-white/[0.15] hover:border-white/75 hover:bg-white/25"
                        : "border-white/25 bg-black hover:border-white/75 hover:bg-white/10 disabled:cursor-not-allowed disabled:hover:border-white/25 disabled:hover:bg-black"
                    } p-1.5 text-2xl font-medium duration-200`}>
                    <TbLineDashed />
                  </button>
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
                    }}
                    disabled={!dimensions.valid}
                    className="relative flex w-full select-none items-center justify-center rounded bg-black py-1.5 pl-3 pr-4 text-lg font-medium disabled:cursor-not-allowed">
                    Publish Image
                  </button>
                </div>
                <button
                  onClick={() => {
                    setFiles([])
                    setVerticalCheck(false)
                    setHorizontalCheck(false)
                  }}
                  className={`p-2 text-center text-base ${
                    dimensions.valid
                      ? "opacity-50 hover:opacity-30"
                      : "opacity-80 hover:opacity-50"
                  } duration-200`}>
                  Cancel Post
                </button>
              </div>
            ) : (
              <>
                <div className="ml-12 flex h-full flex-col items-center justify-center">
                  <div className="custom-gradient relative z-10 mt-3 w-full animate-pulse rounded p-[1px]">
                    <div className="custom-gradient absolute -z-10 h-full w-full opacity-50 blur-xl duration-200"></div>
                    <div className="relative flex w-full select-none items-center justify-center rounded bg-black py-1.5 pl-3 pr-4 text-lg font-medium">
                      Posting...
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default FileDrop
