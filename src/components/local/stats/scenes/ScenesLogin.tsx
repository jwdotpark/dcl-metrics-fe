import { useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chart/chartInfo"
import { dateRangeStr } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"
import { Box } from "@chakra-ui/react"

const ScenesLogin = ({ res }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Name", "Logins"]
  const bodyList = ["map_url", "scene_name", "logins"]

  const date = dateRangeStr(dateRange)
  let tableData = res[date]["logins"]
  const result = []
  for (const key in tableData) {
    result.push({
      scene_name: key,
      map_url: tableData[key].map_url,
      total_logins: tableData[key].total_logins,
      uuid: tableData[key].uuid,
    })
  }
  tableData = result

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Scenes with Most Logins"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Scenes with the most logins in the last period"
        line={undefined}
        setLine={undefined}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="scenes_logins"
        yesterday={true}
      />
      <Box data-testid="ScenesLoginTable">
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

export default ScenesLogin
