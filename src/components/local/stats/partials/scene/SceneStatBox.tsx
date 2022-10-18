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
  Thead,
  Th,
  TableCaption,
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
    visitors: "Unique visitors yesterday in this scene",
    share_of_global_visitors: "",
    avg_time_spent: "Average time users spent yesterday in this scene",
    avg_time_spent_afk:
      "Average Away From Keyboard time users spent yesterday in this scene",
    total_logins: "The amount of number user logged yesterday in this scene",
    unique_logins:
      "The amount of number user logged once yesterday in this scene",
    total_logouts: "Total amount of user logouts yesterday in this scene",
    unique_logouts:
      "Total amount of unique user logouts yesterday in this scene",
    complete_sessions: "",
    avg_complete_session_duration: "",
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
    lg: "18px",
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
        sx={{
          "& > * + *": {
            ml: [0, 0, 4, 4],
            mt: [4, 4, 0, 0],
          },
        }}
        direction={["column", "row"]}
        overflow="hidden"
        w="100%"
        h="100%"
        p="4"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Box w="100%" pr={[2, 0]} py={[2, 4]}>
          <Table minH="350px" size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>Stat</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredStats
                .slice(0, filteredStats.length / 2)
                .map(({ label, name, value, description, unit }) => {
                  return (
                    <Tr key={label}>
                      <Td borderBottom="none">
                        <Flex>
                          <Tooltip
                            fontSize="sm"
                            borderRadius="md"
                            label={description}
                            placement="top"
                          >
                            <Box mr="2">
                              <FiInfo size={helpTooltipSize} />
                            </Box>
                          </Tooltip>
                          <Box>
                            <Text fontSize={["xs", "sm", "md", "lg"]}>
                              {name}
                            </Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td borderBottom="none" isNumeric>
                        <Box>
                          <Text
                            fontSize={["xs", "sm", "md", "lg"]}
                            fontWeight="bold"
                          >
                            <CountUp end={Number(value)} duration={0.5} />
                          </Text>
                          <Text>{unit}</Text>
                        </Box>
                      </Td>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </Box>
        <Box w="100%" pr={[2, 0]} py={[2, 4]}>
          <Table minH="350px" size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>Stat</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredStats
                .slice(filteredStats.length / 2, filteredStats.length)
                .map(({ label, name, value, description, unit }) => {
                  return (
                    <Tr key={label}>
                      <Td borderBottom="none">
                        <Flex>
                          <Tooltip
                            fontSize="sm"
                            borderRadius="md"
                            label={description}
                            placement="top"
                          >
                            <Box mr="2">
                              <FiInfo size={helpTooltipSize} />
                            </Box>
                          </Tooltip>
                          <Box>
                            <Text fontSize={["xs", "sm", "md", "lg"]}>
                              {name}
                            </Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td borderBottom="none" isNumeric>
                        <Box>
                          <Text
                            fontSize={["xs", "sm", "md", "lg"]}
                            fontWeight="bold"
                          >
                            <CountUp end={Number(value)} duration={0.5} />
                          </Text>
                          <Text>{unit}</Text>
                        </Box>
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
