import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Box } from "@chakra-ui/react"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"

const Rental = ({ data }) => {
  const color = ["blue", "yellow", "green"]

  const mapData = (id: string) => {
    return {
      id: id,
      data: data.map((item) => ({
        x: item.date,
        y: item[id],
        degraded: false,
      })),
    }
  }

  const result = [
    mapData("floor"),
    mapData("seven_day_avg"),
    mapData("thirty_day_avg"),
  ]

  const partial = data.slice(0, 90)

  return (
    <BoxWrapper>
      <Box h="auto">
        <BoxTitle
          name="Rentals"
          date={""}
          avgData={""}
          slicedData={partial}
          color={color}
          description="rentals"
        />
        {/*<DateRangeButton
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={90}
          name="global_unique_visitors"
          yesterday={false}
        />*/}
        <LineChart data={result} color={color} name="rental" />
      </Box>
    </BoxWrapper>
  )
}

export default Rental
