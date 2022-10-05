// @ts-nocheck
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

const ScenesTimeSpentAFK = ({ res, isSceneLoading }) => {
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

  const sceneData = sceneDataRange[1].time_spent_afk
  for (const [key, value] of Object.entries(sceneData)) {
    dataArr.push({
      mapUrl: value.map_url,
      name: key,
      avg_time_spent_afk: value.avg_time_spent_afk,
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
      Header: "AFK Time Spent",
      accessor: "avg_time_spent_afk",
      width: 200,
      Cell: ({ value }) => {
        return <Text as="kbd">{convertSeconds(value)}</Text>
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
        <TableContainer mt="2" borderColor="gray.400" whiteSpace="nowrap">
          <Table
            {...getTableProps()}
            overflowX="hidden"
            colorScheme="gray"
            size="sm"
            // height="520"
            variant="striped"
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
        <Flex pos="relative" mt="4" mx="5">
          <Flex w="100%">
            <Box>
              <Text fontSize="2xl">
                <b>Scenes with AFK Time Spent</b>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box ml="6">
          <Text color="gray.500" fontSize="sm">
            Scenes with the most average AFK time spent on them in the last
            period
          </Text>
        </Box>
        <ParcelDateRange dateRange={dateRange} setDateRange={setDateRange} />
        {dataArr.length > 0 && !isSceneLoading ? (
          <Box mb="8" mx="4">
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

export default ScenesTimeSpentAFK
