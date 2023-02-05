import Image from "next/image"
import { FiEdit2, FiTrash } from "react-icons/fi"

const Post = ({ post }: { post: { media_url: string; id: string } }) => {
  return (
    <div className="group relative aspect-square h-[250px] overflow-hidden rounded bg-white/10 xs:h-[300px] md:h-[350px]">
      <div className="relative z-0 h-full w-full bg-cover">
        <Image
          src={post.media_url}
          alt="Instagram Post"
          fill={true}
          sizes="(max-width: 479px) 700px,
          (max-width: 767px) 750px,
          800px"
          className="min-h-full min-w-full object-cover"
        />
        <div className="absolute text-xs text-black">{post.media_url}</div>
      </div>
      <div className="absolute -top-16 -right-20 z-10 h-44 w-56 rounded-full bg-black opacity-0 blur-3xl duration-100 group-hover:opacity-100" />
      <div className="absolute top-2 right-2 z-10 flex space-x-1.5 opacity-0 duration-200 group-hover:opacity-100">
        <button className="rounded-full border-[1px] border-white/25 backdrop-blur-md duration-200 hover:border-white/75 hover:bg-white/10 ">
          <FiEdit2 className="h-8 w-8 p-2" />
        </button>
        <button className="rounded-full border-[1px] border-red-500/50 bg-red-500/10 text-red-500 backdrop-blur-md duration-200 hover:border-red-500 hover:bg-red-500/20 ">
          <FiTrash className="h-8 w-8 p-2" />
        </button>
      </div>
    </div>
  )
}

export default Post
