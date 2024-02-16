import { Flex, Box, Image } from "@chakra-ui/react"
import Link from "next/link"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import ToolTip from "../../../layout/local/ToolTip"

export const ImageBox = ({ event }) => {
  return (
    <BoxWrapper colSpan={[4, 4, 4, 4, 3]}>
      <Flex>
        <ToolTip label={`Jump in [${event.x},${event.y}]`}>
          <Link href={event.url} target="_blank">
            <Box p="2">
              <Image borderRadius="xl" alt={event.name} src={event.image} />
            </Box>
          </Link>
        </ToolTip>
      </Flex>
    </BoxWrapper>
  )
}
