import { Text, GridItem, Center } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import ReactSpeedometer from "react-d3-speedometer"
import ToolTip from "../../../layout/local/ToolTip"

const GlobalUtilization = ({ utilizationData }) => {
  const segmentValueFormatter = (value) => {
    if (value < 20) {
      return `${value}`
    }
    if (value < 40) {
      return `${value}`
    }
    return `${value}`
  }
  return (
    <BoxWrapper colSpan={2}>
      <ToolTip label={`${utilizationData}% Utilization`}>
        <GridItem overflowY="hidden" w="100%" h="100%" colSpan={[6, 3]}>
          <PlainBoxTitle
            name="Global Utilization"
            description="Global utilization value description"
          />
          <Center h="180px" mt="16">
            <ReactSpeedometer
              height={200}
              maxValue={100}
              value={utilizationData}
              needleColor="black"
              startColor="red"
              endColor="green"
              segments={5}
              forceRender={true}
              needleTransitionDuration={1000}
              fluidWidth={false}
              segmentValueFormatter={segmentValueFormatter}
              paddingHorizontal={34}
              paddingVertical={34}
              currentValueText=""
              ringWidth={50}
              needleHeightRatio={0.75}
            />
          </Center>
          <Center w="100%">
            <Text fontSize="2xl" fontWeight="bold">
              {utilizationData}%
            </Text>
          </Center>
        </GridItem>
      </ToolTip>
    </BoxWrapper>
  )
}

export default GlobalUtilization
