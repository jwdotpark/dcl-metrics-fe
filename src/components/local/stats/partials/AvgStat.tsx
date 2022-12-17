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
  const firstDate = moment(data[0].date).format("MMM. D")
  const lastDate = moment(data[data.length - 1].date).format("MMM. D")

  const statBoxDisplay = useBreakpointValue({
    base: "none",
    sm: "none",
    md: "block",
    lg: "block",
    xl: "block",
  })

  return (
    <Box>
      <Box>
        <Flex>
          {avg.map((item, i) => {
            return (
              <Box key={item.id} fontSize={["xs", "sm", "md", "md"]}>
                <Flex direction="row">
                  {/* <Box mr="2">
                    <Text fontSize="xs">{item.id}</Text>
                  </Box> */}
                  <Box mr="2" color={color[i]} fontSize="lg" fontWeight="bold">
                    <CountUp end={item.value} duration={0.5} />
                  </Box>
                </Flex>
              </Box>
            )
          })}
          <Box>
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="xl"
              label={`Average count for ${data.length} days`}
              placement="top"
            >
              <Box w="100%">
                <Center h="100%" mr="1">
                  <FiInfo size="20px" />
                </Center>
              </Box>
            </Tooltip>
          </Box>

          {/* <Text
            color={useColorModeValue("#ff5555", "#50fa7b")}
            fontSize="2xl"
            fontWeight="extrabold"
            cursor="grab"
          >
            <CountUp end={avg} duration={0.5} />
          </Text> */}
        </Flex>
        <Flex display={statBoxDisplay}>
          <Spacer />
          <Text color="gray.500" fontSize="sm" fontStyle="italic">
            {firstDate} - {lastDate}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default AvgStat
