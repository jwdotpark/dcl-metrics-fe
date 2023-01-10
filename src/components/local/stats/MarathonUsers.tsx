import {
  Text,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Center,
  useColorModeValue,
  useColorMode,
  Flex,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { defaultDateRange } from "../../../lib/data/chartInfo"
import { convertSeconds } from "../../../lib/hooks/utils"
import ProfilePicture from "../ProfilePicture"
import TableLink from "./partials/TableLink"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import TableDateRange from "./daterange/TableDateRange"
import TruncateName from "./partials/TruncatedName"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import TableComponent from "./partials/TableComponent"
import DateRangeButton from "./daterange/DateRangeButton"

const MarathonUsers = ({ res }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Time Spent", "User", "Address", "Link"]
  const bodyList = ["time_spent", "name", "address", "Link"]

  return (
    <BoxWrapper>
      <BoxTitle
        name="Marathon Users"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Users with most online time in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="users_marathon_users"
        yesterday={true}
      />

      <TableComponent
        data={res}
        dateRange={dateRange}
        propertyName="time_spent"
        headList={headList}
        bodyList={bodyList}
      />
    </BoxWrapper>
  )
}

export default MarathonUsers
