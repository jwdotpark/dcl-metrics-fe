// @ts-nocheck
import dynamic from "next/dynamic"
import { GridItem } from "@chakra-ui/react"
import data from "../../../public/data/line-chart-data.json"
import ComponentHeader from "../local/ComponentHeader"
const LineChart = dynamic(() => import("../../lib/LineChart"), {
  ssr: false,
})

const LineChartComponent = ({ box, res }) => {
  const result = [
    {
      id: "Active Parcels",
      color: "hsl(170, 70%, 50%)",
      data: res.map((item) => ({
        x: item.date,
        y: item.active_parcels,
      })),
    },
    {
      id: "Unique Users",
      color: "hsl(325, 70%, 50%)",
      data: res.map((item) => ({
        x: item.date,
        y: item.unique_users,
      })),
    },
  ]

  return (
    <GridItem
      minW={box.w}
      maxW={box.w}
      h={box.h}
      bg={box.bg}
      borderRadius="md"
      boxShadow="md"
    >
      <ComponentHeader />
      <LineChart data={result} />
    </GridItem>
  )
}

export default LineChartComponent
