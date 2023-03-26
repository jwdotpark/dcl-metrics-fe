import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import TableComponent from "../stats/partials/TableComponent"
import BottomLegend from "./partial/BottomLegend"

const TopLand = ({ data }) => {
  console.log(data)

  const headList = [
    "Image",
    "Date",
    "Coord",
    "Buyer",
    "ETH Price",
    "Land ID",
    "Symbol",
    "Valuation",
  ]

  const bodyList = [
    "image",
    "date",
    "asset",
    "buyer",
    "eth_price",
    "landId",
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
      {/*<TableComponent
        data={tableData}
        dateRange={dateRange}
        propertyName={bodyList[0]}
        headList={headList}
        bodyList={bodyList}
      />*/}
      <BottomLegend description="some bottom description" />
    </BoxWrapper>
  )
}

export default TopLand
