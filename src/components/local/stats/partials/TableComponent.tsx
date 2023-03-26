import {
  Center,
  Flex,
  Table,
  Text,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  useColorMode,
  Image,
  useColorModeValue,
  Box,
} from "@chakra-ui/react"
import {
  dateRangeStr,
  sliceStr,
  normalizeValue,
} from "../../../../lib/data/tableInfo"
import ProfilePicture from "../../ProfilePicture"
import { convertSeconds } from "../../../../lib/hooks/utils"
import TableLink from "./TableLink"
import TableMap from "./TableMap"
import { isSafari, isMobileSafari } from "react-device-detect"
import moment from "moment"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const TableComponent = ({
  data,
  dateRange,
  propertyName,
  headList,
  bodyList,
}) => {
  const { colorMode } = useColorMode()

  const date = dateRangeStr(dateRange)
  let tableData

  if (headList[0] === "Scenes Map") {
    tableData = data
  } else {
    tableData = data[date][propertyName]
  }

  const TableHead = () => {
    return (
      <Tr>
        {headList.map((head) => (
          <Th key={head}>{head}</Th>
        ))}
      </Tr>
    )
  }

  const TableBody = () => {
    const barColor = headList[0] === "Time Spent" ? "#70AC7650" : "#bd93f950"
    const detectSafari = isSafari || isMobileSafari ? true : false
    const barChartStyle = (index) => {
      return {
        background: `linear-gradient(90deg, ${barColor} ${
          normalizeValue(tableData)[index]
        }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
      }
    }

    const [chartProps, setChartProps] = useAtom(lineChartAtom)
    const chartState = JSON.parse(localStorage.getItem("chart") || "{}")

    return (
      <Tbody>
        {tableData.map((row, i) => (
          <Tr
            key={
              row.time_spent ? row.time_spent : row.parcels_visited || row.date
            }
            style={detectSafari ? {} : barChartStyle(i)}
          >
            {bodyList.map((body) => (
              <>{renderTd(body, row, chartProps)}</>
            ))}
          </Tr>
        ))}
      </Tbody>
    )
  }

  return (
    <TableContainer mt="2" mx="4">
      <Table h="auto" my="2" borderBottom="none" size="sm" variant="simple">
        <TableHead />
        <TableBody />
      </Table>
    </TableContainer>
  )
}

export default TableComponent

const renderTd = (body, row, chartProps) => {
  switch (body) {
    case "time_spent":
      return (
        <Td key={body}>
          <b>{convertSeconds(row[body])}</b>
        </Td>
      )
    case "parcels_visited":
      return (
        <Td key={body}>
          <b>{row[body]}</b>
        </Td>
      )
    case "name":
      return (
        <Td key={body}>
          <Flex>
            <ProfilePicture
              address={row.avatar_url}
              verified={row.verified_user}
              guest={row.guest_user}
            />
            <Center>{sliceStr(row.name)}</Center>
          </Flex>
        </Td>
      )
    case "address":
      return (
        <>
          <Td key={body}>{sliceStr(row.address)}</Td>
          <Td key={body}>
            <TableLink address={row.address} />
          </Td>
        </>
      )
    case "scene_name":
      return (
        <Td key={body}>
          <Text fontSize="md">{row.scene_name}</Text>
        </Td>
      )
    case "unique_addresses":
      return (
        <Td key={body}>
          <Text fontSize="md">
            <b>{row.unique_addresses}</b>
          </Text>
        </Td>
      )
    case "map_url":
      return (
        <Td key={body}>
          <TableMap mapUrl={row.map_url} />
        </Td>
      )
    case "avg_time_spent":
      return (
        <Td key={body}>
          <Text fontSize="md">
            <b>{convertSeconds(row.avg_time_spent)}</b>
          </Text>
        </Td>
      )
    case "logins":
      return (
        <Td key={body}>
          <Text fontSize="md">
            <b>{row.total_logins}</b>
          </Text>
        </Td>
      )
    case "logouts":
      return (
        <Td key={body}>
          <Text fontSize="md">
            <b>{row.total_logouts}</b>
          </Text>
        </Td>
      )
    case "avg_time_spent_afk":
      return (
        <Td key={body}>
          <Text fontSize="md">
            <b>{convertSeconds(row.avg_time_spent_afk)}</b>
          </Text>
        </Td>
      )
    case "coord":
      return (
        <Td key={body}>
          <Text fontSize="md">[{row.coord}]</Text>
        </Td>
      )
    case "visit_count":
      return (
        <Td key={body}>
          <Text fontSize="md">
            <b>{row.visit_count}</b>
          </Text>
        </Td>
      )
    case "map":
      return (
        <Td key={body}>
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
            //h={chartProps.height === 700 ? 150 : 75}
            h="75"
            border="2px solid"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
          >
            <Center h="100%">
              <Image
                borderRadius="xl"
                objectFit="cover"
                alt="map image"
                src={row.image}
              />
            </Center>
          </Box>
        </Td>
      )
    case "date":
      return (
        <Td key={body}>
          <Text fontSize="md">{moment(row.date).format("YYYY MMM. D")}</Text>
        </Td>
      )
    case "buyer":
      return (
        <Td key={body}>
          <Text>{row.buyer}</Text>
        </Td>
      )
    case "eth_price":
      return (
        <Td key={body}>
          <Text>{row.eth_price}</Text>
        </Td>
      )
    //case "landId":
    //  return (
    //    <Td key={body}>
    //      <Text>{row.landId}</Text>
    //    </Td>
    //  )
    case "symbol":
      return (
        <Td key={body}>
          <Text>{row.symbol}</Text>
        </Td>
      )
    case "valuation":
      return (
        <Td key={body}>
          <Text>{row.valuation}</Text>
        </Td>
      )
    default:
      return null
  }
}
