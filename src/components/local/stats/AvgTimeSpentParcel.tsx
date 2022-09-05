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
import ParcelDateRange from "../ParcelDateRange"
import GridBox from "../GridBox"

const AvgTimeSpentParcel = ({ parcel, isParcelLoading }) => {
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
        return (
          <Box
            maxW="16rem"
            borderRadius="md"
            border="2px solid"
            borderColor="gray.500"
            overflow="clip"
            boxShadow="md"
          >
            <Image
              boxSize="5rem"
              w="100%"
              src={value}
              alt="map image"
              objectFit="cover"
            />
          </Box>
        )
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
      Header: "AVG. Time Spent",
      accessor: "avg_time_spent",
      Cell: ({ value }) => {
        return (
          <Text as="kbd" fontSize="lg">
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
                <b>Top Parcels Time Spent</b>
              </Text>
            </Box>
            <Spacer />
            <ParcelDateRange
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Parcels with the most average time spent on them in the last period
          </Text>
        </Box>
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

export default AvgTimeSpentParcel
