import {
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
  GridItem,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { convertSeconds } from "../../../lib/hooks/utils"
import Loading from "../Loading"
import Pagination from "../Pagination"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"

// TopParcelsTimeLogSpentVisit
const TopParcelsTimeSpentComponent = ({ parcel, isParcelLoading }) => {
  const baseUrl = "https://api.decentraland.org/v1/parcels/"
  const mapUrl = "/map.png?width=auto&height=auto&size=15"

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const data = Object.entries(parcel)
  const dataArr = []
  for (let i = 0; i < data.length; i++) {
    dataArr.push(data[i][1])
  }

  const dataPaginated = dataArr.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  const pages = Math.ceil(data.length / rowsPerPage)

  for (let i = 0; i < data.length; i++) {
    const coord = Object.entries(parcel)[i][0]
    // insert coord into each element of dataArr
    dataArr[i].coord = coord
    dataArr[i].mapUrl = baseUrl + coord.replace(",", "/") + mapUrl
  }

  const COLUMNS = [
    {
      Header: "Parcel Map",
      accessor: "mapUrl",
      disableSortBy: true,
      Cell: ({ value }) => {
        return (
          <Box
            minW="5rem"
            borderRadius="md"
            border="2px solid"
            borderColor="gray.300"
            overflow="clip"
            boxShadow="md"
          >
            <Image
              height="8rem"
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
    },
    {
      Header: "AVG. Time Spent",
      accessor: "avg_time_spent",
    },
    {
      Header: "Avg. Time Spent AFK",
      accessor: "avg_time_spent_afk",
    },
  ]

  // eslint-disable-next-line
  const columns = useMemo(() => COLUMNS, [])
  // eslint-disable-next-line
  const memoizedData = useMemo(() => dataPaginated, [page])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: memoizedData,
      },
      useSortBy
    )

  const TableComponent = () => {
    return (
      <TableContainer mx="4" whiteSpace="nowrap">
        <Table
          {...getTableProps()}
          size="sm"
          variant="simple"
          height="760"
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
                    <Box
                      display="inline-block"
                      mr="4"
                      css={{ transform: "translateY(2px)" }}
                    >
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown size="14px" />
                        ) : (
                          <FiChevronUp size="14px" />
                        )
                      ) : (
                        ""
                      )}
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
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
        <Center w="100%" h="100%">
          <Pagination page={page} pages={pages} setPage={setPage} />
        </Center>
      </TableContainer>
    )
  }

  const box = {
    h: "920",
    w: "100%",
    bg: "white",
  }

  return (
    <>
      <GridItem
        minW={box.w}
        maxW={box.w}
        h={box.h}
        bg={box.bg}
        borderRadius="md"
        boxShadow="md"
      >
        <Box position="relative" mt="4" mx="5">
          <Box>
            <Text fontSize="xl" mb="1" pt="4">
              <b>Top Parcels Time Spent </b>
              <Text fontSize="sm" color="gray.500">
                Parcels with the most time spent on them in the last 7 days
              </Text>
            </Text>
          </Box>
          {data.length > 0 && !isParcelLoading ? (
            <Box>
              <TableComponent />
            </Box>
          ) : (
            <Center h={box.h}>
              <Loading />
            </Center>
          )}
        </Box>
      </GridItem>
    </>
  )
}

export default TopParcelsTimeSpentComponent
