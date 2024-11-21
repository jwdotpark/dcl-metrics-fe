import { Box, useColorModeValue } from "@chakra-ui/react"
import { Title } from "../../../../layout/global/grid/Title"
import WorldTable from "../../world/WorldTable"

export const WorldListGrid = ({ worldCurrentRes, pageSize = 9 }) => {
  const bg = useColorModeValue("gray.200", "gray.700")
  const borderColor = useColorModeValue("gray.300", "gray.800")

  return (
    <Box
      h="100%"
      p="4"
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      shadow="md"
    >
      <Title
        title={"World List"}
        description={
          "A list of Worlds currently deployed to Decentraland servers, click the thumbnail to jump in."
        }
      />
      {worldCurrentRes && (
        <WorldTable worldCurrentRes={worldCurrentRes} pageSize={pageSize} />
      )}
    </Box>
  )
}
