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

const AvgStat = ({ avg, data }) => {
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
    <Box pos="absolute" right="0">
      <Box>
        <Flex>
          {/* <Text fontSize="2xl" mr="2">
            Average:
          </Text> */}
          <Tooltip
            fontSize="sm"
            borderRadius="md"
            label={`Average count for ${data.length} days`}
            placement="top"
          >
            <Box w="100%">
              <Center h="100%" mr="1">
                <FiInfo size="20px" />
              </Center>
            </Box>
          </Tooltip>
          <Spacer />
          <Text
            color={useColorModeValue("#ff5555", "#50fa7b")}
            fontSize="2xl"
            fontWeight="extrabold"
            cursor="grab"
          >
            <CountUp end={avg} duration={0.5} />
          </Text>
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
