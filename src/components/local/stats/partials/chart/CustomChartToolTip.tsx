import {
  Text,
  Box,
  useColorModeValue,
  Center,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Thead,
} from "@chakra-ui/react"
import { format } from "date-fns"
//import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  enrichPayload,
  findDegraded,
} from "../../../../../lib/data/chart/chartInfo"
import { mutateString } from "../../../../../lib/hooks/utils"

const TableRow = ({ dataKey, value, stroke, avg }) => {
  return (
    <>
      <Tr>
        <Td>{mutateString(dataKey).toUpperCase()}</Td>
        <Td isNumeric>
          <Flex direction="row">
            <Box mx="2" color={stroke} fontWeight="bold">
              {value}
            </Box>
            <Box mr="4" />
          </Flex>
        </Td>
        <Td fontWeight="medium" textAlign="end">
          <Box alignContent="end">
            <Text color={value - avg > 0 ? "green.500" : "red.500"}>
              {value - avg > 0 && "+"}
              {value - avg}
            </Text>
          </Box>
        </Td>
      </Tr>
    </>
  )
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  avg,
  data,
  onChange,
}) => {
  const isDegraded = findDegraded(payload)
  const [isMobile, setIsMobile] = useState(false)
  //const router = useRouter()

  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth])

  useEffect(() => {
    if (active && payload && payload.length > 0) {
      const enrichedPayload = enrichPayload(payload, avg)
      onChange(enrichedPayload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label])

  const shouldShowTooltip = isMobile && active && payload && payload.length > 0
  //&& router.pathname !== "/"

  const bg = useColorModeValue("whiteAlpha.300", "blackAlpha.500")
  const borderColor = useColorModeValue("gray.200", "gray.800")

  if (shouldShowTooltip) {
    return (
      <Box
        p="2"
        fontSize="xs"
        bg={bg}
        border="1px"
        borderColor={borderColor}
        borderRadius="xl"
        shadow="md"
        backdropFilter="blur(4px)"
      >
        <Box>
          <Center fontSize="md" fontWeight="bold">
            {format(new Date(label), "yyyy MMMM d")}
          </Center>
          {isDegraded && (
            <Center mt="1">
              <Text color="red.500" fontWeight="bold">
                Degraded
              </Text>
            </Center>
          )}
          <Table my="1" size="xs" variant="simple">
            <Thead>
              <Tr>
                <Td>Category</Td>
                <Td>
                  <Box ml="2">Value</Box>
                </Td>
                <Td isNumeric>vs. {data && data.length} days AVG.</Td>
              </Tr>
            </Thead>
            <Tbody>
              {avg && typeof avg !== "number" ? (
                payload.map((item, index) => {
                  const avgKey = `avg${item.dataKey
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join("")}`
                  const avgValue = avg[avgKey]
                  return (
                    <TableRow
                      key={index}
                      dataKey={item.dataKey}
                      value={item.value}
                      avg={avgValue}
                      stroke={item.stroke}
                    />
                  )
                })
              ) : (
                <TableRow
                  dataKey={payload[0].dataKey}
                  value={payload[0].value}
                  stroke={undefined}
                  avg={avg}
                />
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    )
  }
}
