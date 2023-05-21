import { useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chart/chartInfo"
import { dateRangeStr } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"
import { Box } from "@chakra-ui/react"

const ScenesTimeSpentAFK = ({ res }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Name", "Time Spent AFK"]
  const bodyList = ["map_url", "scene_name", "avg_time_spent_afk"]

  const date = dateRangeStr(dateRange)
  let tableData = res[date]["time_spent_afk"]
  const result = []
  for (const key in tableData) {
    result.push({
      scene_name: key,
      map_url: tableData[key].map_url,
      avg_time_spent_afk: tableData[key].avg_time_spent_afk,
      uuid: tableData[key].uuid,
    })
  }
  tableData = result

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Scenes with AFK Time Spent"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Scenes with the most average AFK time spent on them in the last
        period"
        line={undefined}
        setLine={undefined}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="scenes_avg_time_spent_afk"
        yesterday={true}
      />
      <Box data-testid="ScenesTimeSpentAFKTable">
        <TableComponent
          data={tableData}
          dateRange={dateRange}
          propertyName={bodyList[0]}
          headList={headList}
          bodyList={bodyList}
        />
      </Box>
    </BoxWrapper>
  )
}

export default ScenesTimeSpentAFK
