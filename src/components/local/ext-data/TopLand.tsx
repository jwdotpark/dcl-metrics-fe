import { useState } from "react"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import TableComponent from "../stats/partials/TableComponent"
import BottomLegend from "./partial/BottomLegend"

const TopLand = ({ data }) => {
  const [dateRange, setDateRange] = useState("totalTop")
  const dataArr = data[dateRange]
  const tableData = []

  const extractCoord = (str) => {
    const regex = /x:(-?\d+), y:(-?\d+)/
    const match = str.match(regex)
    if (match) {
      return `${match[1]},${match[2]}`
    } else {
      return ""
    }
  }

  dataArr.map((item) => {
    tableData.push({
      image: item.dataTable.image,
      date: item.dataTable.date,
      coord: extractCoord(item.dataTable.asset),
      buyer: item.dataTable.buyer,
      eth_price: item.dataTable.eth_price,
      landId: item.dataTable.landId,
      symbol: item.dataTable.symbol,
      valuation: item.dataTable.valuation,
    })
  })

  const headList = [
    "Scenes Map",
    "Date",
    "Coord",
    "Buyer",
    "ETH Price",
    "Symbol",
    "Valuation",
  ]

  const bodyList = [
    "map",
    "date",
    "coord",
    "buyer",
    "eth_price",
    "symbol",
    "valuation",
  ]

  return (
    <BoxWrapper colSpan={6}>
      <BoxTitle
        name="Top Land"
        description="some description"
        date={""}
        avgData={[]}
        slicedData={[]}
        color={[]}
        line={false}
        setLine={false}
      />
      <TableComponent
        data={tableData}
        dateRange={dateRange}
        propertyName={bodyList[0]}
        headList={headList}
        bodyList={bodyList}
      />
      <BottomLegend description="some bottom description" />
    </BoxWrapper>
  )
}

export default TopLand
