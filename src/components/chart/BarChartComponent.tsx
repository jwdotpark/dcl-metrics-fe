// @ts-nocheck
import dynamic from "next/dynamic"
import { GridItem } from "@chakra-ui/react"
import ComponentHeader from "../local/ComponentHeader"
const BarChart = dynamic(() => import("../../lib/BarChart"), {
  ssr: false,
})

const BarChartComponent = ({ data }) => {
  const box = {
    h: "460",
    w: "100%",
    bg: "white",
  }

  // console.log("data: ", data)

  return (
    <GridItem h={box.h} bg={box.bg} borderRadius="md">
      <BarChart data={data} />
    </GridItem>
  )
}

export default BarChartComponent
