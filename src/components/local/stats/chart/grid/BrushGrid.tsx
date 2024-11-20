import React, { useState } from "react"
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

export const BrushGrid = ({ chartData }) => {
  const [dataIndex, setDataIndex] = useState({
    start: 0,
    end: 0,
  })

  const date = {
    start: chartData[dataIndex.start].date,
    end: chartData[dataIndex.end].date,
  }

  return (
    <Box
      mx="10px"
      p="4"
      bg={useColorModeValue("gray.200", "gray.700")}
      border="1px"
      borderColor={useColorModeValue("gray.300", "gray.900")}
      //shadow="md"
      shadow="md"
    >
      <Flex direction="row" w="100%" px="2">
        <Center w="100%">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" whiteSpace="nowrap">
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
            <Text fontSize="2xl" fontWeight="bold" whiteSpace="nowrap">
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
