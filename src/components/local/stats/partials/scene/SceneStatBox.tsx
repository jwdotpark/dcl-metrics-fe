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
  Center,
  filter,
} from "@chakra-ui/react"
import { useState } from "react"
import CountUp from "react-countup"
import { SceneColor } from "../../../../../lib/hooks/utils"

const StatBox = ({ data, selectedScene }) => {
  const [dataArr, setDataArr] = useState(Object.entries(data))
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
      <Flex
        bg={useColorModeValue("gray.300", "gray.600")}
        border="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Flex direction="row" w="100%" mx="4" my="2">
          <Box w={["100%", "100%", "100%", "60%"]}>
            <Text
              color={useColorModeValue("gray.800", "gray.400")}
              fontSize={["xs", "xs"]}
            >
              {mutateString(label).toUpperCase()}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Text
              as="kbd"
              fontSize={["md", "sm", "md", "2xl"]}
              fontWeight="bold"
            >
              <CountUp end={parseFloat(value)} duration={0.5} />
            </Text>
          </Box>
        </Flex>
      </Flex>
    )
  }

  return (
    <>
      <SimpleGrid
        w="100%"
        h="400px"
        p="4"
        bg={useColorModeValue("gray.200", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <SimpleGrid overflow="auto" w="100%" borderRadius="xl" columns={[1, 2]}>
          {filteredStats.map(({ label, value }) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </>
  )
}

export default StatBox
