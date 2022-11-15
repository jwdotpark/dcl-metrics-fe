import { useState } from "react"
import { GridItem, useColorModeValue } from "@chakra-ui/react"
import LineChart from "../../../../lib/LineChart"
// import tempData from "../../../../../public/data/cached_ups_store.json"

const SceneUserLineChart = ({ data }) => {
  // const userData = tempData && Object.entries(tempData.daily_users)
  const userData = data && Object.entries(data)
  const chartData = []
  userData.map((item) => {
    chartData.push({
      date: item[0],
      users: item[1],
    })
  })
  const color = "rgba(80, 150, 123)"
  const result = [
    {
      id: "Unique Users",
      color: "hsl(90, 70%, 50%)",
      data: chartData.map((item) => ({
        x: item.date,
        y: item.users,
      })),
    },
  ]

  return (
    <GridItem
      w="100%"
      h="350"
      p="2"
      bg={useColorModeValue("gray.100", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <LineChart data={result} color={color} />
    </GridItem>
  )
}

export default SceneUserLineChart
