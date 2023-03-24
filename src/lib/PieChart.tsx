import {
  Box,
  Text,
  useColorModeValue,
  useColorMode,
  Center,
} from "@chakra-ui/react"
import { ResponsivePie } from "@nivo/pie"
import { chartHeight } from "./data/chartInfo"
import { lineChartAtom } from "./state/lineChartState"
import { useAtom } from "jotai"

const PieChart = ({ data }) => {
  const { colorMode } = useColorMode()
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  return (
    <Box h={chartProps.height + 47}>
      <ResponsivePie
        data={data}
        colors={{ scheme: "pastel1" }}
        margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={1.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={3}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.5]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={useColorModeValue("#000", "#fff")}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 20,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: colorMode === "light" ? "#000" : "#fff",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: useColorModeValue("#000", "#fff"),
                },
              },
            ],
          },
        ]}
        tooltip={({ datum: { id, value } }) => (
          <Box
            sx={{ backdropFilter: "blur(5px)" }}
            p="2"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={useColorModeValue("whiteAlpha.700", "blackAlpha.500")}
            borderRadius="xl"
            shadow="md"
          >
            <Center w="100%">
              <Text display="inline-blocks" fontSize="sm">
                Total {id}
              </Text>
            </Center>
            <Center w="100%">
              <Text>
                <b>{value}</b>
              </Text>
            </Center>
          </Box>
        )}
        theme={{
          tooltip: {
            container: {
              //background: "#333",
            },
          },
        }}
      />
    </Box>
  )
}

export default PieChart
