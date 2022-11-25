import { AiOutlineUser } from "react-icons/ai"

const UserIcon = () => {
  return (
    <div className="relative z-10 flex -translate-y-0.5 items-center justify-center">
      <button className="peer rounded-full border-[1px] border-white/30 bg-white/5 backdrop-blur-md duration-200 hover:bg-white/[0.12]">
        <AiOutlineUser className="h-[2.7rem] w-[2.7rem] p-2.5" />
      </button>

      <div className="custom-gradient absolute -z-10 h-16 w-16 opacity-50 blur-xl duration-200 peer-hover:opacity-80"></div>
    </div>
  )
}

export default UserIcon
