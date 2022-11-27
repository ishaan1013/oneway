import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineFileAdd } from "react-icons/ai"

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
      {files.length === 0 ? (
        <div className="custom-gradient group relative z-10 mt-12 w-96 rounded p-[1px]">
          <section className="peer flex w-full cursor-default items-center justify-center rounded bg-black p-4 py-12 duration-200">
            <div
              {...getRootProps({ className: "dropzone" })}
              className="flex flex-col items-center justify-center">
              <input {...getInputProps()} />
              <AiOutlineFileAdd className="mb-2 h-12 w-12 cursor-pointer text-white" />
              <div className="cursor-pointer font-medium">Upload / Drop</div>
            </div>
          </section>
          <div className="custom-gradient absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl duration-200 peer-hover:opacity-40" />
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 16,
        }}>
        {files.length !== 0 ? (
          <div>
            {thumbs}
            <div className="custom-gradient group relative z-10 mt-2 w-full rounded p-[1px]">
              <div className="custom-gradient absolute -z-10 h-full w-full opacity-30 blur-xl duration-200 group-hover:opacity-70"></div>
              <button className="relative flex w-full select-none items-center justify-center rounded bg-black py-1.5 pl-3 pr-4 text-lg font-medium">
                Publish Image
              </button>
            </div>
            <button className="mt-2 w-full text-center text-base opacity-50">
              Cancel Post
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default FileDrop
