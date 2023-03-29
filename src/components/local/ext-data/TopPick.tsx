import {
  Text,
  Image,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Flex,
  Tooltip,
  Button,
  ButtonGroup,
  Center,
  useColorMode,
} from "@chakra-ui/react"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"
import { useMemo } from "react"
import {
  FiArrowLeft,
  FiArrowLeftCircle,
  FiArrowRight,
  FiArrowRightCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BottomLegend from "./partial/BottomLegend"
import Link from "next/link"
import useSWR from "swr"
import ProfilePicture from "../ProfilePicture"

const TopPick = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Map",
        Cell: ({ row }) => (
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflfowStyle: "none",
              scrollbarWidth: "none",
            }}
            overflow="hidden"
            w={["100px", "125px", "150px", "250px"]}
            h="75"
            border="2px solid"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
          >
            <Image
              w={["100px", "125px", "150px", "250px"]}
              h="75"
              borderRadius="md"
              objectFit="cover"
              alt={row.original.name}
              src={row.original.images.image_url}
            />
          </Box>
        ),
      },
      {
        Header: "Coord",
        Cell: ({ row }) => (
          <Box>
            <Link href={``}>
              <Text as="kbd">
                [{row.original.coords.x},{row.original.coords.y}]
              </Text>
            </Link>
          </Box>
        ),
      },
      {
        Header: "Current Price",
        Cell: ({ row }) => (
          <Box>
            <Text as="kbd">
              {row.original.current_price
                ? Math.round(row.original.current_price * 100) / 100
                : "N/A"}
            </Text>
          </Box>
        ),
        accessor: "current_price",
      },
      {
        Header: "Current Price ETH",
        Cell: ({ row }) => (
          <Box>
            <Text as="kbd">
              {row.original.current_price_eth
                ? Math.round(row.original.current_price_eth * 100) / 100
                : "N/A"}
            </Text>
          </Box>
        ),
        accessor: "current_price_eth",
      },
      {
        Header: "ETH Predicted Price",
        Cell: ({ row }) => (
          <Box>
            <Text as="kbd">
              {row.original.eth_predicted_price
                ? Math.round(row.original.eth_predicted_price * 100) / 100
                : "N/A"}
            </Text>
          </Box>
        ),
        accessor: "eth_predicted_price",
      },
      {
        Header: "Gap",
        Cell: ({ row }) => (
          <Box>
            <Text as="kbd">
              {row.original.gap
                ? Math.round(row.original.gap * 100) / 100
                : "N/A"}
            </Text>
          </Box>
        ),
        accessor: "gap",
      },
      //{
      //  Header: "Floor Adjusted Predicted Price",
      //  Cell: ({ row }) => (
      //    <Box>
      //      <Text as="kbd">
      //        {row.original.floor_adjusted_predicted_price
      //          ? Math.round(
      //              row.original.floor_adjusted_predicted_price * 100
      //            ) / 100
      //          : "N/A"}
      //      </Text>
      //    </Box>
      //  ),
      //  accessor: "floor_adjusted_predicted_price",
      //},
      {
        Header: "Owner",
        Cell: ({ row }) => {
          const endpoint =
            "https://peer-ap1.decentraland.org/lambdas/profiles?id="
          const url = endpoint + row.original.owner
          const fetcher = (url) => fetch(url).then((r) => r.json())
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { data, error, isLoading } = useSWR(url, fetcher)

          const { name, avatar } =
            data && data.length > 0 ? data[0].avatars[0] : "no data"
          const profileImage = avatar?.snapshots?.face256

          return (
            <Flex>
              <Box>
                <ProfilePicture
                  address={profileImage}
                  verified={false}
                  guest={false}
                />
              </Box>
              <Tooltip
                display={name && "none"}
                p="2"
                fontSize="sm"
                borderRadius="md"
                label="User does not have a name for Decentraland"
                placement="top"
              >
                <Link
                  href={`https://market.decentraland.org/accounts/${row.original.owner}`}
                  target="_blank"
                >
                  <Text
                    sx={{ transform: "translateY(3px)" }}
                    display="inline-block"
                  >
                    {name ? name : "N/A"}
                  </Text>
                </Link>
              </Tooltip>
            </Flex>
          )
        },
      },
      {
        Header: "Ext Link",
        Cell: ({ row }) => (
          <Flex>
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="md"
              label="OpenSea"
              placement="top"
            >
              <Link href={row.original.market_links.opensea} target="_blank">
                <Button size="xs" variant="link">
                  <Image
                    boxSize="22px"
                    alt="opensea"
                    src="/images/opensea.png"
                  />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="md"
              label="LooksRare"
              placement="top"
            >
              <Link href={row.original.market_links.looksrare} target="_blank">
                <Button size="xs" variant="link">
                  <Image
                    boxSize="22px"
                    ml="1"
                    alt="LooksRare"
                    src="/images/looksrare.png"
                  />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="md"
              label="X2Y2"
              placement="top"
            >
              <Link href={row.original.market_links.X2Y2} target="_blank">
                <Button size="xs" variant="link">
                  <Image
                    boxSize="22px"
                    ml="1"
                    alt="X2Y2"
                    src="/images/x2y2.png"
                  />
                </Button>
              </Link>
            </Tooltip>
          </Flex>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    prepareRow,
  } = tableInstance

  const { pageIndex } = state

  const pageButtons = []
  const MAX_BUTTONS = 10
  const startIndex = Math.max(0, pageIndex - Math.floor(MAX_BUTTONS / 2))
  const endIndex = Math.min(startIndex + MAX_BUTTONS, pageOptions.length)

  const { colorMode } = useColorMode()
  for (let i = startIndex; i < endIndex; i++) {
    pageButtons.push(
      <Button
        key={i}
        w="100%"
        bg={
          i === pageIndex
            ? colorMode === "light"
              ? "gray.300"
              : "gray.900"
            : colorMode === "light"
            ? "gray.100"
            : "gray.700"
        }
        border="1px solid"
        // eslint-disable-next-line react-hooks/rules-of-hooks
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        onClick={() => gotoPage(i)}
      >
        {i + 1}
      </Button>
    )
  }

  return (
    <BoxWrapper colSpan={6}>
      <BoxTitle
        name="Highly Valuated Lands"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="High market value based on a variety of factors from MetaGameHub DAO"
        line={undefined}
        setLine={undefined}
      />
      <Box mx="2">
        <Box overflowX="scroll">
          <Box mx="2">
            <Center w="100%" my="4">
              <ButtonGroup
                w="100%"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                borderRadius="lg"
                shadow="md"
                isAttached
                size="sm"
              >
                <Button
                  w="100%"
                  bg={useColorModeValue("gray.200", "gray.700")}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  disabled={!canPreviousPage}
                  onClick={() => gotoPage(0)}
                >
                  <FiArrowLeftCircle />
                </Button>
                <Button
                  w="100%"
                  bg={useColorModeValue("gray.200", "gray.700")}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  disabled={!canPreviousPage}
                  onClick={() => previousPage()}
                >
                  <FiArrowLeft />
                </Button>
                {pageButtons}
                <Button
                  w="100%"
                  bg={useColorModeValue("gray.200", "gray.700")}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  disabled={!canNextPage}
                  onClick={() => nextPage()}
                >
                  <FiArrowRight />
                </Button>
                <Button
                  w="100%"
                  bg={useColorModeValue("gray.200", "gray.700")}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  disabled={!canNextPage}
                  onClick={() => gotoPage(pageCount - 1)}
                >
                  <FiArrowRightCircle />
                </Button>
              </ButtonGroup>
            </Center>
          </Box>
          <Box mx="2">
            <Table {...getTableProps()} my="2" size="sm" variant="simple">
              <Thead>
                {headerGroups.map((headerGroup, i) => (
                  <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, j) => (
                      <Th
                        key={j}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
          </Box>
        </Box>
      </Box>
      <BottomLegend description="Source from MetaGameHub DAO" />
    </BoxWrapper>
  )
}

export default TopPick
