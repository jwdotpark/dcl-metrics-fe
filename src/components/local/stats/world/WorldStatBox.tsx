import { Flex, useColorModeValue, Box, Text } from "@chakra-ui/react"
import { format, formatDistanceToNowStrict } from "date-fns"
import CountUp from "react-countup"
import ToolTip from "../../../layout/local/ToolTip"

const WorldStatItem = ({ value, label, description }) => {
  return (
    <Box
      flex={1}
      mb="4"
      mx={[1, 2]}
      p="2"
      px={[2, 4]}
      bg={useColorModeValue("gray.100", "gray.700")}
      border="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      borderRadius="xl"
      shadow="md"
      _hover={{ bg: useColorModeValue("gray.200", "gray.900") }}
    >
      <Box mb="-2">
        <Text
          as="span"
          fontSize={
            typeof value === "number"
              ? ["xl", "xl", "3xl", "4xl"]
              : ["sm", "lg", "4xl"]
          }
          fontWeight="semibold"
        >
          {typeof value === "number" ? <CountUp end={value} /> : value} {label}
        </Text>
      </Box>
      <Box py="2">
        <Text color="gray.500" fontSize={["xs", "sm"]}>
          {description}
        </Text>
      </Box>
    </Box>
  )
}

const WorldStatBox = ({
  isMainPage,
  total_count,
  current_users,
  currently_occupied,
  timestamp,
}) => {
  return (
    <Flex
      justify="space-between"
      direction={isMainPage ? "column" : "row"}
      mb="-2"
      mx="2"
    >
      <WorldStatItem
        value={total_count}
        label=""
        description=" The total number of deployed worlds"
      />
      <WorldStatItem
        value={currently_occupied}
        label=""
        description="The number of occupied worlds"
      />
      <WorldStatItem
        value={current_users}
        label=""
        description="The number of users in all worlds"
      />
      <ToolTip label={"test"}>
        <WorldStatItem
          value={formatDistanceToNowStrict(new Date(timestamp * 1000), {
            addSuffix: false,
          })}
          label="ago"
          description={`Data last updated at ${format(
            new Date(timestamp * 1000),
            "yy/MM/d HH:mm"
          )} UTC`}
        />
      </ToolTip>
    </Flex>
  )
}

export default WorldStatBox
