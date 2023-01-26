import { Box } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PieChart from "../../../../lib/PieChart"

const RentalTotal = ({ data, color }) => {
  const chartData = []
  //const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]
  //const rentalDailyColor = ["#4299E1", "#9F7AEA"]
  //const rentalTotalColor = ["#48BB78", "#9F7AEA"]

  data.map((item) => {
    chartData.push({
      id: item.__typename,
      feeCollectorEarnings: item.feeCollectorEarnings,
      lessorEarnings: item.lessorEarnings,
      rentals: item.rentals,
      volume: item.volume,
    })
  })

  const mapData = (id: string, val: number) => {
    return {
      id: id,
      label: id,
      value: val,
    }
  }

  const result = [
    mapData("Lessor Earnings", chartData[0].lessorEarnings.slice(0, -18)),
    mapData(
      "Fee Collector Earnings",
      chartData[0].feeCollectorEarnings.slice(0, -18)
    ),
  ]

  console.log(chartData[0].volume)
  const avgData = [
    {
      id: "Total Volume",
      label: "Total Volume",
      value: Number(chartData[0].volume.slice(0, -17)),
      color: color[2],
    },
    {
      id: "Total Rentals",
      label: "Total Rentals",
      value: Number(chartData[0].rentals),
      color: color[3],
    },
  ]

  return (
    <Box w={["100%", "100%", "100%", "100%", "100%", "33%"]}>
      <BoxWrapper>
        <BoxTitle
          name="Rentals Total"
          date={""}
          avgData={avgData}
          slicedData={""}
          color={color}
          description="Total rental data since YY MMM. DD"
        />
        <PieChart data={result} color={color} />
      </BoxWrapper>
    </Box>
  )
}

export default RentalTotal
