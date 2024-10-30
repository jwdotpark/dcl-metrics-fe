import { Box } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"

const GlobalUtilization = () => {
  return (
    <Box mb="4">
      <BoxWrapper colSpan={0}>
        <PlainBoxTitle
          name="Global Utilization"
          description="Global utilization value description"
        />
        <Box m="4">test</Box>
      </BoxWrapper>
    </Box>
  )
}

export default GlobalUtilization
