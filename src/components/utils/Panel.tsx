import { Text, useColorModeValue, Box, Center } from "@chakra-ui/react"
import { useMemo } from "react"
import { Rnd } from "react-rnd"
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts"
import { PanelHeader } from "./panel/PanelHeader"
import { PanelLegend } from "./panel/PanelLegend"

export const Panel = ({ profilingData, setOpen }) => {
  const defaultPosition = {
    x: -800,
    y: 0,
    width: 400,
    height: 800,
  }

  const tickColor = useColorModeValue("#000", "#fff")

  const uniqueIds = useMemo(() => {
    const ids = profilingData.map((item) => item.id)
    return [...new Set(ids)].sort()
  }, [profilingData])

  const filteredData = useMemo(() => {
    return uniqueIds.map((id) => {
      return profilingData.filter((item) => item.id === id)
    })
  }, [uniqueIds, profilingData])

  return (
    <Rnd
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
        border: "1px solid",
        borderColor: "#A0AEC0",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 999998,
        boxShadow: "0 0 5px rgba(0,0,0,0.4)",
      }}
      bounds="body"
      dragHandleClassName="handler"
      default={defaultPosition}
      minWidth={300}
      minHeight={400}
    >
      <Box
        w="100%"
        h="100%"
        bg={useColorModeValue("gray.100", "gray.800")}
        shadow="xl"
      >
        <PanelHeader setOpen={setOpen} />
        <Box overflowY="auto" w="100%" h="100%" mt="4">
          {filteredData.map((data, index) => {
            return (
              <Box key={index} w="100%" h="200px">
                <Center>
                  <Text fontWeight="bold">
                    {(uniqueIds[index] as string).toUpperCase()}
                  </Text>
                </Center>
                <ResponsiveContainer key={index} width="100%" height="80%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 20,
                      right: 50,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                    {/*<Legend />*/}
                    <XAxis
                      dataKey="startTime"
                      tick={{ fontSize: "10px", fill: tickColor }}
                    />
                    <YAxis
                      scale="pow"
                      domain={["auto", "auto"]}
                      tick={{ fontSize: "10px", fill: tickColor }}
                    />
                    <Line
                      animationDuration={0}
                      type="linear"
                      dataKey="actualDuration"
                      stroke="#FF5555"
                      strokeWidth="2px"
                      dot={false}
                    />
                    <Line
                      animationDuration={0}
                      type="linear"
                      dataKey="baseDuration"
                      stroke="#BD93F9"
                      strokeWidth="2px"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )
          })}
          <PanelLegend />
        </Box>
      </Box>
    </Rnd>
  )
}
