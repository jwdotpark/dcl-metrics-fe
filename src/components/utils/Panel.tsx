import { Box, Center } from "@chakra-ui/react"
import { Rnd } from "react-rnd"
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
} from "recharts"

export const Panel = ({ profilingData }) => {
  // TODO
  // 1. use local storage to save the position of the panel
  // 2. add a control button for panel state
  // 3. fixed position tooltip
  // 4. add a reset button to reset the chart
  // 5. option panel to change the variable for chart
  // 6. setup a boundary for panel
  // 7. create handler for dragging
  // 8. create a snapshot feature
  // 9. add multi label section for monitored component
  // 10. make panel fixed position regardless of y position

  return (
    <Rnd
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0",
      }}
      default={{
        x: 500,
        y: 500,
        width: 500,
        height: 500,
      }}
    >
      <Box w="100%" h="100%" bg="gray.200" border="1px solid" shadow="xl">
        <Box w="100%" h="50px" bg="orange" border="1px">
          Handler
        </Box>
        <Center>Chart</Center>
        <Box w="100%" h="300px" mt="4">
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={profilingData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: "10px" }} />
              <YAxis
                scale="pow"
                domain={["auto", "auto"]}
                tick={{ fontSize: "10px" }}
              />
              <Legend />
              <Line
                animationDuration={0}
                type="linear"
                dataKey="actualDuration"
                stroke="red"
                strokeWidth="2px"
                dot={false}
              />
              <Line
                animationDuration={0}
                type="linear"
                dataKey="baseDuration"
                stroke="blue"
                strokeWidth="2px"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Rnd>
  )
}
