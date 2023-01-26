import { useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chartInfo"
import { dateRangeStr, baseUrl, mapUrl } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"

const MostVisitedParcel = ({ parcel }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Coord", "Visit Count"]
  const bodyList = ["map_url", "coord", "visit_count"]

  const date = dateRangeStr(dateRange)
  let tableData = parcel[date]["visitors"]
  const result = []
  for (const key in tableData) {
    result.push({
      coord: key,
      map_url: baseUrl + key.replace(",", "/") + mapUrl,
      visit_count: tableData[key],
    })
  }
  tableData = result

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Most Visited Parcel"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Parcels with the most visit count in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="parcels_most_visited_parcel"
        yesterday={true}
      />
      <TableComponent
        data={tableData}
        dateRange={dateRange}
        propertyName={bodyList[0]}
        headList={headList}
        bodyList={bodyList}
      />
    </BoxWrapper>
  )
}

export default MostVisitedParcel
