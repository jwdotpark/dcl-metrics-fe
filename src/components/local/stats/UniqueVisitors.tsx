import dynamic from "next/dynamic"
import { Text, Box, GridItem } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/unique-visitors.json"
import LineChartComponent from "../../chart/LineChartComponent"
import { fetchResult } from "../../../lib/hooks/fetch"

const UniqueVisitors = ({ isLoading, setIsLoading }) => {
  const [res, setRes] = useState([])

  const box = {
    h: "500",
    w: "100%",
    bg: "white",
  }

  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsLoading(true)
      const url = "api/fetch/unique-visitors"
      fetchResult(url, setRes)
      setIsLoading(false)
    }, [isLoading, setIsLoading])
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsLoading(true)
      // @ts-ignore
      setRes(staticData)
      setIsLoading(false)
    }, [setIsLoading])
  }

  // NOTE from API
  // useEffect(() => {
  //   setIsLoading(true)
  //   const url = "api/fetch/unique-visitors"
  //   fetchResult(url, setRes)
  //   setIsLoading(false)
  // }, [isLoading, setIsLoading])

  // // json
  // useEffect(() => {
  //   setIsLoading(true)
  //   // @ts-ignore
  //   setRes(staticData)
  //   setIsLoading(false)
  // }, [setIsLoading])

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
