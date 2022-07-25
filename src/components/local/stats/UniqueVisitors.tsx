import dynamic from "next/dynamic"
import { Text, Box, GridItem } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/unique-visitors.json"
import LineChartComponent from "../../chart/LineChartComponent"

const UniqueVisitors = ({ isLoading, setIsLoading }) => {
  const [res, setRes] = useState([])

  const box = {
    h: "500",
    w: "100%",
    bg: "white",
  }

  // // NOTE from API
  // useEffect(() => {
  //   setIsLoading(true)
  //   const url = "api/fetch/daily-user-timespent"
  //   fetchResult(url, setRes)
  //   setIsLoading(false)
  // }, [isLoading, setIsLoading])

  // // json
  useEffect(() => {
    setIsLoading(true)
    // @ts-ignore
    setRes(staticData)
    setIsLoading(false)
  }, [setIsLoading])

  return (
    <>
      <GridBox box={box}>
        <Box position="relative" mt="4" mx="5">
          <Text fontSize="xl">
            <b>Unique Visitors </b>
          </Text>
        </Box>

        <LineChartComponent box={box} res={res} />
      </GridBox>
    </>
  )
}

export default UniqueVisitors
