import { Box } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"

const AvgStatBox = () => {
  return (
    <Box>
      <BoxWrapper colSpan={6}>
        <Box h={["auto", "auto", "auto", "auto", 400]} p="4">
          avg stag box
        </Box>
      </BoxWrapper>
    </Box>
  )
}

export default AvgStatBox
