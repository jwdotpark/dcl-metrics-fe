import { Box, useColorModeValue, Container, SimpleGrid, Flex } from "@chakra-ui/react"
import {} from "framer-motion"
import CountUp from "react-countup"

const StatBox = ({ data }) => {
  // console.log("data", data)

  // create an array of object with the data
  const dataArr = Object.entries(data)
  // assign each dataArr's 0th index to the key 'label' and 1st index to the value 'value'
  const stats = dataArr.map((item) => {
    return {
      label: item[0],
      value: item[1],
    }
  })

  // remove map_url, marathon_users, time_spent_histogram, parcels_heatmap
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

  const Stat = ({ label, value }) => {
    return (
      <Flex
        align="center"
        justify="center"
        direction="column"
        w="100%"
        h="100%"
        px="2"
        bg={useColorModeValue("gray.100", "gray.800")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", " gray.600")}
        borderRadius="md"
        shadow="md"
        // py="3"
      >
        <Box as="kbd" fontSize="3xl" fontWeight="semibold" textAlign="center">
          <CountUp end={parseFloat(value)} duration={0.5} />
        </Box>
        <Box
          color={useColorModeValue("gray.600", "gray.400")}
          fontSize="sm"
          textAlign="center"
        >
          {mutateString(label)}
        </Box>
      </Flex>
    )
  }
  return (
    <Box
      as="section"
      py={{
        base: "2",
        md: "4",
      }}
    >
      <Container>
        <SimpleGrid
          gap={{
            base: "2",
            md: "4",
          }}
          columns={{
            base: 1,
            md: 2,
          }}
        >
          {filteredStats.map(({ label, value }) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default StatBox
