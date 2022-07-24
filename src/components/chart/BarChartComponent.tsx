// @ts-nocheck
import dynamic from "next/dynamic"
import { GridItem } from "@chakra-ui/react"
import data from "../../../public/data/bar-chart-data.json"
import ComponentHeader from "../local/ComponentHeader"
const BarChart = dynamic(() => import("../../lib/BarChart"), {
  ssr: false,
})

const BarChartComponent = () => {
  // TODO put box property into context
  const box = {
    h: "450",
    w: "100%",
    bg: "white",
  }

  // console.log("data: ", data)

  return (
    <GridItem
      minW={box.w}
      maxW={box.w}
      h={box.h}
      bg={box.bg}
      borderRadius="md"
      boxShadow="md"
    >
      <ComponentHeader name="Bar Chart" />
      <BarChart data={data} />
    </GridItem>
  )
}

export default BarChartComponent
