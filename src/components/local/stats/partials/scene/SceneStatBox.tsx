/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import { Box, useColorModeValue, Flex, Text, Spacer } from "@chakra-ui/react"
import { description, name } from "../../../../../lib/data/sceneInfo"
import ToolTip from "../../../../layout/local/ToolTip"
import { convertSeconds } from "../../../../../lib/hooks/utils"

// eslint-disable-next-line no-unused-vars
const StatBox = ({ data, selectedScene, date }) => {
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
          w="100%"
          h="100%"
          borderRadius="xl"
        >
          <Flex
            direction="column"
            overflowY="auto"
            w="100%"
            bg={useColorModeValue("white", "gray.700")}
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
          >
            <ToolTip
              label={
                <Text fontSize="xs">
                  Data on {date.slice(2).replace(/-/g, "/")}
                </Text>
              }
            >
              <Box mt="4" mb="2">
                {filteredStats
                  .slice(2, filteredStats.length / 2 + 1)
                  .map(({ label, name, value, description }) => (
                    <Box
                      key={label}
                      mb="2"
                      mx="4"
                      p="2"
                      bg={useColorModeValue("gray.100", "gray.800")}
                      border="1px solid"
                      borderColor={useColorModeValue("gray.100", "gray.700")}
                      borderRadius="xl"
                      shadow="md"
                      _hover={{ bg: useColorModeValue("gray.200", "gray.900") }}
                    >
                      <Flex>
                        <Flex align="center" flex="1" px="2">
                          <Box>
                            <Text
                              fontSize={["md", "lg", "lg"]}
                              fontWeight="black"
                            >
                              <>
                                {name === "average time spent" ||
                                name === "average time spent AFK"
                                  ? convertSeconds(Number(value))
                                  : value}
                                {name === "share of Global Visitors" && "%"}
                              </>
                            </Text>
                          </Box>
                          <Box ml="2">
                            <Text fontSize="10px">{name.toUpperCase()}</Text>
                          </Box>
                        </Flex>
                      </Flex>
                      <Box px="2">
                        <Text color="gray.500" fontSize="xs">
                          {description}
                        </Text>
                      </Box>
                      <Spacer />
                    </Box>
                  ))}
              </Box>
            </ToolTip>
          </Flex>

          <Flex
            direction="column"
            overflowY="auto"
            w="100%"
            bg={useColorModeValue("white", "gray.700")}
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
          >
            <ToolTip
              label={
                <Text fontSize="xs">
                  Data on {date.slice(2).replace(/-/g, "/")}
                </Text>
              }
            >
              <Box mt="4" mb="2">
                {filteredStats
                  .slice(filteredStats.length / 2 + 1, filteredStats.length)
                  .map(({ label, name, value, description }) => (
                    <Box
                      key={label}
                      mb="2"
                      mx="4"
                      p="2"
                      bg={useColorModeValue("gray.100", "gray.800")}
                      border="1px solid"
                      borderColor={useColorModeValue("gray.100", "gray.700")}
                      borderRadius="xl"
                      shadow="md"
                      _hover={{ bg: useColorModeValue("gray.200", "gray.900") }}
                    >
                      <Flex>
                        <Flex align="center" flex="1" px="2">
                          <Box>
                            <Text
                              fontSize={["md", "lg", "lg"]}
                              fontWeight="black"
                            >
                              {name === "avg complete session duration"
                                ? convertSeconds(Number(value))
                                : value.toString()}
                            </Text>
                          </Box>
                          <Box ml="2">
                            <Text fontSize="10px">{name.toUpperCase()}</Text>
                          </Box>
                        </Flex>
                      </Flex>
                      <Box px="2">
                        <Text color="gray.500" fontSize="xs">
                          {description}
                        </Text>
                      </Box>
                      <Spacer />
                    </Box>
                  ))}
              </Box>
            </ToolTip>
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
