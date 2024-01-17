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
  useDisclosure,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"
//import { mutateStringToURL, convertSeconds } from "../../../../lib/hooks/utils"
import { format } from "date-fns"
import WorldPageTableButtonGroup from "../partials/world/WorldPageTableButtonGroup"
import WorldJumpModal from "../partials/world/WorldJumpModal"

const ScenePageTable = ({ worldCurrentRes, pageSize }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const worldCurrent = useMemo(() => worldCurrentRes, [worldCurrentRes])
  const { data } = worldCurrent

  const [selectedRow, setSelectedRow] = useState({})

  const handleThumbnailClick = (row: any) => {
    onOpen()
    setSelectedRow(row)
  }

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => <Text>{row.index + 1}</Text>,
        accessor: "index",
      },
      {
        Header: "Thumbnail",
        Cell: ({ row }) => (
          <Box onClick={() => handleThumbnailClick(row)}>
            <Image
              w="75px"
              minW="75px"
              maxW="75px"
              h="75px"
              minH="75px"
              maxH="75px"
              borderRadius="md"
              alt={row.original.scenes[0].title}
              fallbackSrc="/dcl-logo-toned.svg"
              src={row.original.scenes[0].thumbnail}
            />
          </Box>
        ),
        sortBy: false,
      },
      {
        Header: "World Name",
        Cell: ({ row }) => <Text>{row.original.ens_token}</Text>,
        accessor: (row) => row.ens_token,
      },
      //{
      //  Header: "Name",
      //  Cell: ({ row }) => <Text>{row.original.name}</Text>,
      //  accessor: (row) => row.name,
      //},
      {
        Header: "Scene Title",
        accessor: (row) => row.scenes[0].title,
        Cell: ({ row }) => (
          <Text fontWeight="bold">{row.original.scenes[0].title}</Text>
        ),
      },
      {
        Header: "Description",
        accessor: (row) => row.scenes[0].description,
        Cell: ({ row }) => (
          <Box maxW="500px">
            <Text>
              {row.original.scenes[0].description
                ? row.original.scenes[0].description.length > 200
                  ? `${row.original.scenes[0].description.substring(0, 200)}...`
                  : row.original.scenes[0].description
                : "N/A"}
            </Text>
          </Box>
        ),
      },
      {
        Header: "Created At",
        accessor: (row) => row.scenes[0].timestamp,
        Cell: ({ row }) => (
          <Text>{format(row.original.scenes[0].timestamp, "yy MMM d")}</Text>
        ),
      },
      {
        Header: "User",
        id: "user_count",
        accessor: (row) => row.user_count,
        Cell: ({ row }) => <Text>{row.original.user_count}</Text>,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: pageSize,
        sortBy: [{ id: "user_count", desc: true }],
        hiddenColumns: ["user_count", "index"],
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
      <WorldJumpModal
        isOpen={isOpen}
        onClose={onClose}
        selectedRow={selectedRow}
      />
      <Box mr="4">
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

        <Box
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflfowStyle: "none",
            scrollbarWidth: "none",
          }}
          overflowX="scroll"
        >
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
      </Box>
    </Box>
  )
}

export default ScenePageTable
