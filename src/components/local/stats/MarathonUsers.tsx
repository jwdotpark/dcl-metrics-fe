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
  Spacer,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import { convertSeconds } from "../../../lib/hooks/utils"
import ProfilePicture from "../ProfilePicture"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import DateRange from "../TableDateRange"

const MarathonUsers = ({ isLoading, res }) => {
  // leave it in case customize size of component dimension
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // FIXME static json, attach real api later
  const staticGlobal = res
  const [dateRange, setDateRange] = useState("1d")

  const dataArr = useMemo(() => {
    if (dateRange === "1d") {
      return res.yesterday.time_spent
    } else if (dateRange === "7d") {
      return res.last_week.time_spent
    } else if (dateRange === "30d") {
      return res.last_month.time_spent
    } else if (dateRange === "90d") {
      return res.last_quarter.time_spent
    }
  }, [res, dateRange])

  // table column definition
  const columns = useMemo(
    () => [
      {
        Header: "Time Spent",
        accessor: "time_spent",
        width: 110,
        Cell: ({ value }) => {
          return (
            <Box>
              <Text
                as="kbd"
                fontSize="lg"
                color={useColorModeValue("gray.800", "gray.200")}
              >
                <b>{convertSeconds(value)}</b>
              </Text>
            </Box>
          )
        },
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "avatar_url",
        width: 0,
        Cell: ({ value }) => {
          return (
            <Box ml="2">
              <Center>
                <ProfilePicture address={value} />
              </Center>
            </Box>
          )
        },
      },
      {
        Header: "User",
        accessor: "name",
        width: 195,
        Cell: ({ value }) => {
          return (
            <Box w="6rem">
              <Box display="inline-block" ml="-6">
                <Text color={useColorModeValue("gray.800", "gray.200")}>
                  {value.length > 16 ? value.slice(0, 16) + ".." : value}
                </Text>
              </Box>
            </Box>
          )
        },
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: ({ value }) => {
          return (
            <Flex>
              <Box display="inline-block">
                <Text
                  as="kbd"
                  fontSize="lg"
                  color={useColorModeValue("gray.800", "gray.200")}
                  _hover={{ color: "gray.600" }}
                >
                  <a
                    target="_blank"
                    href={"https://etherscan.io/address/" + `${value}`}
                    rel="noreferrer"
                  >
                    {value}
                  </a>
                </Text>
              </Box>
            </Flex>
          )
        },
      },
    ],
    []
  )

  // for table width representation,
  // time_spent value is normalized from 0 to 100 scale
  const timeSpentArr = []
  for (let i = 0; i < dataArr.length; i++) {
    timeSpentArr.push(dataArr[i].time_spent)
  }
  const max = Math.max(...timeSpentArr)
  const min = Math.min(...timeSpentArr)
  const range = max - min
  const normalizedTimeSpentArr = []
  for (let i = 0; i < timeSpentArr.length; i++) {
    normalizedTimeSpentArr.push(
      Math.round(((timeSpentArr[i] - min) / range) * (100 - 20) + 20)
    )
  }

  // table props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns, data: dataArr }, useSortBy)

  const TableComponent = () => {
    const { colorMode } = useColorMode()
    return (
      <TableContainer mx="4" whiteSpace="nowrap" mt="4">
        <Table
          {...getTableProps()}
          size="sm"
          variant="unstyled"
          overflowX="hidden"
          maxW="100%"
          h="500px"
        >
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={i}
                display="block"
              >
                {headerGroup.headers.map((column, j) => (
                  <Th
                    key={j}
                    width={column.width}
                    // sorting
                    // {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <Tr
                  display="block"
                  borderBottom="1px solid rgba(0, 0, 0, 0.06)"
                  {...row.getRowProps()}
                  key={i}
                  h="3rem"
                  // NOTE tacky horizontal bar width :/
                  style={{
                    background: `linear-gradient(90deg, #61CDBB50 ${
                      normalizedTimeSpentArr[i]
                    }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
                  }}
                >
                  {row.cells.map((cell, j) => {
                    return (
                      <Td key={j} {...cell.getCellProps()}>
                        <Box display="inline-block">
                          <Text fontSize="md">{cell.render("Cell")}</Text>
                        </Box>
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <>
      <GridBox box={box}>
        <>
          <Flex position="relative" mt="4" mx="5">
            <Flex w="100%">
              <Box>
                <Text fontSize="2xl">
                  <b>Marathon Users </b>
                </Text>
              </Box>
              <Spacer />
              <DateRange dateRange={dateRange} setDateRange={setDateRange} />
            </Flex>
          </Flex>
          <Box ml="6">
            <Text fontSize="sm" color="gray.500">
              Users with most online time in the last period
            </Text>
          </Box>
          {dataArr.length > 0 && !isLoading ? (
            <Box>
              <TableComponent />
            </Box>
          ) : (
            <Center h={box.h}>
              <Loading />
            </Center>
          )}
        </>
      </GridBox>
    </>
  )
}

export default MarathonUsers
