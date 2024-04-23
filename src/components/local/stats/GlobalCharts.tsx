/* eslint-disable react-hooks/rules-of-hooks */
import { Grid, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import { UniqueVisitor } from "./chart/UniqueVisitor"
import ParcelVisited from "./chart/ParcelVisited"
import ScenesVisited from "./chart/ScenesVisited"
import { useState } from "react"
import Inspector from "../../utils/Inspector"

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
    <Inspector id="Global Chart">
      <BoxWrapper colSpan={0}>
        <Grid
          gap={4}
          templateColumns={`repeat(${gridColumn}, 1fr)`}
          mt="-2"
          mb="-4"
        >
          <ParcelVisited chartData={chartData} avg={avg} setAvg={setAvg} />
          <ScenesVisited chartData={chartData} avg={avg} setAvg={setAvg} />
        </Grid>
        <UniqueVisitor
          chartData={chartData}
          axisFontColor={axisFontColor}
          avg={avg}
          setAvg={setAvg}
        />
      </BoxWrapper>
    </Inspector>
  )
}

export default GlobalChart
