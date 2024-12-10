import React, { useEffect, useState } from "react"
import {
  Box,
  Text,
  Flex,
  Spacer,
  useColorModeValue,
  Center,
} from "@chakra-ui/react"
import { Brush, XAxis, AreaChart, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import { chartDataAtom } from "../../../../../lib/state/dataIndex"
import { useAtom } from "jotai"
import { serifFont } from "../../../../../../pages/_app"

export const BrushGrid = ({ chartData }) => {
  // eslint-disable-next-line no-unused-vars
  const [slicedData, setSLicedData] = useAtom(chartDataAtom)
  const [dataIndex, setDataIndex] = useState({
    start: 0,
    end: chartData.length - 1,
  })

  const date = {
    start: chartData[dataIndex.start].date,
    end: chartData[dataIndex.end].date,
  }

  const sliceData = () => {
    return chartData.slice(dataIndex.start, dataIndex.end)
  }

  useEffect(() => {
    setSLicedData(sliceData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataIndex])

  return (
    <Box
      display={{
        base: "none",
        sm: "none",
        md: "block",
        lg: "block",
        xl: "block",
      }}
      h="100%"
      mx="2"
      p="4"
      bg={useColorModeValue("gray.50", "gray.800")}
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      shadow="md"
      rounded="xl"
    >
      <Flex
        direction="row"
        w="100%"
        px="2"
        fontFamily={serifFont.style.fontFamily}
      >
        <Center w="100%">
          <Box>
            <Text
              fontSize={["sm", "2xl"]}
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              {format(new Date(date.start), "yyyy MMMM d")}
            </Text>
          </Box>
          <Spacer />
          <Box
            w="100%"
            mx="4"
            borderColor={useColorModeValue("gray.400", "gray.500")}
            borderBottom="2px"
          />
          <Spacer />
          <Box>
            <Text
              fontSize={["sm", "2xl"]}
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              {format(new Date(date.end), "yyyy MMMM d")}
            </Text>
          </Box>
        </Center>
      </Flex>
      <ResponsiveContainer width="100%" height={30}>
        <AreaChart syncId="anyId" data={chartData}>
          <XAxis dataKey="date" hide={true} />
          <Brush
            dataKey="date"
            height={20}
            travellerWidth={12}
            stroke={useColorModeValue("#718096", "#EDF2F7")}
            fill={useColorModeValue("#EDF2F7", "#4A5568")}
            fillOpacity={0.5}
            tickFormatter={(tick) => {
              const date = new Date(tick)
              return format(date, "MM/dd")
            }}
            onChange={(e) => {
              setDataIndex({
                start: e.startIndex,
                end: e.endIndex,
              })
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
