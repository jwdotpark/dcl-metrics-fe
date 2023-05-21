import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

//export const DataAtom = atom([])
//export const SceneDataAtom = atom([])
//export const LoadingStateAtom = atom(false)
export const AuthAtom = atomWithStorage("auth", null)
export const BoxAtom = atom({})
