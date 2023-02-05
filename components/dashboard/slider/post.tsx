import Image from "next/image"
import { FiEdit2, FiTrash } from "react-icons/fi"

const Post = ({ post }: { post: { media_url: string; id: string } }) => {
  return (
    <div className="relative aspect-square h-[250px] overflow-hidden rounded bg-white/10 xs:h-[300px] md:h-[350px]">
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
        {/* <div className="absolute text-xs text-black">{post.media_url}</div> */}
      </div>
      
    </div>
  )
}

export default Post
