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
  Spacer,
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
import { useAtom } from "jotai"
import { lineChartAtom } from "../../../lib/state/lineChartState"
import Link from "next/link"
import useSWR from "swr"
import ProfilePicture from "../ProfilePicture"
import GlobalTableFilter from "../stats/partials/scene/GlobalTableFilter"

const TopPick = ({ data }) => {
  console.log("top pick", data)
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const chartState = JSON.parse(localStorage.getItem("chart") || "{}")
  //const tableData = useMemo(() => data, [data])

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
            w={["100px", "125px", "150px", "300px"]}
            h={chartProps.height === 700 ? 150 : 75}
            border="2px solid"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
          >
            <Image
              w={["100px", "125px", "150px", "300px"]}
              h={chartProps.height === 700 ? 150 : 75}
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
      {
        Header: "Floor Adjusted Predicted Price",
        Cell: ({ row }) => (
          <Box>
            <Text as="kbd">
              {row.original.floor_adjusted_predicted_price
                ? Math.round(
                    row.original.floor_adjusted_predicted_price * 100
                  ) / 100
                : "N/A"}
            </Text>
          </Box>
        ),
        accessor: "floor_adjusted_predicted_price",
      },
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
            <Box minW="200">
              <ProfilePicture
                address={profileImage}
                verified={false}
                guest={false}
              />
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
                  <Box
                    sx={{ transform: "translateY(3px)" }}
                    display="inline-block"
                  >
                    <Text>{name ? name : "N/A"}</Text>
                  </Box>
                </Link>
              </Tooltip>
            </Box>
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

  for (let i = startIndex; i < endIndex; i++) {
    pageButtons.push(
      <Button
        key={i}
        w="16"
        bg={i === pageIndex ? "gray.300" : "gray.100"}
        onClick={() => gotoPage(i)}
      >
        {i + 1}
      </Button>
    )
  }

  return (
    <BoxWrapper colSpan={6}>
      <BoxTitle
        name="Top 50 Picked Land"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="top pick scenes"
        line={undefined}
        setLine={undefined}
      />
      <Table
        h={["auto", 850]}
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
      <Center w="100%" mx="4" my="4">
        <ButtonGroup borderRadius="xl" shadow="md" isAttached size="sm">
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
          {pageButtons}
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
      </Center>
      <BottomLegend description="Source from MetaGameHub DAO" />
    </BoxWrapper>
  )
}

export default TopPick
