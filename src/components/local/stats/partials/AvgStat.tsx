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
  return (
    <Box>
      <Box>
        <Flex>
          {avg.map((item, i) => {
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
