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

export const Panel = ({ profilingData, setOpen }) => {
  const defaultPosition = {
    x: window.innerWidth / 5,
    y: window.innerHeight / 5,
    width: 400,
    height: 800,
  }

  const getUniqueIds = (data) => {
    const ids = data.map((item) => item.id)
    return [...new Set(ids)]
  }

  const uniqueIds = getUniqueIds(profilingData).sort()

  const filteredData = uniqueIds.map((id) => {
    return profilingData.filter((item) => item.id === id)
  })

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
      default={defaultPosition}
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
