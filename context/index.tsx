import { useContext } from "react"

import { GlobalContext } from "./context"

export const useGlobalContext = () => useContext(GlobalContext)
