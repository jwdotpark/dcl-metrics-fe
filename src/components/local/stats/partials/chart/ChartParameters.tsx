import { Box, Flex, Select } from "@chakra-ui/react"
import {
  availableProperties,
  transformToTitleCase,
  availableDateRanges,
} from "../../../../../lib/data/chart/chartHelper"
import ToolTip from "../../../../layout/local/ToolTip"

export const ChartParameters = ({ setOption }) => {
  return (
    <Flex direction="row" gap="4" w="100%" pb="4" px="6">
      <Box w="100%">
        <ToolTip label="Chart Parameter">
          <Select
            shadow="sm"
            onChange={(e) => {
              setOption((prevOption) => ({
                ...prevOption,
                metric: e.target.value,
              }))
            }}
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
            onChange={(e) => {
              setOption((prevOption) => ({
                ...prevOption,
                dateRange: Number(e.target.value),
              }))
            }}
            variant="filled"
          >
            {availableDateRanges.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            })}
          </Select>
        </ToolTip>
      </Box>
    </Flex>
  )
}
