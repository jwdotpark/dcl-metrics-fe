import { Box } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PieChart from "../../../../lib/PieChart"

const RentalTotal = ({ data }) => {
  const chartData = []
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]
  const totalColor = ["#4299E1", "#F56565"]
  const restTotalColor = ["#48BB78", "#9F7AEA"]

  data.map((item) => {
    chartData.push({
      id: item.__typename,
      feeCollectorEarnings: item.feeCollectorEarnings,
      lessorEarnings: item.lessorEarnings,
      rentals: item.rentals,
      volume: item.volume,
    })
  })

  const mapData = (id: string, key: number) => {
    return {
      id: id,
      label: id,
      value: key,
      color: color[key],
    }
  }

  const result = [
    //mapData("Volume", chartData[0].volume),
    mapData("Lessor Earnings", chartData[0].lessorEarnings.slice(0, -18)),
    mapData(
      "Fee Collector Earnings",
      chartData[0].feeCollectorEarnings.slice(0, -18)
    ),
    //mapData("Rentals", chartData[0].rentals),
  ]

  const avgData = [
    {
      id: "Total Volume",
      label: "Total Volume",
      value: Number(chartData[0].volume.slice(0, -18)),
      color: totalColor[0],
    },
    {
      id: "Total Rentals",
      label: "Total Rentals",
      value: Number(chartData[0].rentals),
      color: totalColor[1],
    },
  ]

  return (
    <Box w={["100%", "50%"]}>
      <BoxWrapper>
        <BoxTitle
          name="Rentals Total"
          date={""}
          avgData={avgData}
          slicedData={""}
          color={restTotalColor}
          description="Total rental data"
        />
        <PieChart data={result} color={totalColor} />
      </BoxWrapper>
    </Box>
  )
}

export default RentalTotal
