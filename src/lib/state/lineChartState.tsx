import { atomWithStorage } from "jotai/utils"

export const lineChartAtom = atomWithStorage("chart", {
  toggleMarker: true,
  toggleArea: true,
  height: 350,
  curveType: "linear",
})
