/* eslint-disable react-hooks/rules-of-hooks */
import {
  useToast,
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
  Button,
} from "@chakra-ui/react"
import {
  dateRangeStr,
  sliceStr,
  normalizeValue,
} from "../../../../lib/data/tableInfo"
import ProfilePicture from "../../ProfilePicture"
import { convertSeconds, mutateStringToURL } from "../../../../lib/hooks/utils"
import TableLink from "./TableLink"
import TableMap from "./TableMap"
import { isSafari, isMobileSafari } from "react-device-detect"
import Link from "next/link"
import useSWR from "swr"
import ToolTip from "../../../layout/local/ToolTip"
import { format } from "date-fns"

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

  if (headList[0] === "Scenes Map" || headList[0] === "Map") {
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
    return (
      <Tbody>
        {tableData.map((row, i) => (
          <Tr
            key={row.time_spent ? row.time_spent : row.parcels_visited}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            style={detectSafari ? {} : barChartStyle(i)}
          >
            {bodyList.map((body) => (
              <>{RenderTd(body, row)}</>
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

const RenderTd = (body, row) => {
  const toast = useToast()

  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
    toast({
      description: "Value " + value + " has been copied to the clipboard.",
      duration: 1000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
    })
  }

  switch (body) {
    case "time_spent":
      return (
        <Td key={body}>
          <Text as="kbd">
            <b>{convertSeconds(row[body])}</b>
          </Text>
        </Td>
      )
    case "parcels_visited":
      return (
        <Td key={body}>
          <Text as="kbd">
            <b>{row[body]}</b>
          </Text>
        </Td>
      )
    case "name":
      return (
        <Td key={body}>
          <Link href={`/users/${row.address}`} target="_blank">
            <Flex>
              <ProfilePicture
                name={row.name}
                address={row.address}
                verified={row.verified_user}
                guest={row.guest_user}
              />
              <Center>{sliceStr(row.name)}</Center>
            </Flex>
          </Link>
        </Td>
      )
    case "address":
      return (
        <>
          <Td key={body}>
            <Button
              borderRadius="xl"
              onClick={() => handleToast(row.address)}
              size="xs"
              variant="link"
            >
              <Text as="kbd">{sliceStr(row.address)}</Text>
            </Button>
          </Td>
          <Td>
            <TableLink address={row.address} />
          </Td>
        </>
      )
    case "scene_name":
      return (
        <Td key={body}>
          <Link
            href={`/scenes/${mutateStringToURL(row.scene_name)}/${row.uuid}`}
            target="_blank"
          >
            <Text
              color={useColorModeValue("blue.500", "blue.300")}
              fontWeight="semibold"
            >
              {row.scene_name}
            </Text>
          </Link>
        </Td>
      )
    case "unique_addresses":
      return (
        <Td key={body}>
          <Text as="kbd">
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
          <Text>
            <b>{convertSeconds(row.avg_time_spent)}</b>
          </Text>
        </Td>
      )
    case "logins":
      return (
        <Td key={body}>
          <Text as="kbd">
            <b>{row.total_logins}</b>
          </Text>
        </Td>
      )
    case "logouts":
      return (
        <Td key={body}>
          <Text as="kbd">
            <b>{row.total_logouts}</b>
          </Text>
        </Td>
      )
    case "avg_time_spent_afk":
      return (
        <Td key={body}>
          <Text>
            <b>{convertSeconds(row.avg_time_spent_afk)}</b>
          </Text>
        </Td>
      )
    case "coord":
      return (
        <Td key={body}>
          <Text as="kbd">[{row.coord}]</Text>
        </Td>
      )
    case "visit_count":
      return (
        <Td key={body}>
          <Text as="kbd">
            <b>{row.visit_count}</b>
          </Text>
        </Td>
      )
    case "map":
      return (
        <Td key={body} maxW="300">
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
          <Text as="kbd">{format(new Date(row.date), "yyyy-MM-dd")}</Text>
        </Td>
      )
    case "buyer":
      const endpoint = "https://peer-ap1.decentraland.org/lambdas/profiles?id="
      const url = endpoint + row.buyer
      const fetcher = (url) => fetch(url).then((r) => r.json())
      // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars
      const { data, error, isLoading } = useSWR(url, fetcher)

      const { name, avatar } =
        data && data.length > 0 ? data[0].avatars[0] : "no data"
      const profileImage = avatar?.snapshots?.face256

      return (
        <Td key={body}>
          <Box>
            <Link
              href={`https://market.decentraland.org/accounts/${row.buyer}`}
              target="_blank"
            >
              <ProfilePicture
                name={profileImage}
                address={row.address}
                verified={false}
                guest={false}
              />

              <Center
                sx={{ transform: "translateY(5px)" }}
                display="inline-block"
              >
                <ToolTip label="User does not have a name for Decentraland">
                  <Text>{name ? name : "N/A"}</Text>
                </ToolTip>
              </Center>
            </Link>
          </Box>
        </Td>
      )
    case "eth_price":
      return (
        <Td key={body}>
          <Box minW="150">
            <Text as="kbd">{row.eth_price}</Text>
          </Box>
        </Td>
      )
    //case "symbol":
    //  return (
    //    <Td key={body}>
    //      <Flex>
    //        <Text>{row.symbol}</Text>
    //      </Flex>
    //    </Td>
    //  )
    case "valuation":
      return (
        <Td key={body}>
          <Text as="kbd">{Math.round(row.valuation * 100) / 100}</Text>
        </Td>
      )
    case "current_price":
      return (
        <Td key={body}>
          <Text as="kbd">
            {row.current_price
              ? Math.round(row.current_price * 100) / 100
              : "N/A"}
          </Text>
        </Td>
      )
    default:
      return null
  }
}
