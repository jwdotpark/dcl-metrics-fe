import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import {
  getEndpoint,
  isDev,
  isLocal,
  isProd,
} from "../../../../lib/data/constant"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"

const GlobalUtilization = () => {
  // fetch utilization data
  const fetchUtilization = async () => {
    try {
      if (isProd) {
        const utilizationURL = getEndpoint("utilization")
        const response = await fetch(utilizationURL)
        const data = await response.json()
        console.log("data", data)
      } else if (isDev) {
        const utilizationURL = getEndpoint("utilization")
        const response = await fetch(utilizationURL)
        const data = await response.json()
        console.log("data", data)
      } else if (isLocal) {
        const utilizationURL = getEndpoint("utilization")
        const response = await fetch(utilizationURL)
        const data = await response.json()
        console.log("data", data)
      }
    } catch (error) {
      console.error("error", error)
    } finally {
      console.log("fetching finished")
    }
  }

  useEffect(() => {
    fetchUtilization()
  }, [])

  return (
    <Box mb="4">
      <BoxWrapper colSpan={0}>
        <PlainBoxTitle
          name="Global Utilization"
          description="Global utilization value description"
        />
        <Box m="4"></Box>
      </BoxWrapper>
    </Box>
  )
}

export default GlobalUtilization
