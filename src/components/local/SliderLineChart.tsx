import {
  Flex,
  Center,
  Box,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react"

const SliderLineChart = ({ dateRange, setDateRange, chartData }) => {
  return (
    <Center>
      <Box w="100%" mx="10" mt="4">
        <Slider
          aria-label="slider-ex-1"
          defaultValue={dateRange}
          max={chartData.length}
          value={dateRange}
          onChange={(value) => setDateRange(value)}
        >
          <SliderMark
            value={dateRange}
            textAlign="center"
            borderRadius="lg"
            bg="blue.500"
            color="white"
            mt="5"
            ml="-6"
            w="12"
          >
            {dateRange}d
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Center>
  )
}

export default SliderLineChart
