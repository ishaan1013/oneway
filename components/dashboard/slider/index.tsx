import { useAtom } from "jotai"
import {
  accessTokenAtom,
  fbPagesAtom,
  igIdAtom,
  selectedPageAtom,
} from "../../../utils/store"
import Post from "../post"
import { useEffect, useState } from "react"

const Slider = () => {
  const [fbPages] = useAtom(fbPagesAtom)
  const [selectedPage] = useAtom(selectedPageAtom)
  const [accessToken] = useAtom(accessTokenAtom)
  const [igId, setIgId] = useAtom(igIdAtom)
  const [igData, setIgData] = useState<{ id?: number; username: string }>({
    username: "No IG",
  })
  const [igMedia, setIgMedia] = useState<any>()

  useEffect(() => {
    const selection = fbPages?.data[selectedPage]

    const getIg = async () => {
      const res = await fetch(
        `/api/fbGraph/igAccount?pageId=${selection.id}&token=${accessToken}`,
        {
          method: "GET",
        }
      )
      return await res.json()
    }
    const getIgMedia = async () => {
      const res = await fetch(
        `/api/fbGraph/igMedia?igUserId=${igId}&token=${accessToken}`,
        {
          method: "GET",
        }
      )
      return await res.json()
    }
    getIg().then((res) => {
      console.log("🚀 ~ file: page.tsx:33 ~ getIg ~ res", res)
      setIgData(res.message)
      setIgId(res.message.id)
      getIgMedia().then((res) => {
        setIgMedia(res?.message?.data)
        console.log("igMedia:", res)
      })
    })
  }, [])

  return (
    <div className="slider relative grid w-full auto-cols-[250px] grid-flow-col gap-8 overflow-x-auto pt-2 pb-4 xs:auto-cols-[300px] md:auto-cols-[350px] ">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <div>{JSON.stringify(igMedia)}</div>
    </div>
  )
}

export default Slider
