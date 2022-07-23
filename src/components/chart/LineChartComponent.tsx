// @ts-nocheck
import dynamic from "next/dynamic"
import { GridItem } from "@chakra-ui/react"
import data from "../../../public/data/line-chart-data.json"
import ComponentHeader from "../local/ComponentHeader"
const LineChart = dynamic(() => import("../../lib/LineChart"), {
  ssr: false,
})

const LineChartComponent = () => {
  // TODO put box property into context
  const box = {
    h: "450",
    w: "100%",
    bg: "white",
  }

  return (
    <GridItem
      minW={box.w}
      maxW={box.w}
      h={box.h}
      bg={box.bg}
      borderRadius="md"
      boxShadow="md"
    >
      <ComponentHeader name="Line Chart" />
      <LineChart data={data} />
    </GridItem>
  )
}

export default LineChartComponent
