import {
  Box,
  Text,
  Flex,
  Tooltip,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react"
import moment from "moment"
import CountUp from "react-countup"

const AvgStat = ({ avg, data }) => {
  const firstDate = moment(data[0].date).format("MMM. D")
  const lastDate = moment(data[data.length - 1].date).format("MMM. D")

  return (
    <Box position="absolute" right="0">
      <Box>
        <Flex>
          <Spacer />
          <Tooltip
            label="Average count"
            placement="right"
            fontSize="sm"
            borderRadius="md"
          >
            <Text
              // as="kbd"
              fontSize="2xl"
              fontWeight="extrabold"
              color={useColorModeValue("#ff5555", "#50fa7b")}
              cursor="grab"
            >
              <CountUp end={avg} duration={0.5} />
            </Text>
          </Tooltip>
        </Flex>
        <Flex>
          <Text color="gray.500" fontSize="sm">
            {firstDate} - {lastDate}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default AvgStat
