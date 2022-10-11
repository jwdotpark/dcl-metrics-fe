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

const AvgTimeSpentParcel = ({ parcel, isParcelLoading }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // 0 yesterday 1 last_week 2 last_month 3 last_quarter
  const [dateRange, setDateRange] = useState(0)

  const baseUrl = "https://api.decentraland.org/v1/parcels/"
  const mapUrl = "/map.png?width=auto&height=auto&size=15"

  const data = Object.entries(parcel)
  const dataArr = []

  const parcelDataRange = data[dateRange]

  // @ts-ignore
  const timeSpentData = parcelDataRange[1].time_spent
  // make an array with timeSpentData
  for (const [key, value] of Object.entries(timeSpentData)) {
    dataArr.push({
      mapUrl: baseUrl + key.replace(",", "/") + mapUrl,
      coord: key,
      avg_time_spent: value,
    })
  }

  const COLUMNS = [
    {
      Header: "Parcel Map",
      accessor: "mapUrl",
      disableSortBy: true,
      Cell: ({ value }) => {
        return <TableMap mapUrl={value} />
      },
    },
    {
      Header: "Coordinate",
      accessor: "coord",
      disableSortBy: true,
      Cell: ({ value }) => {
        return <Text as="kbd">{`[${value}]`}</Text>
      },
    },
    {
      Header: "AVG. Time Spent",
      accessor: "avg_time_spent",
      width: 200,
      Cell: ({ value }) => {
        return (
          <Text as="kbd" fontWeight="bold">
            {convertSeconds(value)}
          </Text>
        )
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
                <b>Parcels Average Time Spent</b>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box ml="6">
          <Text color="gray.500" fontSize="sm">
            Parcels with the most average time spent on them in the last period
          </Text>
        </Box>
        <ParcelDateRange dateRange={dateRange} setDateRange={setDateRange} />
        {dataArr.length > 0 && !isParcelLoading ? (
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

export default AvgTimeSpentParcel
