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
} from "@chakra-ui/react"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"
import { format } from "date-fns"
import { useMemo } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import WorldPageTableButtonGroup from "../stats/partials/world/WorldPageTableButtonGroup"
import EventItemDrawer from "./EventItemDrawer"
import Link from "next/link"
import { capitalize } from "../../../lib/hooks/utils"

const EventCardList = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        Header: "",
        accessor: "image",
        Cell: ({ row }) => (
          <Box w="100px" h="50px">
            <Image alt={row.original.name} src={row.original.image} />
          </Box>
        ),
      },
      {
        Header: "Event Name",
        accessor: "name",
        Cell: ({ row }) => (
          <Box>
            <Text fontSize="md">{row.values.name.slice(0, 50)}</Text>
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
            {row.original.categories[0]
              ? capitalize(row.original.categories[0])
              : "N/A"}
          </Text>
        ),
      },
      {
        Header: "Start At",
        accessor: "start_at",
        Cell: ({ value }) => format(new Date(value), "yy MMM d"),
      },
      {
        Header: "Finish At",
        accessor: "finish_at",
        Cell: ({ value }) => format(new Date(value), "yy MMM d"),
      },
      {
        Header: "Attendees",
        accessor: "total_attendees",
      },
      {
        Header: "Details",
        Cell: ({ row }) => (
          <Box>
            <EventItemDrawer data={row.original} />
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
      <Box mt="4" mr="8">
        <Table
          {...getTableProps()}
          w="100%"
          mt="2"
          mb="2"
          mx={[2, 2, 4]}
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
        <Box mt="4" mr="-4">
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
    </Box>
  )
}

export default EventCardList
