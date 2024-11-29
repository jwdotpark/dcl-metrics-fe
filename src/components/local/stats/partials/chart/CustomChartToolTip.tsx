/* eslint-disable react-hooks/rules-of-hooks */
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
import { useEffect, useState } from "react"
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
  const findDegraded = (payloadArray) => {
    for (let item of payloadArray) {
      if (item.payload.degraded === true) {
        return true
      }
    }
    return false
  }

  const isDegraded = findDegraded(payload)

  const [isMobile, setIsMobile] = useState(false)

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
      const enrichedPayload = payload.map((item) => {
        const avgKey = `avg${item.dataKey
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("")}`
        const avgValue = avg[avgKey] || 0
        return {
          ...item,
          avg: avgValue,
        }
      })
      onChange(enrichedPayload)
    }
  }, [active, payload, avg, onChange])

  if (isMobile && active && payload && payload.length > 0) {
    return (
      <Box
        p="2"
        fontSize="xs"
        bg={useColorModeValue("whiteAlpha.300", "blackAlpha.500")}
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.800")}
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
