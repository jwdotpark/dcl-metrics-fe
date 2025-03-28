import { Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react"
import { formatDistanceToNowStrict } from "date-fns"
import CountUp from "react-countup"

const WorldStatItem = ({ value, label, description }) => {
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const bg = useColorModeValue("gray.100", "gray.700")
  const fontColor = useColorModeValue("gray.600", "gray.300")

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      bg={bg}
      border="1px"
      borderColor={borderColor}
      shadow="md"
      rounded="xl"
    >
      <Box>
        <Text fontSize="3xl" fontWeight="black" noOfLines={1}>
          {typeof value === "number" ? <CountUp end={value} /> : value} {label}
        </Text>
      </Box>
      <Box>
        <Text color={fontColor} fontSize="sm">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}

const WorldStatBox = ({
  total_count,
  current_users,
  currently_occupied,
  timestamp,
  isMainPage,
}) => {
  return (
    <Box w="100%" h="270px" p={!isMainPage && 2}>
      <Grid
        gap={4}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        w="100%"
        h="100%"
      >
        <WorldStatItem
          value={total_count}
          label=""
          description="Deployed worlds"
        />
        <WorldStatItem
          value={currently_occupied}
          label=""
          description="Occupied worlds"
        />
        <WorldStatItem
          value={current_users}
          label=""
          description="Users in all worlds"
        />
        {timestamp && (
          <WorldStatItem
            value={formatDistanceToNowStrict(new Date(timestamp * 1000), {
              addSuffix: true,
            })}
            label=""
            description="Updated"
          />
        )}
      </Grid>
    </Box>
  )
}

export default WorldStatBox
