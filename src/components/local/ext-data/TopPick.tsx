import { useState } from "react"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import TopLandDateRange from "../stats/daterange/TopLandDateRange"
import TableComponent from "../stats/partials/TableComponent"
import BottomLegend from "./partial/BottomLegend"

const TopLand = ({ data }) => {
  const tableData = []

  data.map((item) => {
    tableData.push({
      coord: item.coords.x + "," + item.coords.y,
      current_price: item.current_price,
      current_price_eth: item.current_price_eth,
      eth_predicted_price: item.eth_predicted_price,
      external_link: item.external_link,
      floor_adjusted_predicted_price: item.floor_adjusted_predicted_price,
      gap: item.gap,
      image: item.images.image_url,
      opensea: item.market_links.opensea,
      x2y2: item.market_links.x2y2,
      looksrare: item.market_links.looksrare,
      name: item.name,
      owner: item.owner,
    })
  })

  console.log("table data", tableData)

  // extract the key of tableData into an array
  const headList = Object.keys(tableData[0])
  console.log(headList)

  //const headList = [
  //  "Scenes Map",
  //  "Date",
  //  "Coord",
  //  "Buyer",
  //  "Symbol",
  //  "ETH Price",
  //  "Valuation",
  //]

  //const bodyList = [
  //  "map",
  //  "date",
  //  "coord",
  //  "buyer",
  //  "symbol",
  //  "eth_price",
  //  "valuation",
  //]

  return (
    <BoxWrapper colSpan={6}>
      <BoxTitle
        name="Top Picked Land"
        description="Land parcels in Decentraland that have the highest market value"
        date={""}
        avgData={[]}
        slicedData={[]}
        color={[]}
        line={false}
        setLine={false}
      />
      {/*<TopLandDateRange
        dateRange={dateRange}
        setDateRange={setDateRange}
        name="top-land"
      />*/}
      <TableComponent
        data={tableData}
        dateRange=""
        propertyName="map"
        headList={headList}
        bodyList={headList}
      />
      <BottomLegend description="Source from MetaGameHub DAO" />
    </BoxWrapper>
  )
}

export default TopLand
