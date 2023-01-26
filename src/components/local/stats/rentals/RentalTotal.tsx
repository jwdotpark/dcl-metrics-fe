import { Box } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PieChart from "../../../../lib/PieChart"
import moment from "moment"

const RentalTotal = ({ data }) => {
  const { analyticsTotalDatas } = data
  const chartData = []
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]

  const firstDate = moment
    .unix(data.analyticsDayDatas[0].date)
    .format("YYYY MMM. D")

  const diff = moment(new Date()).diff(
    moment.unix(data.analyticsDayDatas[0].date),
    "days"
  )
  analyticsTotalDatas.map((item) => {
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
    mapData("Lessor Earnings", chartData[0].lessorEarnings.slice(0, -17)),
    mapData(
      "Fee Collector Earnings",
      chartData[0].feeCollectorEarnings.slice(0, -17)
    ),
  ]

  const avgData = [
    {
      id: "Total Mana",
      label: "Total Mana",
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
    <BoxWrapper colSpan={[4, 4, 4, 4, 2]}>
      <BoxTitle
        name="Rentals Total"
        date={""}
        avgData={avgData}
        slicedData={diff}
        color={color}
        description={`Total rentals data since ${firstDate}`}
      />
      <PieChart data={result} color={color} />
    </BoxWrapper>
  )
}

export default RentalTotal
