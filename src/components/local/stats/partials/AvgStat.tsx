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
          <Center>
            <Tooltip label="Hover me">
              <FiInfo size="16" />
            </Tooltip>
          </Center>
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
          {typeof avg === "number" && (
            <>
              {/* <Text mr="2" fontSize={["xl", "xl", "2xl", "2xl"]}></Text> */}
              <Box
                mr="2"
                color={color[0]}
                fontSize={["xl", "xl", "2xl", "2xl"]}
                fontWeight="bold"
                textAlign={["start", "start", "end", "end"]}
              >
                <CountUp end={avg} duration={0.5} />
              </Box>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

export default AvgStat
