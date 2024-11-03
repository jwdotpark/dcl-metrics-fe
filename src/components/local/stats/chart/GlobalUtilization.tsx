import {
  Text,
  GridItem,
  Center,
  useColorModeValue,
  Box,
  Spinner,
} from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import ToolTip from "../../../layout/local/ToolTip"
//import ReactSpeedometer from "react-d3-speedometer"
import dynamic from "next/dynamic"
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
})

const GlobalUtilization = ({ utilizationData, isLoading }) => {
  return (
    <BoxWrapper colSpan={2}>
      <ToolTip label={`${utilizationData}% Utilization`}>
        <GridItem overflowY="hidden" w="100%" h="100%" colSpan={[6, 3]}>
          <PlainBoxTitle
            name="Global Utilization"
            description="Percentage of parcels with deployed content in Decentraland, regardless of activity"
          />
          {!isLoading ? (
            <Box>
              <Center h="180px" mt="16">
                <ReactSpeedometer
                  height={200}
                  maxValue={100}
                  value={utilizationData}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  needleColor={useColorModeValue("#718096", "#CBD5E0")}
                  startColor="red"
                  endColor="green"
                  segments={5}
                  forceRender={true}
                  needleTransitionDuration={1000}
                  paddingHorizontal={34}
                  paddingVertical={34}
                  currentValueText=""
                  ringWidth={50}
                  needleHeightRatio={0.75}
                />
              </Center>
              <Center w="100%" mb="4">
                <Text fontSize="2xl" fontWeight="bold">
                  {utilizationData}%
                </Text>
              </Center>
            </Box>
          ) : (
            <Center h="280px">
              <Spinner />
            </Center>
          )}
        </GridItem>
      </ToolTip>
    </BoxWrapper>
  )
}

export default GlobalUtilization
