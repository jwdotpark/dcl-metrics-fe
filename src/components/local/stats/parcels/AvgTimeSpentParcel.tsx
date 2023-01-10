import {
  Spacer,
  Flex,
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  useColorModeValue,
} from "@chakra-ui/react"
import { convertSeconds } from "../../../../lib/hooks/utils"
import Loading from "../../Loading"
import { useMemo, useState } from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import TableMap from "../partials/TableMap"
import ParcelDateRange from "../daterange/ParcelDateRange"
import GridBox from "../../GridBox"

import BoxWrapper from "../../../layout/local/BoxWrapper"
import BoxTitle from "../../../../components/layout/local/BoxTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import { defaultDateRange } from "../../../../lib/data/chartInfo"
import { dateRangeStr, baseUrl, mapUrl } from "../../../../lib/data/tableInfo"
import TableComponent from "../partials/TableComponent"

const AvgTimeSpentParcel = ({ parcel }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Scenes Map", "Coord", "AVG Time Spent"]
  const bodyList = ["map_url", "coord", "avg_time_spent"]

  const date = dateRangeStr(dateRange)
  let tableData = parcel[date]["time_spent"]
  const result = []
  for (const key in tableData) {
    result.push({
      coord: key,
      map_url: baseUrl + key.replace(",", "/") + mapUrl,
      avg_time_spent: tableData[key],
    })
  }
  tableData = result

  return (
    <BoxWrapper>
      <BoxTitle
        name="Parcels Average Time Spent"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Parcels with the most average time spent on them in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="parcels_avg_time_spent"
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

export default AvgTimeSpentParcel
