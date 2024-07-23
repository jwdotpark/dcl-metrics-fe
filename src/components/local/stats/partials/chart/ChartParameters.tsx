import { Box, Button, Flex, Select } from "@chakra-ui/react"
import { FiChevronsDown, FiChevronsUp, FiRefreshCcw } from "react-icons/fi"
import {
  availableProperties,
  transformToTitleCase,
  availableDateRanges,
} from "../../../../../lib/data/chart/chartHelper"
import ToolTip from "../../../../layout/local/ToolTip"

export const ChartParameters = ({
  option,
  setOption,
  chartHeight,
  setChartHeight,
  resetVisibleLines,
}) => {
  return (
    <Flex direction="row" gap="4" w="100%" pb="4" px="4">
      <Box w="100%">
        <ToolTip label="Chart Parameter">
          <Select
            shadow="sm"
            defaultValue={availableProperties[0]}
            onChange={(e) => {
              setOption((prevOption) => ({
                ...prevOption,
                metric: e.target.value,
              }))
            }}
            size="sm"
            variant="filled"
          >
            {availableProperties.map((item) => {
              return (
                <option key={item} value={item}>
                  {transformToTitleCase(item)}
                </option>
              )
            })}
          </Select>
        </ToolTip>
      </Box>
      <Box w="100%">
        <ToolTip label="Date Range from Today">
          <Select
            shadow="sm"
            defaultValue={option.dateRange}
            onChange={(e) => {
              setOption((prevOption) => ({
                ...prevOption,
                dateRange: Number(e.target.value),
              }))
            }}
            size="sm"
            variant="filled"
          >
            {availableDateRanges.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}d
                </option>
              )
            })}
          </Select>
        </ToolTip>
      </Box>
      <Box>
        <ToolTip label="Reset Legend Items Visibility">
          <Button
            shadow="sm"
            onClick={() => {
              resetVisibleLines()
            }}
            size="sm"
          >
            <FiRefreshCcw />
          </Button>
        </ToolTip>
      </Box>
      <Box>
        <ToolTip label="Change Chart Height">
          <Button
            shadow="sm"
            onClick={() => {
              if (chartHeight === 350) {
                setChartHeight(700)
              } else {
                setChartHeight(350)
              }
            }}
            size="sm"
          >
            {chartHeight === 350 ? <FiChevronsDown /> : <FiChevronsUp />}
          </Button>
        </ToolTip>
      </Box>
    </Flex>
  )
}
