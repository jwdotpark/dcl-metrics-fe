/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Image,
  Box,
  Center,
  Spinner,
  Text,
  Button,
  ButtonGroup,
  useColorModeValue,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Flex,
} from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import useSWR from "swr"
import { useMemo, useState } from "react"
import { format } from "date-fns"
import { useTable, useSortBy, useFilters, usePagination } from "react-table"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"

const UserEmotes = ({ address, name }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json())

  // eslint-disable-next-line no-unused-vars
  const [pageNum, setPageNum] = useState(1)
  const pageSize = 500
  const queryParam = `?pageNum=${pageNum}&pageSize=${pageSize}`

  const nameUrl =
    `https://peer.decentraland.org/lambdas/users/${address}/emotes` + queryParam

  const { data, error, isValidating } = useSWR(nameUrl, fetcher)

  data &&
    data.elements.forEach((element) => {
      const individualData = element.individualData[0]
      element.price = Math.round(individualData.price / 1000000000000000000)
      element.transferredAt = individualData.transferredAt
    })

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
        disableFilters: true,
        Cell: ({ cell: { value } }) => {
          return <Text>{value}</Text>
        },
      },
      {
        Header: "Name",
        accessor: "name",
        sortType: "basic",
        Cell: ({ cell: { value } }) => {
          return <Text fontWeight="bold">{value}</Text>
        },
      },
      {
        Header: "Thumbnail",
        accessor: "urn",
        disableFilters: true,
        Cell: ({ cell: { value } }) => (
          <Center w="60px" h="60px">
            <Image
              alt={value.name}
              src={`https://peer.decentraland.org/lambdas/collections/contents/${value}/thumbnail`}
            />
          </Center>
        ),
        disableSortBy: true,
      },
      {
        Header: "Amount",
        accessor: "amount",
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Price",
        accessor: "price",
        sort: "desc",
        disableFilters: true,
        Cell: ({ cell: { value } }) => {
          return <Text>{value}</Text>
        },
      },
      {
        Header: "Category",
        accessor: "category",
        Filter: ColumnFilter,
      },
      {
        Header: "Rarity",
        accessor: "rarity",
        Filter: ColumnFilter,
      },
      {
        Header: "Transferred At",
        accessor: "transferredAt",
        disableFilters: true,
        Filter: ColumnFilter,
        Cell: ({ cell: { value } }) => (
          <Text as="kbd">{format(new Date(value * 1000), "yyyy/MM/dd")}</Text>
        ),
      },
    ],
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data: data ? data.elements : [],
      defaultColumn,
      initialState: {
        sortBy: [{ id: "transferredAt", desc: true }],
        pageIndex: 0,
        pageSize: 5,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const getPageButtons = () => {
    const pageButtons = []
    const totalPages = Math.min(pageCount, 8)

    for (let i = 0; i < totalPages; i++) {
      const pageNumber = pageIndex - 4 + i

      if (pageNumber >= 0 && pageNumber < pageCount) {
        pageButtons.push(
          <Button
            key={pageNumber}
            w="100%"
            bg={
              pageNumber === pageIndex
                ? useColorModeValue("gray.300", "gray.800")
                : useColorModeValue("gray.200", "gray.700")
            }
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            onClick={() => gotoPage(pageNumber)}
            variant="solid"
          >
            {pageNumber + 1}
          </Button>
        )
      }
    }

    return pageButtons
  }

  let UserEmotesContent: JSX.Element

  if (isValidating) {
    UserEmotesContent = (
      <Center h="200px">
        <Spinner />
      </Center>
    )
  } else if (error) {
    UserEmotesContent = <Center h="100%">Error</Center>
  } else {
    UserEmotesContent = (
      <Box>
        <Box overflowX="scroll" minH="200px">
          <Box>
            <ButtonGroup
              w="100%"
              mb="4"
              bg={useColorModeValue("gray.300", "gray.600")}
              border="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
              borderRadius="xl"
              shadow="md"
              isAttached
              size="sm"
            >
              <Button
                w="100%"
                bg={useColorModeValue("gray.200", "gray.700")}
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                onClick={() => gotoPage(0)}
              >
                <FiArrowLeftCircle />
              </Button>
              {getPageButtons()}
              <Button
                w="100%"
                bg={useColorModeValue("gray.200", "gray.700")}
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                onClick={() => gotoPage(pageCount - 1)}
              >
                <FiArrowRightCircle />
              </Button>
            </ButtonGroup>
          </Box>
          <Table {...getTableProps()} size="md" variant="simple">
            <Thead>
              {headerGroups.map((headerGroup, i) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, j) => (
                    <Th
                      key={j}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <Flex direction="row">
                        <Center>
                          <Box>{column.render("Header")}</Box>
                          <Box ml="2">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <span>&darr;</span>
                              ) : (
                                <span>&uarr;</span>
                              )
                            ) : (
                              ""
                            )}
                          </Box>
                          <Box sx={{ transform: "translateY(-1px)" }} ml="2">
                            {column.canFilter ? column.render("Filter") : null}
                          </Box>
                        </Center>
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <Tr key={i} {...row.getRowProps()}>
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
    )
  }

  return (
    <Box mb="4">
      {data && data.elements.length > 0 && (
        <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
          <BoxTitle
            name={`User Emotes`}
            description={`Latest ${data.totalAmount} emotes ${name} owns in Decentraland, apart from the default one`}
            date=""
            avgData={[]}
            slicedData={{}}
            color={""}
            line={false}
            setLine={{}}
          />
          <Box m="4">{UserEmotesContent}</Box>
        </BoxWrapper>
      )}
    </Box>
  )
}

// Custom column filter component
function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column

  return (
    <Input
      w="100px"
      borderRadius="xl"
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search"
      size="xs"
      value={filterValue || ""}
      variant="filled"
    />
  )
}

export default UserEmotes
