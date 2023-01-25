import { Box } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PieChart from "../../../../lib/PieChart"

const RentalTotal = ({ data }) => {
  const chartData = []
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]

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
    mapData("Volume", chartData[0].volume),
    mapData("Lessor Earnings", chartData[0].lessorEarnings),
    mapData("Fee Collector Earnings", chartData[0].feeCollectorEarnings),
    mapData("Rentals", chartData[0].rentals),
  ]

  return (
    <Box w={["100%", "50%"]}>
      <BoxWrapper>
        <BoxTitle
          name="Rental Total"
          date={""}
          avgData={""}
          slicedData={""}
          color={""}
          description="Total rental data"
        />
        <PieChart data={result} />
      </BoxWrapper>
    </Box>
  )
}

export default RentalTotal
