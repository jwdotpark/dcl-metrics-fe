import {
  Box,
  VStack,
  Flex,
  Spacer,
  Switch,
  useColorModeValue,
  Select,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { lineChartAtom } from "../../lib/state/lineChartState"

const SettingsMenu = () => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const chartState = JSON.parse(localStorage.getItem("chart") || "{}")

  useEffect(() => {
    localStorage.setItem("chart", JSON.stringify(chartProps))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <VStack align="stretch" fontSize="sm" spacing={-2}>
      <Flex h="40px">
        <Box>Enable Area</Box>
        <Spacer />
        <Switch
          colorScheme={useColorModeValue("teal", "green")}
          isChecked={chartState.toggleArea}
          onChange={() => {
            setChartProps((prev) => ({
              ...prev,
              toggleArea: !prev.toggleArea,
            }))
          }}
          size="md"
        />
      </Flex>
      <Flex h="40px">
        <Box>Enable Average Marker</Box>
        <Spacer />
        <Switch
          colorScheme={useColorModeValue("teal", "green")}
          isChecked={chartState.toggleMarker}
          onChange={() => {
            setChartProps((prev) => ({
              ...prev,
              toggleMarker: !prev.toggleMarker,
            }))
          }}
          size="md"
        />
      </Flex>
      <Flex h="40px">
        <Box>Chart Height</Box>
        <Spacer />
        <Switch
          colorScheme={useColorModeValue("teal", "green")}
          id="area"
          isChecked={chartState.height !== 350}
          onChange={() => {
            setChartProps((prev) => ({
              ...prev,
              height: prev.height === 350 ? 700 : 350,
            }))
          }}
          size="md"
        />
      </Flex>
      <Flex>
        <Box>Chart Curve Type</Box>
        <Spacer />
        <Select
          w="100px"
          fontWeight="semibold"
          bg={useColorModeValue("gray.200", "gray.600")}
          border={useColorModeValue("gray.100", "gray.500")}
          borderRadius="xl"
          onClick={(e) => {
            setChartProps((prev) => ({
              ...prev,
              curveType: (e.target as HTMLInputElement).value,
            }))
          }}
          size="xs"
          variant="solid"
        >
          <option value={chartState.curveType}>
            {String(chartState.curveType).charAt(0).toUpperCase() +
              String(chartState.curveType).slice(1)}
          </option>
          <option value="linear">Linear</option>
          <option value="basis">Basis</option>
          <option value="cardinal">Cardianal</option>
          <option value="natural">Natural</option>
          <option value="step">Step</option>
          <option value="stepAfter">Step After</option>
          <option value="stepBefore">Step Before</option>
        </Select>
      </Flex>
    </VStack>
  )
}

export default SettingsMenu
