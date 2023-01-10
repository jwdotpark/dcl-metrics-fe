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

  //const toast = useToast()
  //const handleToast = async (value) => {
  //  await navigator.clipboard.writeText(value)
  //  toast({
  //    description: "Address " + value + " has been copied to the clipboard.",
  //    duration: 2000,
  //    isClosable: true,
  //    position: "bottom-right",
  //    status: "success",
  //    variant: "subtle",
  //  })
  //}

  //const dataArr = useMemo(() => {
  //  if (dateRange === 1) {
  //    return res.yesterday.time_spent
  //  } else if (dateRange === 7) {
  //    return res.last_week.time_spent
  //  } else if (dateRange === 30) {
  //    return res.last_month.time_spent
  //  } else if (dateRange === 90) {
  //    return res.last_quarter.time_spent
  //  }
  //}, [res, dateRange])

  //const columns = useMemo(
  //  () => [
  //    {
  //      Header: "Time Spent",
  //      accessor: "time_spent",
  //      width: 140,
  //      Cell: ({ value }) => {
  //        return (
  //          <Box w="100px">
  //            <Text
  //              as="kbd"
  //              color={useColorModeValue("gray.800", "gray.200")}
  //              fontWeight="bold"
  //            >
  //              {convertSeconds(value)}
  //            </Text>
  //          </Box>
  //        )
  //      },
  //      disableSortBy: true,
  //      disableFilters: true,
  //    },
  //    {
  //      Header: "User",
  //      accessor: "name",
  //      width: 200,
  //      Cell: ({ value, row }) => {
  //        return (
  //          <Box w="170px">
  //            <Box ml="-6px">
  //              <Flex h="100%">
  //                <Box>
  //                  <ProfilePicture
  //                    address={row.original.avatar_url}
  //                    verified={row.original.verified_user}
  //                    guest={row.original.guest_user}
  //                  />
  //                </Box>
  //                <Center minH="100%" ml="2">
  //                  <Text color={useColorModeValue("gray.800", "gray.200")}>
  //                    {value ? TruncateName(value) : "N/A"}
  //                  </Text>
  //                </Center>
  //              </Flex>
  //            </Box>
  //          </Box>
  //        )
  //      },
  //    },
  //    {
  //      Header: "Address",
  //      accessor: "address",
  //      width: 155,
  //      Cell: ({ value }) => {
  //        return (
  //          <Flex w="120px">
  //            <Box display="inline-block" onClick={() => handleToast(value)}>
  //              <Text
  //                as="kbd"
  //                color={useColorModeValue("gray.800", "gray.200")}
  //                _hover={{ color: "gray.600", cursor: "pointer" }}
  //              >
  //                {value.slice(0, 7) + ".." + value.slice(-7, -1)}
  //              </Text>
  //            </Box>
  //          </Flex>
  //        )
  //      },
  //    },
  //    {
  //      Header: "Link",
  //      accessor: "",
  //      width: 40,
  //      Cell: ({ row }) => {
  //        return (
  //          <Flex>
  //            <Box display="inline-block">
  //              <TableLink address={row.original.address} />
  //            </Box>
  //          </Flex>
  //        )
  //      },
  //    },
  //  ],
  //  // eslint-disable-next-line
  //  [dataArr]
  //)

  //const timeSpentArr = []
  //for (let i = 0; i < dataArr.length; i++) {
  //  timeSpentArr.push(dataArr[i].time_spent)
  //}
  //const max = Math.max(...timeSpentArr)
  //const min = Math.min(...timeSpentArr)
  //const range = max - min
  //const normalizedTimeSpentArr = []
  //for (let i = 0; i < timeSpentArr.length; i++) {
  //  normalizedTimeSpentArr.push(
  //    Math.round(((timeSpentArr[i] - min) / range) * (100 - 20) + 20)
  //  )
  //}

  //// table props
  //const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //  useTable({ columns: columns, data: dataArr }, useSortBy)

  //const TableComponent = () => {
  //  const { colorMode } = useColorMode()
  //  return (
  //    <TableContainer mt="4" mb="6" mx="4" whiteSpace="nowrap">
  //      <Table
  //        {...getTableProps()}
  //        overflowX="hidden"
  //        maxW="100%"
  //        // h="500px"
  //        // mb="6"
  //        size="sm"
  //        variant="simple"
  //      >
  //        <Thead>
  //          {headerGroups.map((headerGroup, i) => (
  //            <Tr
  //              {...headerGroup.getHeaderGroupProps()}
  //              key={i}
  //              display="block"
  //            >
  //              {headerGroup.headers.map((column, j) => (
  //                <Th
  //                  key={j}
  //                  w={column.width}
  //                  // sorting
  //                  // {...column.getHeaderProps(column.getSortByToggleProps())}
  //                >
  //                  {column.render("Header")}
  //                </Th>
  //              ))}
  //            </Tr>
  //          ))}
  //        </Thead>
  //        <Tbody {...getTableBodyProps()}>
  //          {rows.map((row, i) => {
  //            prepareRow(row)
  //            return (
  //              <Tr
  //                display="block"
  //                // borderBottom="1px solid rgba(0, 0, 0, 0.06)"
  //                {...row.getRowProps()}
  //                key={i}
  //                // h="3rem"
  //                style={{
  //                  background: `linear-gradient(90deg, #61CDBB50 ${
  //                    normalizedTimeSpentArr[i]
  //                  }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
  //                }}
  //              >
  //                {row.cells.map((cell, j) => {
  //                  return (
  //                    <Td key={j} {...cell.getCellProps()}>
  //                      <Box display="inline-block">
  //                        <Text>{cell.render("Cell")}</Text>
  //                      </Box>
  //                    </Td>
  //                  )
  //                })}
  //              </Tr>
  //            )
  //          })}
  //        </Tbody>
  //      </Table>
  //    </TableContainer>
  //  )
  //}
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
