import React from "react"
import {
  Box,
  useColorModeValue,
  Flex,
  Text,
  Spacer,
  Center,
} from "@chakra-ui/react"
import moment from "moment"
import { description, name } from "../../../../../lib/data/sceneInfo"
import momentDurationFormatSetup from "moment-duration-format"

// eslint-disable-next-line no-unused-vars
const StatBox = ({ data, selectedScene, date }) => {
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
      <>
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
          <Flex
            direction="column"
            overflow="hidden"
            w="100%"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
          >
            {filteredStats
              .slice(2, filteredStats.length / 2 + 1)
              .map(({ label, name, value, description }) => (
                <Box key={label} mb="2">
                  <Flex>
                    <Flex align="center" flex="1" pt="4" px="4">
                      <Box>
                        <Text fontSize={["md", "lg", "xl"]} fontWeight="black">
                          {name === "average time spent" ||
                          name === "average time spent AFK"
                            ? moment
                                .duration(Number(value), "seconds")
                                // @ts-ignore
                                .format("h[h] m[m] s[s]")
                            : value}
                          {name === "Share of Global Visitors" && "%"}
                        </Text>
                      </Box>
                      <Box ml="2">
                        <Text fontSize={["md", "lg", "xl"]}>{name}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Box px="4">
                    <Text color="gray.500" fontSize="sm">
                      {description}
                    </Text>
                  </Box>
                  <Spacer />
                </Box>
              ))}
            <Spacer />
            <Box mb="4">
              <Center>
                <Text fontSize="xs">
                  Last updated at {moment(date).format("yy/MM/DD")}
                </Text>
              </Center>
            </Box>
          </Flex>

          <Flex
            direction="column"
            overflow="hidden"
            w="100%"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
          >
            {filteredStats
              //.slice(2, filteredStats.length / 2 + 1)
              .slice(filteredStats.length / 2 + 1, filteredStats.length)
              .map(({ label, name, value, description }) => (
                <Box key={label} mb="2">
                  <Flex>
                    <Flex align="center" flex="1" pt="4" px="4">
                      <Box>
                        <Text fontSize={["md", "lg", "xl"]} fontWeight="black">
                          {name === "average time spent" ||
                          name === "average time spent AFK"
                            ? moment
                                .duration(Number(value), "seconds")
                                // @ts-ignore
                                .format("h[h] m[m] s[s]")
                            : value}
                          {name === "Share of Global Visitors" && "%"}
                        </Text>
                      </Box>
                      <Box ml="2">
                        <Text fontSize={["md", "lg", "xl"]}>{name}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Box px="4">
                    <Text color="gray.500" fontSize="sm">
                      {description}
                    </Text>
                  </Box>
                  <Spacer />
                </Box>
              ))}
            <Spacer />
            <Box mb="4">
              <Center>
                <Text fontSize="xs">
                  Last updated at {moment(date).format("yy/MM/DD")}
                </Text>
              </Center>
            </Box>
          </Flex>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Flex h="100%">
        <StatTable />
      </Flex>
    </>
  )
}

export default StatBox
