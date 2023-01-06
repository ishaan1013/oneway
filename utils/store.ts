import { atom } from "jotai";

export const accountPopupAtom = atom(false)

export const fbUserAtom = atom<any>({})
export const accessTokenAtom = atom("")
export const fbPagesAtom = atom<any>({})
export const selectedPageAtom = atom(0)
export const selectedValidAtom = atom(true)
export const igIdAtom = atom("")