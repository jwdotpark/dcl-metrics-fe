/* eslint-disable react-hooks/rules-of-hooks */
import { useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"
import { UniqueVisitor } from "./chart/UniqueVisitor"
import ParcelVisited from "./chart/ParcelVisited"

const GlobalChart = ({ chartData }) => {
  const axisFontColor = useColorModeValue("#000", "#fff")

  return (
    <BoxWrapper colSpan={0}>
      <PlainBoxTitle name="Global Charts" description="" />
      <UniqueVisitor chartData={chartData} axisFontColor={axisFontColor} />
      <ParcelVisited chartData={chartData} />
    </BoxWrapper>
  )
}

export default GlobalChart
