import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const AuthAtom = atomWithStorage("auth", null)
export const BoxAtom = atom({})
