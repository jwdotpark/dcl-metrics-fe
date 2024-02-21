import { Box, Image } from "@chakra-ui/react"
import Link from "next/link"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import ToolTip from "../../../layout/local/ToolTip"

export const ImageBox = ({ event }) => {
  return (
    <BoxWrapper colSpan={[6, 6]}>
      <ToolTip label={`Jump in [${event.x},${event.y}]`}>
        <Box m="4" mb={[0, 4]}>
          <Link href={event.url} target="_blank">
            <Image borderRadius="xl" alt={event.name} src={event.image} />
          </Link>
        </Box>
      </ToolTip>
    </BoxWrapper>
  )
}
