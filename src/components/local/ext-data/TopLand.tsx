import { useState } from "react"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import TopLandDateRange from "../stats/daterange/TopLandDateRange"
import TableComponent from "../stats/partials/TableComponent"
import BottomLegend from "./partial/BottomLegend"

const TopLand = ({ data }) => {
  const [dateRange, setDateRange] = useState("yearTop")
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
    "Map",
    "Last Sold At",
    "Coord",
    "Buyer",
    //"Symbol",
    "ETH Price",
    "Valuation",
  ]

  const bodyList = [
    "map",
    "date",
    "coord",
    "buyer",
    //"symbol",
    "eth_price",
    "valuation",
  ]

  return (
    <BoxWrapper colSpan={6}>
      <BoxTitle
        name="Top Valued Land"
        description="Land parcels in Decentraland that have the highest market value"
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
      <BottomLegend description="Source from" link="https://metagamehub.io" />
    </BoxWrapper>
  )
}

export default TopLand
