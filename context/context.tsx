import React, { createContext, useState } from "react"

interface IGlobalContextProps {
  fbUserId: any
  igUserId: any
  loading: boolean
  setFbUserId: (user: any) => void
  setIgUserId: (user: any) => void
  setLoading: (loading: boolean) => void
}

export const GlobalContext = createContext<IGlobalContextProps>({
  fbUserId: {},
  igUserId: {},
  loading: true,
  setFbUserId: () => {},
  setIgUserId: () => {},
  setLoading: () => {},
})

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [fbUserId, setFbUserId] = useState("")
  const [igUserId, setIgUserId] = useState("test")
  const [isLoading, setIsLoading] = useState(true)

  return (
    <GlobalContext.Provider
      value={{
        fbUserId: fbUserId,
        igUserId: igUserId,
        loading: isLoading,
        setFbUserId: setFbUserId,
        setIgUserId: setIgUserId,
        setLoading: setIsLoading,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
