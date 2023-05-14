import {
  Box,
  useColorModeValue,
  Flex,
  Text,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react"
import moment from "moment"
import { description, name } from "../../../../../lib/data/sceneInfo"
import momentDurationFormatSetup from "moment-duration-format"
import ToolTip from "../../../../layout/local/ToolTip"

// eslint-disable-next-line no-unused-vars
const StatBox = ({ data, selectedScene }) => {
  momentDurationFormatSetup(moment)
  const dataArr = Object.entries(data)
  const stats = dataArr.map((item, index) => {
    return {
      id: index,
      label: item[0],
      value: item[1],
      description: description[item[0]],
      name: name[item[0]],
    }
  })

  const filteredStats = stats.filter(
    (item) =>
      item.label !== "name" &&
      item.label !== "map_url" &&
      item.label !== "marathon_users" &&
      item.label !== "time_spent_histogram" &&
      item.label !== "parcels_heatmap" &&
      item.label !== "visitors_by_hour_histogram"
  )

  const StatTable = () => {
    return (
      <Flex
        sx={{
          "& > * + *": {
            ml: [0, 0, 4, 4],
            mt: [4, 4, 0, 0],
          },
        }}
        direction={["column", "row"]}
        overflow="hidden"
        w="100%"
        h="100%"
        p="4"
        bg={useColorModeValue("white", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Box
          overflow="hidden"
          w="100%"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <Table h="420px" colorScheme="blackAlpha" size="md" variant="striped">
            <Tbody>
              {filteredStats
                .slice(2, filteredStats.length / 2 + 1)
                .map(({ label, name, value, description }) => {
                  return (
                    <Tr key={label}>
                      <Td borderBottom="none">
                        <Flex>
                          <ToolTip label={description}>
                            <Box>
                              <Text>{name}</Text>
                            </Box>
                          </ToolTip>
                        </Flex>
                      </Td>
                      <Td borderBottom="none" isNumeric>
                        <Box>
                          <Text fontWeight="bold">
                            {name === "Avg Time Spent" ||
                            name === "Avg Time Spent AFK"
                              ? moment
                                  .duration(Number(value), "seconds")
                                  // @ts-ignore
                                  .format("h[h] m[m] s[s]")
                              : value}
                            {name === "Visitors" && " users"}
                            {name === "Share of Global Visitors" && "%"}
                          </Text>
                        </Box>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </Box>
        <Box
          overflow="hidden"
          w="100%"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <Table
            minH="420px"
            colorScheme="blackAlpha"
            size="md"
            variant="striped"
          >
            <Tbody>
              {filteredStats
                .slice(filteredStats.length / 2 + 1, filteredStats.length)
                .map(({ label, name, value, description }) => {
                  return (
                    <Tr key={label}>
                      <Td borderBottom="none">
                        <Flex>
                          <ToolTip label={description}>
                            <Box>
                              <Text>{name}</Text>
                            </Box>
                          </ToolTip>
                        </Flex>
                      </Td>
                      <Td borderBottom="none" isNumeric>
                        <Box>
                          <Text minW="100px" fontWeight="bold">
                            {name === "Avg Complete Session Duration"
                              ? moment
                                  .duration(Number(value), "seconds")
                                  // @ts-ignore
                                  .format("h[h] m[m] s[s]")
                              : value}
                          </Text>
                        </Box>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    )
  }

  return (
    <Flex h="100%">
      <StatTable />
    </Flex>
  )
}

export default StatBox
