import {
  useColorModeValue,
  Box,
  Center,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react"
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
import { FiXCircle } from "react-icons/fi"
import { useState, useEffect } from "react"

export const Panel = ({ profilingData, setOpen }) => {
  // TODO
  // 2. add a control button for panel state
  // 4. add a reset button to reset the chart
  // 5. option panel to change the variable for chart
  // 7. create handler for dragging
  // 8. create a snapshot feature
  // 9. add multi label section for monitored component
  // 10. make panel fixed position regardless of y position
  const [defaultPosition, setDefaultPosition] = useState({
    x: 0,
    y: 0,
    width: 800,
    height: 500,
  })

  useEffect(() => {
    const x = window.innerWidth / 2 - defaultPosition.width / 2
    const y = window.innerHeight / 2 - defaultPosition.height / 2
    setDefaultPosition({ ...defaultPosition, x, y })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        zIndex: 999999,
        boxShadow: "0 0 5px rgba(0,0,0,0.4)",
      }}
      aspectRatio={8 / 5}
      bounds="body"
      dragHandleClassName="handler"
      default={{
        x: -800,
        y: 100,
        width: 800,
        height: 500,
      }}
      minWidth={700}
      minHeight={400}
    >
      <Box
        w="100%"
        h="100%"
        bg={useColorModeValue("gray.100", "gray.700")}
        shadow="xl"
      >
        <Flex
          className="handler"
          direction="row"
          w="100%"
          h="50px"
          bg={useColorModeValue("gray.500", "gray.900")}
          _hover={{ cursor: "grab" }}
        >
          <Center h="100%" mx="4">
            Handler
          </Center>
          <Spacer />
          <Center w="4rem" h="100%">
            <IconButton
              bg={useColorModeValue("gray.400", "gray.200")}
              borderRadius="full"
              shadow="sm"
              aria-label={"close"}
              icon={<FiXCircle size="100%" />}
              onClick={() => setOpen(false)}
              size="xs"
            />
          </Center>
        </Flex>
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
