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
} from "@chakra-ui/react"
import { useState } from "react"
import CountUp from "react-countup"
import { FiInfo } from "react-icons/fi"

const StatBox = ({ data, selectedScene }) => {
  const [dataArr, setDataArr] = useState(Object.entries(data))
  const unit = {
    visitors: " visitors",
    share_of_global_visitors: "%",
    avg_time_spent: " seconds",
    avg_time_spent_afk: " seconds",
    total_logins: " logins",
    unique_logins: " logins",
    total_logouts: " logouts",
    unique_logouts: " logouts",
    complete_sessions: " sessions",
    avg_complete_session_duration: " seconds",
  }
  const description = {
    visitors: "this is visitor",
    share_of_global_visitors: "this is share of global visitors",
    avg_time_spent: "this is avg time spent",
    avg_time_spent_afk: "this is avg time spent afk",
    total_logins: "this is total logins",
    unique_logins: "this is unique logins",
    total_logouts: "this is total logouts",
    unique_logouts: "this is unique logouts",
    complete_sessions: "this is complete sessions",
    avg_complete_session_duration: "this is avg complete session duration",
  }

  const stats = dataArr.map((item) => {
    return {
      label: item[0],
      value: item[1],
      description: description[item[0]],
      unit: unit[item[0]],
    }
  })

  const filteredStats = stats.filter(
    (item) =>
      item.label !== "name" &&
      item.label !== "map_url" &&
      item.label !== "marathon_users" &&
      item.label !== "time_spent_histogram" &&
      item.label !== "parcels_heatmap"
  )

  const mutateString = (str) => {
    const strArr = str.split("_")
    const capitalizedArr = strArr.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1)
    })
    const mutatedStr = capitalizedArr.join(" ")
    return mutatedStr
  }

  const helpTooltip = useBreakpointValue({
    base: "14px",
    sm: "14px",
    md: "16px",
    lg: "20px",
  })

  const Stat = (props) => {
    const { label, value, description, unit } = props
    return (
      <Flex
        h="100%"
        bg={useColorModeValue("gray.300", "gray.600")}
        border="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Flex direction="row" w="100%" m="2">
          <Center h="100%" ml={[2, 2, 2, 4]}>
            <Tooltip
              fontSize="sm"
              borderRadius="md"
              label={description}
              placement="top"
            >
              <Center mr={[2, 2, 2, 4]} ml="2">
                <FiInfo size={helpTooltip} />
              </Center>
            </Tooltip>
            <Text
              color={useColorModeValue("gray.800", "gray.200")}
              fontSize={["xs", "xs", "10px", "sm"]}
            >
              {mutateString(label).toUpperCase()}
            </Text>
          </Center>

          <Spacer />
          <Flex dir="column">
            <Center mr="2">
              <Text
                // as="kbd"
                fontSize={["md", "lg", "xl", "2xl"]}
                fontWeight="semiBold"
              >
                <CountUp end={parseFloat(value)} duration={0.5} />
                {unit}
              </Text>
            </Center>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return (
    <>
      <SimpleGrid
        w="100%"
        h={["100%", "100%", "100%", "400px"]}
        // mt={[0, 2, 4, 0]}
        p="4"
        bg={useColorModeValue("gray.200", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <SimpleGrid
          overflow="auto"
          w="100%"
          h="100%"
          borderRadius="xl"
          columns={[1, 2]}
        >
          {filteredStats.map(({ label, value, description, unit }) => (
            <Stat
              key={label}
              label={label}
              value={value}
              description={description}
              unit={unit}
            />
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </>
  )
}

export default StatBox
