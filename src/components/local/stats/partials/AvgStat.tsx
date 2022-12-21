/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react"
import CountUp from "react-countup"
import { FiInfo } from "react-icons/fi"

const AvgStat = ({ avg, data, color }) => {
  if (typeof avg === "number") {
    avg = [
      {
        id: "Average Value",
        value: avg,
      },
    ]
  }
  return (
    <Box>
      <Box>
        <Flex>
          {typeof avg === "object" &&
            avg.map((item, i) => {
              return (
                <Box
                  key={item.id}
                  w="100%"
                  minW={[0, 0, 100, 100]}
                  color="gray.500"
                  fontSize="sm"
                >
                  <Flex direction="column" minW={[0, 0, 100, 100]}>
                    <Tooltip
                      p="2"
                      fontSize="sm"
                      borderRadius="xl"
                      label={`Average ${item.id} value for ${data.length} days`}
                      placement="top"
                    >
                      <Box
                        mr="2"
                        color={color[i]}
                        fontSize={["xl", "xl", "2xl", "2xl"]}
                        fontWeight="bold"
                        textAlign={["start", "start", "end", "end"]}
                        _hover={{ cursor: "pointer" }}
                      >
                        <CountUp end={item.value} duration={0.5} />
                      </Box>
                    </Tooltip>
                    <Box mr="2" textAlign={["start", "start", "end", "end"]}>
                      <Text fontSize={[10, "sm"]} noOfLines={1}>
                        {item.id}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )
            })}
        </Flex>
      </Box>
    </Box>
  )
}

export default AvgStat
