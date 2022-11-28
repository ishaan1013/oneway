import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineFileAdd } from "react-icons/ai"
import { RiArrowRightLine } from "react-icons/ri"

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "auto",
  height: "100%",
}

const FileDrop = () => {
  const [files, setFiles] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
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
      className="mt-6 inline-flex w-96 overflow-hidden rounded"
      key={file.name}>
      <div className="flex min-w-0 overflow-hidden">
        <Image
          src={file.preview}
          alt="Uploaded file preview"
          width={384}
          height={216}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <>
      {/* <p className="opacity/50 text-xs">{JSON.stringify(files)}</p> */}
      {loading ? (
        <>
          <span className="loader mt-16"></span>
          <div className="mt-4 animate-pulse text-center text-lg font-medium">
            Posting
          </div>
          {/* <div className="mt-4 text-center text-lg font-medium">
            Getting Account Info
          </div> */}
        </>
      ) : files.length === 0 ? (
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
          <div className="mt-5 h-[1px] w-96 bg-white/25" />
          <div className="mt-3 text-lg font-medium">Conversion Tools</div>
          <div className="mt-1 flex w-96 flex-col items-center sm:flex-row sm:justify-center">
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
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold">Create</h1>
          <div className="mt-4 flex flex-wrap">
            <div className="flex flex-col items-center">
              {thumbs}
              <div className="custom-gradient group relative z-10 mt-3 w-full rounded p-[1px]">
                <div className="custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 group-hover:opacity-70"></div>
                <button className="relative flex w-full select-none items-center justify-center rounded bg-black py-1.5 pl-3 pr-4 text-lg font-medium">
                  Publish Image
                </button>
              </div>
              <button
                onClick={() => {
                  setFiles([])
                }}
                className="p-2 text-center text-base opacity-50 duration-200 hover:opacity-30">
                Cancel Post
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default FileDrop
