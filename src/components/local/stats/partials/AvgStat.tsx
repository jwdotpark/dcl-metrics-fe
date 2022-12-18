/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Text,
  Flex,
  Tooltip,
  Spacer,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import moment from "moment"
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
          {avg.length > 1 && (
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="xl"
              label={`Average value for ${data.length} days`}
              placement="top"
            >
              <Box w="100%" mr="-2" pt="1">
                <FiInfo size="14px" />
              </Box>
            </Tooltip>
          )}
          {typeof avg === "object" &&
            avg.map((item, i) => {
              return (
                <Box
                  key={item.id}
                  w="100%"
                  minW={[0, 0, 75, 100]}
                  color="gray.500"
                  fontSize="sm"
                >
                  <Flex direction="column" minW={[0, 0, 75, 100]}>
                    <Box mr="2" textAlign={["start", "start", "end", "end"]}>
                      <Text fontSize="xs" noOfLines={1}>
                        {item.id}
                      </Text>
                    </Box>
                    <Box
                      mr="2"
                      color={color[i]}
                      fontSize={["xl", "xl", "2xl", "2xl"]}
                      fontWeight="bold"
                      textAlign={["start", "start", "end", "end"]}
                    >
                      <CountUp end={item.value} duration={0.5} />
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
