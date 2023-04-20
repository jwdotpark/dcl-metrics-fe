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
  Input,
  useBreakpointValue,
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
import ToolTip from "../../layout/local/ToolTip"

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
        Header: "Current Price(Mana)",
        Cell: ({ row }) => (
          <Box>
            <Text as="kbd">
              {row.original.current_price
                ? Math.round(row.original.current_price * 100) / 100
                : "Not For Sale"}
            </Text>
          </Box>
        ),
        accessor: "current_price",
      },
      {
        Header: "Current Price(ETH)",
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
        Header: "Predicted Price(ETH)",
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
                ? Math.round(row.original.gap * 100) / 100 + "%"
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
            <Link href={`/users/${row.original.owner}`} target="_blank">
              <Flex>
                <Box>
                  <ProfilePicture
                    address={profileImage}
                    verified={false}
                    guest={false}
                  />
                </Box>
                <ToolTip
                  label={
                    name ? "" : "User does not have a name for Decentraland"
                  }
                >
                  <Box display="inline-block">
                    <Text sx={{ transform: "translateY(3px)" }}>
                      {name ? name : "N/A"}
                    </Text>
                  </Box>
                </ToolTip>
              </Flex>
            </Link>
          )
        },
      },
      {
        Header: "Ext Link",
        Cell: ({ row }) => (
          <Flex>
            <ToolTip label="Decentraland">
              <Link href={row.original.external_link} target="_blank">
                <Button size="xs" variant="link">
                  <Image boxSize="22px" alt="opensea" src="/dcl-logo.svg" />
                </Button>
              </Link>
            </ToolTip>
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
  const MAX_BUTTONS = useBreakpointValue({ base: 3, sm: 5, md: 7, lg: 9 })
  const startIndex = Math.max(0, pageIndex - Math.floor(MAX_BUTTONS / 2))
  const endIndex = Math.min(startIndex + MAX_BUTTONS, pageOptions.length)

  const { colorMode } = useColorMode()
  for (let i = startIndex; i < endIndex; i++) {
    pageButtons.push(
      <Button
        key={i}
        w="17px"
        bg={
          i === pageIndex
            ? colorMode === "light"
              ? "gray.300"
              : "gray.900"
            : colorMode === "light"
            ? "gray.200"
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
        name="Top Market Deals"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="High market value based on a variety of factors"
        line={undefined}
        setLine={undefined}
      />
      <Box mx="2">
        <Box overflowX="auto">
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
      <Box mx="2">
        <Center w="100%" my="4">
          <ButtonGroup
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
            <Input
              bg={useColorModeValue("gray.200", "gray.700")}
              border="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 0
                  : 0
                gotoPage(pageNumber - 1)
              }}
              placeholder="1"
              size="sm"
              type="number"
              variant="filled"
            />
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
      <BottomLegend description="Source from" link="https://metagamehub.io" />
    </BoxWrapper>
  )
}

export default TopPick
