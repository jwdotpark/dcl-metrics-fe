// @ts-nocheck
import {
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Center,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import GridBox from "../../GridBox"
import Loading from "../../Loading"
import SceneDateRange from "../daterange/SceneDateRange"
import TableMap from "../partials/TableMap"

const TopScenesVisitors = ({ res, isSceneLoading }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // 0 yesterday 1 last_week 2 last_month 3 last_quarter
  const [dateRange, setDateRange] = useState(0)
  const data = Object.entries(res)
  const dataArr = []
  const sceneDataRange = data[dateRange]
  const visitorData = sceneDataRange[1].visitors

  for (const [key, value] of Object.entries(visitorData)) {
    dataArr.push({
      name: key,
      mapUrl: value.map_url,
      unique_address: value.unique_addresses,
    })
  }

  const COLUMNS = [
    {
      Header: "Scene Map",
      accessor: "mapUrl",
      disableSortBy: true,
      Cell: ({ value }) => {
        return <TableMap mapUrl={value + "&size=9"} />
      },
    },
    {
      Header: "Name",
      accessor: "name",
      disableSortBy: true,
      Cell: ({ value }) => {
        return <Text>{value}</Text>
      },
    },
    {
      Header: "Visit Count",
      accessor: "unique_address",
      width: 200,
      Cell: ({ value }) => {
        return <Text as="kbd">{value}</Text>
      },
    },
  ]

  // eslint-disable-next-line
  const columns = useMemo(() => COLUMNS, [])
  // eslint-disable-next-line
  const memoizedData = useMemo(() => dataArr, [dateRange])

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns: columns,
        data: memoizedData,
        initialState: {
          pageSize: 5,
        },
      },
      useSortBy,
      usePagination
    )

  const TableComponent = () => {
    return (
      <>
        <TableContainer whiteSpace="nowrap" borderColor="gray.400" mt="2">
          <Table
            {...getTableProps()}
            size="sm"
            variant="striped"
            colorScheme="gray"
            // height="520"
            overflowX="hidden"
          >
            <Thead>
              {headerGroups.map((headerGroup, i) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, j) => (
                    <Th
                      key={j}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, j) => {
                      return (
                        <Td key={j} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Td>
                      )
                    })}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    )
  }

  return (
    <>
      <GridBox box={box}>
        <Flex position="relative" mt="4" mx="5">
          <Flex w="100%">
            <Box>
              <Text fontSize="2xl">
                <b>Top Scenes Visitor</b>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Scenes with the most visit count in the last period
          </Text>
        </Box>
        <SceneDateRange dateRange={dateRange} setDateRange={setDateRange} />
        {dataArr.length > 0 && !isSceneLoading ? (
          <Box mx="4" mb="8">
            <TableComponent />
          </Box>
        ) : (
          <Center h={box.h}>
            <Loading />
          </Center>
        )}
      </GridBox>
    </>
  )
}

export default TopScenesVisitors
