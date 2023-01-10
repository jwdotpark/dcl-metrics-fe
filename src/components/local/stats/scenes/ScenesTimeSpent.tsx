// @ts-nocheck

import { useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chartInfo"
import { dateRangeStr } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"

const ScenesTimeSpent = ({ res }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Name", "AVG Time Spent"]
  const bodyList = ["map_url", "scene_name", "avg_time_spent"]

  const date = dateRangeStr(dateRange)
  let tableData = res[date]["time_spent"]
  const result = []
  for (const key in tableData) {
    result.push({
      scene_name: key,
      map_url: tableData[key].map_url,
      avg_time_spent: tableData[key].avg_time_spent,
    })
  }
  tableData = result

  return (
    <BoxWrapper>
      <BoxTitle
        name="Scenes with AVG Time Spent"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Scenes with the most average time spent on them in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="scenes_avg_time_spent"
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

export default ScenesTimeSpent
