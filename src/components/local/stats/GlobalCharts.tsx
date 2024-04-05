/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Grid,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"
import { UniqueVisitor } from "./chart/UniqueVisitor"
import ParcelVisited from "./chart/ParcelVisited"
import ScenesVisited from "./chart/ScenesVisited"
import { useState } from "react"
import { OnlineUsers } from "./chart/OnlineUsers"

const GlobalChart = ({ chartData }) => {
  const axisFontColor = useColorModeValue("#000", "#fff")
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 6,
  })

  const [avg, setAvg] = useState({
    avgActiveParcels: 0,
    avgActiveScenes: 0,
    avgGuestUsers: 0,
    avgNamedUsers: 0,
    avgNewUsers: 0,
    avgUniqueUsers: 0,
  })

  return (
    <BoxWrapper colSpan={0}>
      <PlainBoxTitle name="Global Charts" description="" />
      <UniqueVisitor
        chartData={chartData}
        axisFontColor={axisFontColor}
        avg={avg}
        setAvg={setAvg}
      />
      <Box my="8" />
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <ParcelVisited chartData={chartData} avg={avg} setAvg={setAvg} />
        <ScenesVisited chartData={chartData} avg={avg} setAvg={setAvg} />
      </Grid>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <OnlineUsers />
      </Grid>
    </BoxWrapper>
  )
}

export default GlobalChart
