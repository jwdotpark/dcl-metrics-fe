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
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import { convertSeconds } from "../../../lib/hooks/utils"
import ProfilePicture from "../ProfilePicture"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"

// #1 Marathon Users
const MarathonUsers = ({ isLoading, res }) => {
  const data = Object.entries(res)
  const dataArr = []
  for (let i = 0; i < data.length; i++) {
    //  @ts-ignore
    for (let j = 0; j < data[i][1].length; j++) {
      dataArr.push({
        date: data[i][0],
        timeSpent: data[i][1][j].time_spent,
        address: data[i][1][j].address,
      })
    }
  }
  // sort by time_spent
  dataArr.sort((a, b) => {
    return b.timeSpent - a.timeSpent
  })

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = dataArr.length / rowsPerPage

  const COLUMNS = [
    // {
    //   Header: "Date",
    //   accessor: "date",
    // },
    {
      Header: "Time Spent",
      accessor: "timeSpent",
      Cell: ({ value }) => {
        return (
          <Box width="90px">
            <Text as="kbd" color={useColorModeValue("gray.800", "gray.200")}>
              <b>{convertSeconds(value)}</b>
            </Text>
          </Box>
        )
      },
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: ({ value }) => {
        return (
          <Flex>
            <Box display="inline" mr="2">
              <ProfilePicture address={value} modal={false} />
            </Box>
            <Box display="inline-block" mt="1.5">
              <Text
                as="kbd"
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
  ]

  // eslint-disable-next-line
  const columns = useMemo(() => COLUMNS, [])
  // eslint-disable-next-line
  const memoizedData = useMemo(() => dataArr.slice(0, 10), [res])

  const timeSpentArr = []
  for (let i = 0; i < memoizedData.length; i++) {
    timeSpentArr.push(memoizedData[i].timeSpent)
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns, data: memoizedData }, useSortBy)

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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <Box
                      display="inline-block"
                      mr="4"
                      css={{ transform: "translateY(2px)" }}
                    ></Box>
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
                      // row.original.timeSpent / 2000
                      normalizedTimeSpentArr[i]
                    }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
                  }}
                >
                  {row.cells.map((cell, j) => {
                    return (
                      <Td key={j} {...cell.getCellProps()}>
                        <Box display="inline-block">
                          <Text fontSize="sm">{cell.render("Cell")}</Text>
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

  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  return (
    <>
      <GridBox box={box}>
        <>
          <Box position="relative" mt="4" mx="5">
            <Text fontSize="xl">
              <b>Marathon Users </b>
              <Text fontSize="sm" color="gray.500">
                Users with most online time in the last 7 days
              </Text>
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
