import {
  HStack,
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
import { convertSeconds } from "../../../lib/hooks/utils"
import ProfilePicture from "../ProfilePicture"
import TableLink from "./partials/TableLink"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import TableDateRange from "./daterange/TableDateRange"

const MarathonUsers = ({ isLoading, res }) => {
  // leave it in case customize size of component dimension
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // copy toast
  const toast = useToast()
  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
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
        width: 100,
        Cell: ({ value }) => {
          return (
            <Box w="100px">
              <Text as="kbd" color={useColorModeValue("gray.800", "gray.200")}>
                {convertSeconds(value)}
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
        width: 195,
        Cell: ({ value, row }) => {
          return (
            <Box w="137px">
              <Box ml="-6">
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
                      {value.length > 14 ? (
                        <Tooltip
                          label={value}
                          placement="top"
                          fontSize="sm"
                          borderRadius="md"
                        >
                          {value.slice(0, 14) + ".."}
                        </Tooltip>
                      ) : (
                        value
                      )}
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
        width: 360,
        Cell: ({ value }) => {
          return (
            <Flex w="330px">
              <Box display="inline-block" onClick={() => handleToast(value)}>
                <Text
                  as="kbd"
                  color={useColorModeValue("gray.800", "gray.200")}
                  _hover={{ color: "gray.600", cursor: "pointer" }}
                >
                  {value}
                </Text>
              </Box>
            </Flex>
          )
        },
      },
      {
        Header: "Link",
        accessor: "",
        width: -10, // idk why but this works
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
    [dataArr]
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
          overflowX="hidden"
          maxW="100%"
          h="500px"
          mb="6"
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
            </Flex>
          </Flex>
          <Box ml="6">
            <Text fontSize="sm" color="gray.500">
              Users with most online time in the last period
            </Text>
          </Box>
          <TableDateRange dateRange={dateRange} setDateRange={setDateRange} />
          {dataArr.length > 0 && !isLoading ? (
            <Box>
              <TableComponent />
            </Box>
          ) : (
            <Center h="100%">
              <Loading />
            </Center>
          )}
        </>
      </GridBox>
    </>
  )
}

export default MarathonUsers
