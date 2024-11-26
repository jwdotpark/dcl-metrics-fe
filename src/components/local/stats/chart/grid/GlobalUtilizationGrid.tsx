import { Box, Center, useColorModeValue, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ReactSpeedometer from "react-d3-speedometer"
import { isLocal } from "../../../../../lib/data/constant"
import { GridItemContainer } from "../../../../layout/global/grid/GridItemContainer"
import { Title } from "../../../../layout/global/grid/Title"
import ToolTip from "../../../../layout/local/ToolTip"

export const GlobalUtilizationGrid = () => {
  const worldBaseUrl = "http://api.dcl-metrics.com/"
  const utilizationEndpoint = "utilization"

  const [utilizationData, setUtilizationData] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUtilizationData = async () => {
    const response = await fetch(
      `/api/fetch?url=${worldBaseUrl + utilizationEndpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.json()
  }

  const fetchClientData = async () => {
    setIsLoading(true)
    try {
      if (!isLocal) {
        const utilizationData = await fetchUtilizationData()
        setUtilizationData(
          Number(utilizationData.result.global_utilization.toFixed(2))
        )
      } else {
        const staticUtilizationData = 69
        setUtilizationData(staticUtilizationData)
      }
    } catch (error) {
      console.error("Error fetching data: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const needleColor = useColorModeValue("#CBD5E0", "#718096")

  useEffect(() => {
    fetchClientData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GridItemContainer>
      <ToolTip label={`${utilizationData}% Utilization`}>
        <>
          <Title
            title={"Global Utilization"}
            description={
              "Percentage of parcels with deployed content in Decentraland, regardless of activity."
            }
          />
          {isLoading ? (
            <Center h="200px">
              <Spinner />
            </Center>
          ) : (
            <Box>
              <Center h="100%">
                <ReactSpeedometer
                  height={100}
                  maxValue={100}
                  value={utilizationData}
                  needleColor={needleColor}
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
              <Center w="100%" mt="4">
                <Text fontSize="3xl" fontWeight="bold">
                  {utilizationData}%
                </Text>
              </Center>
            </Box>
          )}
        </>
      </ToolTip>
    </GridItemContainer>
  )
}
