import { useAtom } from "jotai"
import {
  accessTokenAtom,
  fbPagesAtom,
  igIdAtom,
  selectedPageAtom,
} from "../../../utils/store"
import Post from "../post/post"
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
    const getIgMedia = async (id: string) => {
      const res = await fetch(
        `/api/fbGraph/igMedia?igUserId=${id}&token=${accessToken}`,
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
      getIgMedia(res.message.id).then((res) => {
        setIgMedia(res?.message?.data)
      })
    })
  }, [])

  return (
    <div className="slider relative grid w-full auto-cols-[250px] grid-flow-col gap-8 overflow-x-auto pt-2 pb-4 xs:auto-cols-[300px] md:auto-cols-[350px] ">
      {igMedia?.map((post: { media_url: string; id: string }, i: number) => (
        <Post key={i} post={post} />
      ))}
      {/* <div>{JSON.stringify(igMedia)}</div> */}
    </div>
  )
}

export default Slider
