import {
  Tooltip,
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
import { useState, useEffect } from "react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import ProfilePicture from "../ProfilePicture"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import DateRange from "./daterange/TableDateRange"
import TableLink from "./partials/TableLink"
import TruncateName from "./partials/TruncatedName"

const Explorer = ({ isLoading, res }) => {
  // leave it in case customize size of component dimension
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // copy toast
  const toast = useToast()
  const handleToast = async (value) => {
    await navigator.clipboard.writeText(value)
    toast({
      description:
        "Address " +
        value.slice(0, 10) +
        ".. has been copied to the clipboard.",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
      variant: "subtle",
    })
  }

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
        Header: "Count",
        accessor: "parcels_visited",
        width: 110,
        Cell: ({ value }) => {
          return (
            <Box w="100px">
              <Text
                as="kbd"
                color={useColorModeValue("gray.800", "gray.200")}
                fontWeight="bold"
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
        Header: "User",
        accessor: "name",
        width: 230,
        Cell: ({ value, row }) => {
          return (
            <Box w="170px">
              <Box display="inline-block" ml="-6">
                <Flex h="100%">
                  <Box>
                    <ProfilePicture
                      address={row.original.avatar_url}
                      verified={row.original.verified_user}
                      guest={row.original.guest_user}
                    />
                  </Box>
                  <Center minH="100%" ml="2">
                    <Text color={useColorModeValue("gray.800", "gray.200")}>
                      {value ? TruncateName(value) : "N/A"}

                      {/* {value && value.length > 16 ? (
                        <Tooltip
                          fontSize="sm"
                          borderRadius="xl"
                          label={value}
                          placement="top"
                        >
                          {value.slice(0, 16) + ".."}
                        </Tooltip>
                      ) : (
                        value
                      )}
                      {!value && "N/A"} */}
                    </Text>
                  </Center>
                </Flex>
              </Box>
            </Box>
          )
        },
      },
      {
        Header: "Address",
        accessor: "address",
        width: 155,
        Cell: ({ value }) => {
          return (
            <Flex w="120px">
              <Box display="inline-block" onClick={() => handleToast(value)}>
                <Text
                  as="kbd"
                  color={useColorModeValue("gray.800", "gray.200")}
                  _hover={{ color: "gray.600", cursor: "pointer" }}
                >
                  {value.slice(0, 7) + ".." + value.slice(-7, -1)}
                </Text>
              </Box>
            </Flex>
          )
        },
      },
      {
        Header: "Link",
        accessor: "",
        width: 40,
        Cell: ({ row }) => {
          return (
            <Flex>
              <Box display="inline-block">
                <TableLink address={row.original.address} />
              </Box>
            </Flex>
          )
        },
      },
    ],
    // eslint-disable-next-line
    [dataArr, dateRange]
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
      <TableContainer mt="4" mb="6" mx="4" whiteSpace="nowrap">
        <Table
          {...getTableProps()}
          overflowX="hidden"
          maxW="100%"
          // h="500px"
          // mb="6"
          size="sm"
          variant="simple"
        >
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={i}
                display="block"
              >
                {headerGroup.headers.map((column, j) => (
                  // <Th key={j} maxW="6rem" minW={j === 2 && "12rem"}>
                  <Th key={j} w={column.width}>
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
                  // borderBottom="1px solid rgba(0, 0, 0, 0.06)"
                  {...row.getRowProps()}
                  key={i}
                  // h="auto"
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
                          <Text>{cell.render("Cell")}</Text>
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
      <Flex pos="relative" mt="4" mx="5">
        <Flex w="100%">
          <Box>
            <Text fontSize="2xl">
              <b>Explorers</b>
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Box ml="6">
        <Text color="gray.500" fontSize="sm">
          Users that visited the most parcels in the last period
        </Text>
      </Box>
      <DateRange dateRange={dateRange} setDateRange={setDateRange} />
      {dataArr.length > 0 && !isLoading && <TableComponent />}
      {dataArr.length === 0 && !isLoading && (
        <Center h="450px">Not Available</Center>
      )}
      {isLoading && (
        <Center h="100%">
          <Loading />
        </Center>
      )}
    </GridBox>
  )
}

export default Explorer
