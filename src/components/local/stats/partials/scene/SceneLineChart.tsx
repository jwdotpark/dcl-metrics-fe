/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { useMemo } from "react"
import {
  Tooltip,
  Box,
  useColorModeValue,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react"
import { ResponsiveLine } from "@nivo/line"
import { SceneColor } from "../../../../../lib/hooks/utils"
import MultiLineChart from "../../../../../lib/MultiLineChart"

const SceneLineChart = ({ data, selectedScene }) => {
  const timeSpentHistogramArr = data.map((item) => item.time_spent_histogram)
  timeSpentHistogramArr.forEach((item, index) => {
    item.name = data[index].name
  })
  return (
    <Box h="300">
      <MultiLineChart
        res={timeSpentHistogramArr}
        selectedScene={selectedScene}
      />
    </Box>
  )
}

export default SceneLineChart
