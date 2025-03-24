/* eslint-disable react-hooks/rules-of-hooks */
import {
  Table,
  Thead,
  Text,
  Tr,
  Th,
  Tbody,
  useColorModeValue,
  Td,
  Box,
  Image,
} from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import Link from "next/link"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"
import {
  mutateStringToURL,
  convertSeconds,
} from "../../../../../../lib/hooks/utils"
import ScenePageTableButtonGroup from "./ScenePageTableButtonGroup"

const ScenePageTable = ({ sceneRes, setPageIndex }) => {
  const data = useMemo(() => sceneRes, [sceneRes])

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => <Text>{row.index + 1}</Text>,
        accessor: "index",
      },
      {
        Header: "Map",
        Cell: ({ row }) => (
          <Image
            minW="25"
            maxW="50"
            minH="25"
            maxH="50"
            borderRadius="md"
            alt={row.original.name}
            src={row.original.map_url}
          />
        ),
      },
      {
        Header: "Scene",
        Cell: ({ row }) => (
          <Text
            color={useColorModeValue("blue.600", "blue.200")}
            fontWeight="medium"
          >
            <Link
              href={`/scenes/${mutateStringToURL(row.original.name)}/${
                row.original.uuid
              }`}
              target="_blank"
            >
              {row.original.name}
            </Link>
          </Text>
        ),
        accessor: "name",
      },
      {
        Header: "Visitors",
        accessor: "visitors",
      },
      {
        Header: "Complete Sessions",
        accessor: "complete_sessions",
      },
      {
        Header: "Share of Global Visitors",
        accessor: "share_of_global_visitors",
      },
      {
        Header: "Unique Logins",
        accessor: "unique_logins",
      },
      {
        Header: "Unique Logouts",
        accessor: "unique_logouts",
      },
      {
        Header: "Total Logins",
        accessor: "total_logins",
      },
      {
        Header: "Total Logouts",
        accessor: "total_logouts",
      },
      {
        Header: "Average Session Duration",
        Cell: ({ row }) => (
          <Text as="kbd">
            {convertSeconds(row.original.avg_complete_session_duration)}
          </Text>
        ),
        accessor: "avg_complete_session_duration",
      },
      {
        Header: "Avg. Time Spent",
        Cell: ({ row }) => (
          <Text>{convertSeconds(row.original.avg_time_spent)}</Text>
        ),
        accessor: "avg_time_spent",
      },
      {
        Header: "Avg. Time Spent AFK",
        Cell: ({ row }) => (
          <Text as="kbd">
            {convertSeconds(row.original.avg_time_spent_afk)}
          </Text>
        ),
        accessor: "avg_time_spent_afk",
      },
    ],
    []
  )

  const tableInstance = useTable(
    { columns, data },
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

  useEffect(() => {
    setPageIndex(pageIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex])

  return (
    <>
      <ScenePageTableButtonGroup
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
      <Table
        {...getTableProps()}
        w="auto"
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
    </>
  )
}

export default ScenePageTable
