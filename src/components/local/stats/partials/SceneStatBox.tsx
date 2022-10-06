import {
  Box,
  useColorModeValue,
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  Text,
  Spacer,
  Grid,
} from "@chakra-ui/react"
import { useState } from "react"
import CountUp from "react-countup"

const StatBox = ({ data }) => {
  const [dataArr, setDataArr] = useState(Object.entries(data))
  // const dataArr = Object.entries(data)
  const stats = dataArr.map((item) => {
    return {
      label: item[0],
      value: item[1],
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

  const Stat = (props) => {
    const { label, value } = props
    return (
      <Box
        pl="2"
        py="2"
        border="2px solid"
        borderColor={useColorModeValue("gray.300", "gray.700")}
        borderRadius="md"
        shadow={useColorModeValue("sm", "sm-dark")}
      >
        <Stack>
          <Text color="muted" fontSize="xs">
            {mutateString(label)}
          </Text>
          <Heading size={useBreakpointValue({ base: "sm", md: "md" })}>
            <Text fontSize="2xl" fontWeight="bold">
              <CountUp end={parseFloat(value)} duration={0.5} />
            </Text>
          </Heading>
        </Stack>
      </Box>
    )
  }

  return (
    <Box as="section" w="100%">
      <Grid
        gap={7}
        // templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        // columns={{
        //   base: 1,
        //   md: 2,
        // }}
      >
        {filteredStats.map(({ label, value }) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </Grid>
    </Box>
  )
}

export default StatBox
