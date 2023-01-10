import { useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chartInfo"
import { dateRangeStr, baseUrl, mapUrl } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"

const AFKtimeSpentAFKParcel = ({ parcel }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Coord", "AVG. AFK"]
  const bodyList = ["map_url", "coord", "visit_count"]

  const date = dateRangeStr(dateRange)
  let tableData = parcel[date]["time_spent_afk"]
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
    <BoxWrapper>
      <BoxTitle
        name="Parcels with Most AFK"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Parcels with the most idle time spent on them in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="parcels_afk_time_spent"
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

export default AFKtimeSpentAFKParcel
