import {
  useColorModeValue,
  Box,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react"
import Link from "next/link"
import { useMemo } from "react"
import { useTable } from "react-table"
import { convertSeconds, mutateStringToURL } from "../../../lib/hooks/utils"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"

const SceneTable = ({ sceneRes }) => {
  const data = useMemo(() => sceneRes, [sceneRes])

  console.log(data)
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
      },
      {
        Header: "Visitors",
        Cell: ({ row }) => <Text>{row.original.visitors}</Text>,
      },
      {
        Header: "Complete Sessions",
        Cell: ({ row }) => <Text>{row.original.complete_sessions}</Text>,
      },
      {
        Header: "Share of Global Visitors",
        Cell: ({ row }) => <Text>{row.original.share_of_global_visitors}</Text>,
      },
      {
        Header: "Unique Logins",
        Cell: ({ row }) => <Text>{row.original.unique_logins}</Text>,
      },
      {
        Header: "Unique Logouts",
        Cell: ({ row }) => <Text>{row.original.unique_logouts}</Text>,
      },
      {
        Header: "Total Logins",
        Cell: ({ row }) => <Text>{row.original.total_logins}</Text>,
      },
      {
        Header: "Total Logouts",
        Cell: ({ row }) => <Text>{row.original.total_logouts}</Text>,
      },
      {
        Header: "Average Session Duration",
        Cell: ({ row }) => (
          <Text as="kbd">
            {convertSeconds(row.original.avg_complete_session_duration)}
          </Text>
        ),
      },
      {
        Header: "Avg. Time Spent",
        Cell: ({ row }) => (
          <Text>{convertSeconds(row.original.avg_time_spent)}</Text>
        ),
      },
      {
        Header: "Avg. Time Spent AFK",
        Cell: ({ row }) => (
          <Text as="kbd">
            {convertSeconds(row.original.avg_time_spent_afk)}
          </Text>
        ),
      },
    ],
    []
  )

  const tableInstance = useTable({ columns, data })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <BoxWrapper colSpan={6}>
      <Box overflowY="hidden">
        <BoxTitle
          name="Scenes with Most Unique Visitors"
          date=""
          avgData=""
          slicedData=""
          color=""
          description="Scenes with the most unique visits in the last period"
        />
        <Table
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
                  <Th key={j} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
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
      </Box>
    </BoxWrapper>
  )
}

export default SceneTable
