import {
  Box,
  useColorModeValue,
  SimpleGrid,
  Flex,
  useBreakpointValue,
  Text,
  Spacer,
  Center,
  Tooltip,
  Table,
  Tbody,
  Td,
  Tr,
  Thead,
  Th,
  TableCaption,
} from "@chakra-ui/react"
import moment from "moment"
import { useState } from "react"
import SceneHelpTooltip from "./SceneHelpTooltip"
import { description, name } from "../../../../../lib/data/sceneInfo"

const StatBox = ({ data, selectedScene }) => {
  // const [dataArr, setDataArr] = useState(Object.entries(data))
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
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Box w="100%" pr={[2, 0]} py={[2, 4]}>
          <Table minH="350px" size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>Stat</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredStats
                .slice(0, filteredStats.length / 2)
                .map(({ label, name, value, description }) => {
                  return (
                    <Tr key={label}>
                      <Td borderBottom="none">
                        <Flex>
                          <SceneHelpTooltip description={description} />
                          <Box>
                            <Text fontSize={["xs", "sm", "md", "md"]}>
                              {name}
                            </Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td borderBottom="none" isNumeric>
                        <Box>
                          {/* @ts-ignore */}
                          <Text
                            fontSize={["xs", "sm", "md", "lg"]}
                            fontWeight="bold"
                          >
                            {name === "Average Time Spent" ||
                            name === "Average Time Spent AFK"
                              ? moment.utc(Number(value) * 1000).format(`H:m:s`)
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
        <Box w="100%" pr={[2, 0]} py={[2, 4]}>
          <Table minH="350px" size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>Stat</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredStats
                .slice(filteredStats.length / 2, filteredStats.length)
                .map(({ label, name, value, description }) => {
                  return (
                    <Tr key={label}>
                      <Td borderBottom="none">
                        <Flex>
                          <SceneHelpTooltip description={description} />
                          <Box>
                            <Text fontSize={["xs", "sm", "md", "md"]}>
                              {name}
                            </Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td borderBottom="none" isNumeric>
                        <Box>
                          <Text
                            minW="100px"
                            fontSize={["xs", "sm", "md", "md"]}
                            fontWeight="bold"
                          >
                            {/* @ts-ignore */}
                            {name === "Average Complete Session Duration"
                              ? moment.utc(Number(value) * 1000).format(`h:m:s`)
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
