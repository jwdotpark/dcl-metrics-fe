import { useState } from "react"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chart/chartInfo"
import { dateRangeStr } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"
import { Box } from "@chakra-ui/react"

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
      uuid: tableData[key].uuid,
    })
  }
  tableData = result

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Scenes with Most Unique Visitors"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Scenes with the most unique visits in the last period"
        line={undefined}
        setLine={undefined}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="scenes_unique_visitors"
        yesterday={true}
      />
      <Box data-testid="topScenesVisitorsTable">
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

export default TopScenesVisitors
