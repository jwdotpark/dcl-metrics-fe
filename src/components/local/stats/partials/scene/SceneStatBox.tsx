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
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react"
import { useState } from "react"
import CountUp from "react-countup"
import { FiInfo } from "react-icons/fi"

const StatBox = ({ data, selectedScene }) => {
  const [dataArr, setDataArr] = useState(Object.entries(data))
  const unit = {
    visitors: " users",
    share_of_global_visitors: "%",
    avg_time_spent: " minutes",
    avg_time_spent_afk: " minutes",
    total_logins: " times",
    unique_logins: " times",
    total_logouts: " times",
    unique_logouts: " times",
    complete_sessions: " sessions",
    avg_complete_session_duration: " minutes",
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

  const name = {
    visitors: "Visitors",
    share_of_global_visitors: "Share of Global Visitors",
    avg_time_spent: "Average Time Spent",
    avg_time_spent_afk: "Average Time Spent AFK",
    total_logins: "Total Logins",
    unique_logins: "Unique Logins",
    total_logouts: "Total Logouts",
    unique_logouts: "Unique Logouts",
    complete_sessions: "Complete Sessions",
    avg_complete_session_duration: "Average Complete Session Duration",
  }

  const stats = dataArr.map((item) => {
    return {
      label: item[0],
      value: item[1],
      description: description[item[0]],
      unit: unit[item[0]],
      name: name[item[0]],
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

  const helpTooltipSize = useBreakpointValue({
    base: "14px",
    sm: "14px",
    md: "16px",
    lg: "20px",
  })

  const HelpTooltip = (description) => {
    return (
      <Tooltip
        sx={{ transform: "translateY(-10px)" }}
        fontSize="sm"
        borderRadius="md"
        label={description}
        placement="top"
      >
        <Box sx={{ transform: "translateY(-14px)" }} mr="2">
          <FiInfo size={helpTooltipSize} />
        </Box>
      </Tooltip>
    )
  }

  const StatTable = () => {
    return (
      <Flex
        direction={["column", "row"]}
        overflow="hidden"
        w="100%"
        h="100%"
        py="2"
        bg={useColorModeValue("gray.100", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Box w="100%" mx={[2, 4]} pr={[2, 0]} py={[0, 4]}>
          <Table h="100%" size="sm">
            <Tbody>
              {filteredStats
                .slice(0, filteredStats.length / 2)
                .map(({ label, name, value, description, unit }) => {
                  return (
                    <Tr key={label}>
                      <Td>
                        <Flex>
                          <Tooltip
                            sx={{ transform: "translateY(-10px)" }}
                            fontSize="sm"
                            borderRadius="md"
                            label={description}
                            placement="top"
                          >
                            <Box sx={{ transform: "translateY(-14px)" }} mr="2">
                              <FiInfo size={helpTooltipSize} />
                            </Box>
                          </Tooltip>
                          <Box>
                            <Text
                              sx={{ transform: "translateY(-14px)" }}
                              fontSize={["xs", "sm", "md", "xl"]}
                            >
                              {name}
                            </Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td isNumeric>
                        <Text
                          as="kbd"
                          fontSize={["md", "lg", "xl", "3xl"]}
                          fontWeight="bold"
                        >
                          <CountUp end={Number(value)} duration={0.5} />
                        </Text>
                        <Text
                          mt="1"
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          color={useColorModeValue("gray.500", "gray.400")}
                          fontSize={["xs", "sm", "sm", "sm"]}
                        >
                          {unit}
                        </Text>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </Box>
        <Box w="100%" mx={[2, 4]} pr={[2, 0]} py={[0, 4]}>
          <Table h="100%" size="sm">
            <Tbody>
              {filteredStats
                .slice(filteredStats.length / 2, filteredStats.length)
                .map(({ label, name, value, description, unit }) => {
                  return (
                    <Tr key={label}>
                      <Td>
                        <Flex>
                          <Tooltip
                            sx={{ transform: "translateY(-10px)" }}
                            fontSize="sm"
                            borderRadius="md"
                            label={description}
                            placement="top"
                          >
                            <Box sx={{ transform: "translateY(-14px)" }} mr="2">
                              <FiInfo size={helpTooltipSize} />
                            </Box>
                          </Tooltip>
                          <Box>
                            <Text
                              sx={{ transform: "translateY(-14px)" }}
                              fontSize={["xs", "sm", "md", "xl"]}
                            >
                              {name}
                            </Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td isNumeric>
                        <Text
                          as="kbd"
                          fontSize={["md", "lg", "xl", "3xl"]}
                          fontWeight="bold"
                        >
                          <CountUp end={Number(value)} duration={0.5} />
                        </Text>
                        <Text
                          mt="1"
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          color={useColorModeValue("gray.500", "gray.400")}
                          fontSize={["xs", "sm", "sm", "sm"]}
                        >
                          {unit}
                        </Text>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    )
  }

  return (
    <Flex h="100%">
      <StatTable />
    </Flex>
  )
}

export default StatBox
