import { Box } from "@chakra-ui/react"
import { TimeSpentHistogram } from "./TimeSpentHistogram"

const SceneLineChart = ({ data }) => {
  const timeSpentHistogramArr = data.map((item) => item.time_spent_histogram)
  timeSpentHistogramArr.forEach((item, index) => {
    item.name = data[index].name
  })

  const histogramData = data[0].time_spent_histogram

  const mutateData = (histogramData) => {
    const data = histogramData.map((item) => ({
      time: item[0],
      users: item[1],
    }))
    return data
  }

  return (
    <Box h="100%" mb={[4, 0]}>
      <TimeSpentHistogram data={mutateData(histogramData)} />
    </Box>
  )
}

export default SceneLineChart
