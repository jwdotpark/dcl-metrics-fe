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
import ProfilePicture from "../ProfilePicture"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import DateRange from "./daterange/TableDateRange"

const Explorer = ({ isLoading, res }) => {
  // leave it in case customize size of component dimension
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // FIXME static json, attach real api later
  const [dateRange, setDateRange] = useState("1d")

  const dataArr = useMemo(() => {
    if (dateRange === "1d") {
      return res.yesterday.parcels_visited
    } else if (dateRange === "7d") {
      return res.last_week.parcels_visited
    } else if (dateRange === "30d") {
      return res.last_month.parcels_visited
    } else if (dateRange === "90d") {
      return res.last_quarter.parcels_visited
    }
  }, [res, dateRange])

  // table column definition
  const columns = useMemo(
    () => [
      {
        Header: "Parcels Visited",
        accessor: "parcels_visited",
        Cell: ({ value }) => {
          return (
            <Box w="100px">
              <Text
                as="kbd"
                fontSize="lg"
                color={useColorModeValue("gray.800", "gray.200")}
              >
                {Number(value)}
              </Text>
            </Box>
          )
        },
        disableSortBy: true,
        disableFilters: true,
      },
      {
        // Header: "",
        accessor: "avatar_url",
        Cell: ({ value }) => {
          return (
            <Box>
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
        Cell: ({ value }) => {
          return (
            <Box w="6rem">
              <Box display="inline-block" ml="-6">
                <Text color={useColorModeValue("gray.800", "gray.200")}>
                  {value && value.length > 16
                    ? value.slice(0, 16) + ".."
                    : value}
                  {!value && "N/A"}
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
  const parcelVisitedArr = []
  for (let i = 0; i < dataArr.length; i++) {
    parcelVisitedArr.push(dataArr[i].parcels_visited)
  }
  const max = Math.max(...parcelVisitedArr)
  const min = Math.min(...parcelVisitedArr)
  const range = max - min
  const normalizedParcelVisitedArr = []
  for (let i = 0; i < parcelVisitedArr.length; i++) {
    normalizedParcelVisitedArr.push(
      Math.round(((parcelVisitedArr[i] - min) / range) * (100 - 20) + 20)
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
          mb="4"
        >
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={i}
                display="block"
              >
                {headerGroup.headers.map((column, j) => (
                  <Th key={j} maxW="6rem" minW={j === 2 && "12rem"}>
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
                    background: `linear-gradient(90deg, #F4756050 ${
                      normalizedParcelVisitedArr[i]
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
    <GridBox box={box}>
      <Flex position="relative" mt="4" mx="5">
        <Flex w="100%">
          <Box>
            <Text fontSize="2xl">
              <b>Explorer</b>
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Box ml="6">
        <Text fontSize="sm" color="gray.500">
          Users that visited the most parcels in the last period
        </Text>
      </Box>
      <DateRange dateRange={dateRange} setDateRange={setDateRange} />
      {dataArr.length > 0 && !isLoading ? (
        <Box>
          <TableComponent />
        </Box>
      ) : (
        <Center h={box.h}>
          <Loading />
        </Center>
      )}
    </GridBox>
  )
}

export default Explorer
