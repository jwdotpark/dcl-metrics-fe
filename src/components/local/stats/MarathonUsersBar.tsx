import { Box, Center, Select, Text, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import BarChartComponent from "../../chart/BarChartComponent"

const MarathonUsersBar = ({ res, isLoading }) => {
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }
  const data = Object.entries(res)

  const dataArr = []
  for (let i = 0; i < data.length; i++) {
    //  @ts-ignore
    for (let j = 0; j < data[i][1].length; j++) {
      dataArr.push({
        date: data[i][0],
        timeSpent: data[i][1][j].time_spent,
        address: data[i][1][j].address,
      })
    }
  }

  dataArr.sort((a, b) => {
    return b.timeSpent - a.timeSpent
  })

  const marathonUserData = dataArr.slice(0, 10)

  const marathonUserDataNoDate = marathonUserData
    .map((data) => {
      return {
        time_spent: data.timeSpent,
        address: data.address,
      }
    })
    .sort((a, b) => {
      return b.time_spent - a.time_spent
    })
    .slice(0, 10)

  return (
    <GridBox box={box}>
      <Box position="relative" mt="4">
        <Box>
          <Box>
            <Text fontSize="xl" mb="1" ml="5">
              <b>Marathon Users</b>
              <Text fontSize="sm" color="gray.500">
                Users with most online time in the last 7 days
              </Text>
            </Text>
          </Box>
        </Box>

        {data.length > 0 && !isLoading ? (
          <Box>
            <BarChartComponent data={marathonUserDataNoDate} />
            {/* <Box mx="6">
              <DateSelector />
            </Box> */}
          </Box>
        ) : (
          <Center h={box.h}>
            <Loading />
          </Center>
        )}
      </Box>
    </GridBox>
  )
}

export default MarathonUsersBar
