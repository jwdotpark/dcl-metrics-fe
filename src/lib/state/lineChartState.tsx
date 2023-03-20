import { atom } from "jotai"

export const lineChartAtom = atom({
  toggleMarker: true,
  toggleArea: true,
  height: 350,
  curveType: "linear",
})
