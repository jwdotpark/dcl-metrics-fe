import {
  Text,
  Center,
  useColorModeValue,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react"
import { ResponsiveBar } from "@nivo/bar"
import ProfilePicture from "../components/local/ProfilePicture"
import { convertSeconds } from "../lib/hooks/utils"

const BarChart = ({ data, onOpen, value, setValue }) => {
  const min = Math.min(...data.map((d) => d.time_spent))
  const max = Math.max(...data.map((d) => d.time_spent))

  const toast = useToast()

  const handleToast = (value) => {
    navigator.clipboard.writeText(value.indexValue)
    toast({
      title: "Address copied.",
      description:
        "Address " +
        value.indexValue.slice(0, 10) +
        ".. has been copied to the clipboard.",
      duration: 2000,
      isClosable: true,
      position: "top-right",
      status: "success",
    })
  }

  return (
    <ResponsiveBar
      data={data}
      keys={["time_spent"]}
      indexBy="address"
      margin={{ top: 30, right: 30, bottom: 10, left: 110 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      colorBy="indexValue"
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      ariaLabel="bar chart"
      onClick={(value) => handleToast(value)}
      animate={false}
      axisLeft={{
        format: (value) => convertSeconds(value),
      }}
      enableLabel={true}
      theme={{
        textColor: useColorModeValue("#1A202C", "#E2E8F0"),
      }}
      valueFormat={(value) => convertSeconds(value)}
      minValue={min}
      maxValue={max}
      tooltip={(point) => {
        return <PopoverTooltip value={point} />
      }}
    />
  )
}

export default BarChart

const PopoverTooltip = (value) => {
  return (
    <Flex
      sx={{ backdropFilter: "blur(20px)" }}
      boxShadow="xl"
      m="2"
      mx="4"
      p="4"
      px="6"
      border="gray.400"
      borderRadius="xl"
      gap="1rem"
    >
      <Center>
        <Box w="100%">
          <ProfilePicture address={value.indexValue} modal={true} />
        </Box>
      </Center>

      <Box>
        <Text>
          This user spent <b>{value.value.formattedValue}</b> yesterday.
        </Text>
        <Text>
          Click to copy the address{" "}
          <kbd>{value.value.indexValue.slice(0, 11) + ".. "}</kbd>
        </Text>
      </Box>
    </Flex>
  )
}
