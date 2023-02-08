import {
  useColorModeValue,
  Box,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  Button,
  Center,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import Link from "next/link"
import { useMemo } from "react"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"
import { convertSeconds, mutateStringToURL } from "../../../lib/hooks/utils"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import GlobalTableFilter from "./partials/scene/GlobalTableFilter"
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiArrowRight,
  FiArrowLeft,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi"
import moment from "moment"

const SceneTable = ({ sceneRes }) => {
  const data = useMemo(() => sceneRes, [sceneRes])

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => <Text>{row.index + 1}</Text>,
      },
      {
        Header: "Map",
        Cell: ({ row }) => (
          <Image
            w="100"
            h="50"
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
        Cell: ({ row }) => <Text>{row.original.visitors}</Text>,
        accessor: "visitors",
      },
      {
        Header: "Complete Sessions",
        Cell: ({ row }) => <Text>{row.original.complete_sessions}</Text>,
        accessor: "complete_sessions",
      },
      {
        Header: "Share of Global Visitors",
        Cell: ({ row }) => <Text>{row.original.share_of_global_visitors}</Text>,
        accessor: "share_of_global_visitors",
      },
      {
        Header: "Unique Logins",
        Cell: ({ row }) => <Text>{row.original.unique_logins}</Text>,
        accessor: "unique_logins",
      },
      {
        Header: "Unique Logouts",
        Cell: ({ row }) => <Text>{row.original.unique_logouts}</Text>,
        accessor: "unique_logouts",
      },
      {
        Header: "Total Logins",
        Cell: ({ row }) => <Text>{row.original.total_logins}</Text>,
        accessor: "total_logins",
      },
      {
        Header: "Total Logouts",
        Cell: ({ row }) => <Text>{row.original.total_logouts}</Text>,
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

  const yesterday = moment(data[0].date).format("YYYY MMMM D")

  return (
    <BoxWrapper colSpan={6}>
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        overflowY="auto"
        pb="4"
      >
        <BoxTitle
          name="Top 50 Scenes"
          date=""
          avgData=""
          slicedData=""
          color=""
          description={`Check out the busiest top scenes on ${yesterday}`}
        />
        <Table
          h={["auto", 850]}
          {...getTableProps()}
          w="auto"
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
                  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        <Center w="100%" mt="2" mx="4">
          <ButtonGroup borderRadius="xl" isAttached size="sm">
            <Button
              borderRadius="xl"
              disabled={!canPreviousPage}
              onClick={() => gotoPage(0)}
            >
              <FiArrowLeftCircle />
            </Button>
            <Button disabled={!canPreviousPage} onClick={() => previousPage()}>
              <FiArrowLeft />
            </Button>
            <Button>
              <b>{pageIndex + 1}</b>/{pageOptions.length}
            </Button>
            <Button disabled={!canNextPage} onClick={() => nextPage()}>
              <FiArrowRight />
            </Button>
            <Button
              borderRadius="xl"
              disabled={!canNextPage}
              onClick={() => gotoPage(pageCount - 1)}
            >
              <FiArrowRightCircle />
            </Button>
          </ButtonGroup>
          <Flex w="100%" mr="8">
            <Spacer />
            <GlobalTableFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </Flex>
        </Center>
      </Box>
    </BoxWrapper>
  )
}

export default SceneTable
