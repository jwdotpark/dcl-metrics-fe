/* eslint-disable react-hooks/rules-of-hooks */
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserTopScenes from "../../../../../public/data/staticUserTopScenes.json"
import { useState, useEffect, useMemo } from "react"
import {
  isProd,
  isDev,
  isLocal,
  getEndpoint,
} from "../../../../lib/data/constant"
import {
  Text,
  Image,
  Center,
  Spinner,
  Box,
  useColorModeValue,
  Link,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"
import { convertSeconds, mutateStringToURL } from "../../../../lib/hooks/utils"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"
import {
  FiArrowLeft,
  FiArrowLeftCircle,
  FiArrowRight,
  FiArrowRightCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi"

const UserTopScenes = ({ address, userAddressRes }) => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const topScenesUrl = getEndpoint(`users/${address}/activity/top_scenes`)

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
          <Box
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
          >
            <Image
              w="100%"
              minW={[100, 200, 200, 200, 300]}
              h="100px"
              borderRadius="xl"
              objectFit="cover"
              alt={row.original.name}
              src={row.original.map_url}
            />
          </Box>
        ),
      },
      {
        Header: "Scene",
        Cell: ({ row }) => (
          <Flex>
            <Box>
              <Text
                color={useColorModeValue("blue.600", "blue.200")}
                fontWeight="medium"
              >
                <Link
                  href={`/scenes/${mutateStringToURL(
                    row.original.scene_name
                  )}/${row.original.scene_uuid}`}
                  target="_blank"
                >
                  {row.original.scene_name}
                </Link>
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        Header: "Time Spent",
        Cell: ({ row }) => (
          <Flex>
            <Box>
              <Text as="kbd" fontWeight="medium">
                {convertSeconds(row.original.duration)}
              </Text>
            </Box>
          </Flex>
        ),
        accessor: "duration",
      },
    ],
    []
  )

  const tableInstance = useTable(
    { columns, data, initialState: { pageSize: 5 } },
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

  const UserSceneTable = () => {
    return (
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        overflowY="auto"
        mx="4"
      >
        <Table
          {...getTableProps()}
          h={chartProps.height}
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
        </Center>
      </Box>
    )
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const url = `/api/server-fetch?url=${topScenesUrl}&address=${address}&endpoint=${address}/activity/top_scenes/`

      if (isProd) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isDev && !isLocal) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isLocal) {
        setData(staticUserTopScenes)
      }
    }
    fetchData()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 3]}>
      <BoxTitle
        name={`Frequently Visited Scenes`}
        description={`Top ${data.length} list of scenes ${userAddressRes.name} visited the most`}
        date=""
        avgData={""}
        slicedData={[]}
        color={""}
        line={false}
        setLine={{}}
      />
      {isLoading ? (
        <Center h={chartProps.height}>
          <Spinner />
        </Center>
      ) : (
        <UserSceneTable />
      )}
    </BoxWrapper>
  )
}

export default UserTopScenes
function useBreakPointValue(arg0: { base: boolean; sm: boolean; md: boolean }) {
  throw new Error("Function not implemented.")
}
