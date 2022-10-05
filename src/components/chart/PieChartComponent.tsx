// @ts-nocheck
import dynamic from "next/dynamic"
import { GridItem } from "@chakra-ui/react"
import data from "../../../public/data/pie-chart-data.json"
import ComponentHeader from "../local/ComponentHeader"
const PieChart = dynamic(() => import("../../lib/PieChart"), { ssr: false })

const PieChartComponent = () => {
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
      shadow="md"
    >
      <ComponentHeader name="Pie Chart" />
      <PieChart data={data} />
    </GridItem>
  )
}

export default PieChartComponent
