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
  Button,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { convertSeconds } from "../../../lib/hooks/utils"
import Loading from "../Loading"
import { useMemo } from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi"

const TopParcelsTimeSpentComponent = ({ parcel, isParcelLoading }) => {
  const baseUrl = "https://api.decentraland.org/v1/parcels/"
  const mapUrl = "/map.png?width=auto&height=auto&size=15"

  const data = Object.entries(parcel)
  const dataArr = []
  for (let i = 0; i < data.length; i++) {
    dataArr.push(data[i][1])
  }

  for (let i = 0; i < data.length; i++) {
    const coord = Object.entries(parcel)[i][0]
    dataArr[i].coord = coord
    dataArr[i].mapUrl = baseUrl + coord.replace(",", "/") + mapUrl
  }

  const COLUMNS = [
    {
      Header: "#",
      accessor: "",
      Cell: (row) => {
        return <Box width="5px">{Number(row.row.id) + 1}</Box>
      },
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: "Parcel Map",
      accessor: "mapUrl",
      disableSortBy: true,
      Cell: ({ value }) => {
        return (
          <Box
            maxW="8rem"
            borderRadius="md"
            border="2px solid"
            borderColor="gray.500"
            overflow="clip"
            boxShadow="md"
          >
            <Image
              boxSize="4.5rem"
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
        return <Text>{`[${value}]`}</Text>
      },
    },
    {
      Header: "AVG. Time Spent",
      accessor: "avg_time_spent",
      Cell: ({ value }) => {
        return convertSeconds(value)
      },
    },
    {
      Header: "Avg. Time Spent AFK",
      accessor: "avg_time_spent_afk",
      Cell: ({ value }) => {
        return convertSeconds(value)
      },
    },
  ]

  // eslint-disable-next-line
  const columns = useMemo(() => COLUMNS, [])
  // eslint-disable-next-line
  const memoizedData = useMemo(() => dataArr, [parcel])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    state,
    gotoPage,
  } = useTable(
    {
      columns,
      data: memoizedData,
      initialState: {
        pageSize: 5,
      },
    },
    useSortBy,
    usePagination
  )

  const { pageIndex } = state

  const TableComponent = () => {
    return (
      <>
        <TableContainer whiteSpace="nowrap" borderColor="gray.400" height="500">
          <Table
            {...getTableProps()}
            size="sm"
            variant="striped"
            colorScheme="gray"
            // height="500"
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
        {/* pagination  */}
        {/* <Center m="2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              previousPage()
            }}
            disabled={!canPreviousPage}
          >
            <FiChevronsLeft size="12" />
          </Button>
          {pageOptions.map((option, i) => {
            return (
              <Button
                key={i}
                size="sm"
                variant="link"
                onClick={() => {
                  // setRowsPerPage(option)
                  gotoPage(i)
                }}
                isActive={pageIndex === i}
              >
                {option + 1}
              </Button>
            )
          })}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              nextPage()
            }}
            disabled={!canNextPage}
          >
            <FiChevronsRight size="12" />
          </Button>
        </Center> */}
      </>
    )
  }

  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
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
              <Text
                fontSize="sm"
                color="gray.500"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
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
