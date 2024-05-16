import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PieChart from "../../../../lib/PieChart"
import { format, fromUnixTime, differenceInDays } from "date-fns"

const RentalTotal = ({ data }) => {
  const { analyticsTotalDatas } = data
  const chartData = []
  const color = ["#FBB4AE", "#B3CDE3"]

  //const firstDate = moment
  //  .unix(data.analyticsDayDatas[0].date)
  //  .format("YYYY MMM. D")
  const firstDate = format(
    fromUnixTime(data.analyticsDayDatas[0].date),
    "yyyy MMM. d"
  )

  //const diff = moment(new Date()).diff(
  //  moment.unix(data.analyticsDayDatas[0].date),
  //  "days"
  //)
  const diff = differenceInDays(
    new Date(),
    fromUnixTime(data.analyticsDayDatas[0].date)
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
      color: color[0],
    },
    {
      id: "Total Rentals",
      label: "Total Rentals",
      value: Number(chartData[0].rentals),
      color: color[1],
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
        description={`Total data since ${firstDate}`}
        line={{}}
        setLine={() => {}}
      />
      <PieChart data={result} />
    </BoxWrapper>
  )
}

export default RentalTotal
