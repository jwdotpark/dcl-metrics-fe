import { Box } from "@chakra-ui/react"
import MultiLineChart from "../../../../../lib/MultiLineChart"

const SceneLineChart = ({ data, selectedScene }) => {
  const timeSpentHistogramArr = data.map((item) => item.time_spent_histogram)
  timeSpentHistogramArr.forEach((item, index) => {
    item.name = data[index].name
  })
  return (
    <Box h="100%" mb={[4, 0]}>
      <MultiLineChart
        res={timeSpentHistogramArr}
        selectedScene={selectedScene}
      />
    </Box>
  )
}

export default SceneLineChart
