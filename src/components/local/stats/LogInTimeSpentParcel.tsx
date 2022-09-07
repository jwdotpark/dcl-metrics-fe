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
import { convertSeconds } from "../../../lib/hooks/utils"
import Loading from "../Loading"
import { useMemo, useState } from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import TableMap from "./partials/TableMap"
import ParcelDateRange from "./daterange/ParcelDateRange"
import GridBox from "../GridBox"

const LogInTimeSpentParcel = ({ parcel, isParcelLoading }) => {
  const box = {
    // h: "630",
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
  const timeSpentAFKData = parcelDataRange[1].logins
  // make an array with timeSpentAFKData
  for (const [key, value] of Object.entries(timeSpentAFKData)) {
    dataArr.push({
      mapUrl: baseUrl + key.replace(",", "/") + mapUrl,
      coord: key,
      logins: value,
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
        return <Text as="kbd" fontSize="lg">{`[${value}]`}</Text>
      },
    },
    {
      Header: "Logins",
      accessor: "logins",
      Cell: ({ value }) => {
        return (
          <Text as="kbd" fontSize="lg">
            {Number(value)}
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
                <b>Parcels with Most Logins</b>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Parcels with the most Login happened in the last period
          </Text>
        </Box>
        <ParcelDateRange dateRange={dateRange} setDateRange={setDateRange} />
        {dataArr.length > 0 && !isParcelLoading ? (
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

export default LogInTimeSpentParcel
