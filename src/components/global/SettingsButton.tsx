import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Switch,
  Spacer,
  Flex,
  useColorModeValue,
  Select,
  VStack,
} from "@chakra-ui/react"
import { FiSettings } from "react-icons/fi"
import { lineChartAtom } from "../../lib/state/lineChartState"
import { useAtom } from "jotai"

const SettingsButton = () => {
  return (
    <>
      <Popover placement="bottom-start" variant="responsive">
        <PopoverTrigger>
          <Button size="lg" variant="link">
            <FiSettings />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          bg={useColorModeValue("white", "gray.700")}
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <PopoverArrow />
          <PopoverBody m="2">
            <SettingsMenu />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default SettingsButton

const SettingsMenu = () => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const chartState = JSON.parse(localStorage.getItem("chart") || "{}")

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
