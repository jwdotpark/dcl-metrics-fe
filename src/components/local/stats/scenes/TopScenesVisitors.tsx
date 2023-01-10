// @ts-nocheck
import { useState } from "react"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chartInfo"
import { dateRangeStr } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"

const TopScenesVisitors = ({ res }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Name", "Visit Count"]
  const bodyList = ["visitors", "map_url", "scene_name", "unique_addresses"]

  // mapping data
  const date = dateRangeStr(dateRange)
  let tableData = res[date][bodyList[0]]
  const result = []
  for (const key in tableData) {
    result.push({
      scene_name: key,
      map_url: tableData[key].map_url,
      unique_addresses: tableData[key].unique_addresses,
    })
  }
  tableData = result

  return (
    <BoxWrapper>
      <BoxTitle
        name="Scenes with Most Unique Visitors"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Scenes with the most unique visits in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="scenes_unique_visitors"
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

export default TopScenesVisitors
