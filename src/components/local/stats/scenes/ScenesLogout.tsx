import { useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chartInfo"
import { dateRangeStr } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"
import { Box } from "@chakra-ui/react"

const ScenesLogout = ({ res }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Name", "Logouts"]
  const bodyList = ["map_url", "scene_name", "logouts"]

  const date = dateRangeStr(dateRange)
  let tableData = res[date]["logouts"]
  const result = []
  for (const key in tableData) {
    result.push({
      scene_name: key,
      map_url: tableData[key].map_url,
      total_logouts: tableData[key].total_logouts,
      uuid: tableData[key].uuid,
    })
  }
  tableData = result

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Scenes with Most Logouts"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Scenes with the most logouts in the last period"
        line={undefined}
        setLine={undefined}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="scenes_logouts"
        yesterday={true}
      />
      <Box data-testid='ScenesLogoutTable'>
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

export default ScenesLogout
