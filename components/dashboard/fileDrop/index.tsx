import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineFileAdd } from "react-icons/ai"
import { loadImage } from "../../../utils/loadImage"
import UploadPage from "./uploadPage"
import ConfirmPost from "./confirmPage"
import CompletePage from "./completePage"

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

  return (
    <>
      {/* <p className="opacity/50 text-xs">{JSON.stringify(files)}</p> */}
      {files.length === 0 ? (
        <>
          <UploadPage>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="flex flex-col items-center justify-center">
              <input {...getInputProps()} />
              <AiOutlineFileAdd className="mb-2 h-12 w-12 cursor-pointer text-white" />
              <div className="cursor-pointer text-lg font-medium">
                Upload / Drop
              </div>
              <p className="text-sm text-neutral-500">.jpg or .jpeg</p>
            </div>
          </UploadPage>
        </>
      ) : success ? (
        <CompletePage
          files={files}
          setFiles={setFiles}
          setSuccess={setSuccess}
          setLoading={setLoading}
        />
      ) : (
        <ConfirmPost
          horizontalCheck={horizontalCheck}
          setHorizontalCheck={setHorizontalCheck}
          verticalCheck={verticalCheck}
          setVerticalCheck={setVerticalCheck}
          dimensions={dimensions}
          loading={loading}
          setLoading={setLoading}
          files={files}
          setFiles={setFiles}
        />
      )}
    </>
  )
}

export default FileDrop
