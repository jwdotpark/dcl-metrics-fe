/* eslint-disable react-hooks/rules-of-hooks */
import {
  Image,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Tag,
} from "@chakra-ui/react"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"
import { format } from "date-fns"
import { useMemo } from "react"
import { FiChevronDown, FiChevronUp, FiInfo } from "react-icons/fi"
import WorldPageTableButtonGroup from "../stats/partials/world/WorldPageTableButtonGroup"
import EventItemDrawer from "./EventItemDrawer"
import Link from "next/link"
import { tagColor } from "../../../lib/data/constant"

const EventCardList = ({ data }) => {
  console.log(data)
  const columns = useMemo(
    () => [
      //{
      //  Header: "#",
      //  Cell: ({ row }) => <Text>{row.index + 1}</Text>,
      //},
      {
        Header: "",
        accessor: "image",
        Cell: ({ row }) => (
          <Box overflow="hidden" w="100px" h="50px" borderRadius="lg">
            <Image alt={row.original.name} src={row.original.image} />
          </Box>
        ),
      },
      {
        Header: "Event Name",
        accessor: "name",
        Cell: ({ row }) => (
          <Box>
            <EventItemDrawer data={row.original} />
          </Box>
        ),
      },
      {
        Header: "Created By",
        accessor: "user_name",
        Cell: ({ row }) => (
          <Link href={`/users/${row.original.user}`} target="_blank">
            <Text
              color="blue.400"
              fontWeight="medium"
              _hover={{ color: "blue.600" }}
            >
              {row.original.user_name}
            </Text>
          </Link>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ row }) => (
          <Text>
            <Tag
              fontSize="xs"
              colorScheme={tagColor[row.original.categories[0]]}
            >
              {row.original.categories[0]
                ? row.original.categories[0].toUpperCase()
                : "N/A"}
            </Tag>
          </Text>
        ),
      },
      {
        Header: "Next Start At",
        accessor: "next_start_at",
        Cell: ({ value }) => format(new Date(value), "MMM d HH:mm"),
      },
      {
        Header: "Next Finish At",
        accessor: "next_finish_at",
        Cell: ({ value }) => format(new Date(value), "MMM d HH:mm"),
      },
      {
        Header: "Attendees",
        accessor: "total_attendees",
      },
      {
        Header: "Info",
        Cell: ({ row }) => (
          <Box>
            <Link href={`/events/${row.original.id}`} target="_blank">
              <FiInfo size="15px" />
            </Link>
          </Box>
        ),
      },
    ],
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setGlobalFilter,
    prepareRow,
  } = tableInstance

  const { pageIndex, globalFilter } = state

  return (
    <Box>
      <Box overflowX="auto" mt="4" mr="6" mx="4">
        <Table
          {...getTableProps()}
          w="100%"
          mt="2"
          mb="2"
          size="sm"
          variant="simple"
        >
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, j) => (
                  <Th
                    key={j}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <Box display="inline-block">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown />
                        ) : (
                          <FiChevronUp />
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
                <Tr
                  key={i}
                  {...row.getRowProps()}
                  _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                >
                  {row.cells.map((cell, j) => {
                    return (
                      <Td key={j} {...cell.getCellProps()} fontSize="xs">
                        {cell.render("Cell")}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
      <Box mt="2" mr="4">
        <WorldPageTableButtonGroup
          pageOptions={pageOptions}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          pageIndex={pageIndex}
          nextPage={nextPage}
          previousPage={previousPage}
          pageCount={pageCount}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </Box>
    </Box>
  )
}

export default EventCardList
