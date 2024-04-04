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

const GlobalChart = ({ chartData }) => {
  const axisFontColor = useColorModeValue("#000", "#fff")
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 6,
  })

  return (
    <BoxWrapper colSpan={0}>
      <PlainBoxTitle name="Global Charts" description="" />
      <UniqueVisitor chartData={chartData} axisFontColor={axisFontColor} />
      <Box mb="8" />
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <ParcelVisited chartData={chartData} />
        <ScenesVisited chartData={chartData} />
      </Grid>
    </BoxWrapper>
  )
}

export default GlobalChart
