import { FiEdit2, FiTrash } from "react-icons/fi"

const Post = () => {
  return (
    <div className="xs:h-[300px] group relative aspect-square h-[250px] overflow-hidden rounded bg-blue-900 md:h-[350px]">
      <div className="absolute -top-16 -right-12 h-36 w-44 rounded-full bg-black opacity-0 blur-3xl duration-100 group-hover:opacity-100" />
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
