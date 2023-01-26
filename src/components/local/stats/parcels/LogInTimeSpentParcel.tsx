import { useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chartInfo"
import { dateRangeStr, baseUrl, mapUrl } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"

const LogInTimeSpentParcel = ({ parcel }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Coord", "Logins"]
  const bodyList = ["map_url", "coord", "logins"]

  const date = dateRangeStr(dateRange)
  let tableData = parcel[date]["logins"]
  const result = []
  for (const key in tableData) {
    result.push({
      coord: key,
      map_url: baseUrl + key.replace(",", "/") + mapUrl,
      total_logins: tableData[key],
    })
  }
  tableData = result

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Parcels with Most Logins"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Parcels with the most logins in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="parcels_logins"
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

export default LogInTimeSpentParcel
