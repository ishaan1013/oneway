import { atom } from "jotai";

export const fbUserAtom = atom<any>({})
export const accessTokenAtom = atom<string>("")
export const fbPagesAtom = atom<any>({})
export const selectedPageAtom = atom<number>(0)
export const selectedValidAtom = atom<boolean>(true)
export const igIdAtom = atom<string>("")