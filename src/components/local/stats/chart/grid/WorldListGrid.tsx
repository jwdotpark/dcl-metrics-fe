import { Box, useColorModeValue } from "@chakra-ui/react"
import { Title } from "../../../../layout/global/grid/Title"
import WorldTable from "../../world/WorldTable"

export const WorldListGrid = ({ worldCurrentRes, pageSize = 9 }) => {
  const bg = useColorModeValue("gray.50", "gray.800")
  const borderColor = useColorModeValue("gray.300", "gray.600")

  console.log("worldCurrentRes", worldCurrentRes)

  return (
    <Box
      h="100%"
      p="4"
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      shadow="md"
      rounded="xl"
    >
      <Title
        title={"World List"}
        description={
          "A list of Worlds currently deployed to Decentraland servers, click the thumbnail to jump in."
        }
      />
      {Object.keys(worldCurrentRes).length !== 0 && (
        <WorldTable worldCurrentRes={worldCurrentRes} pageSize={pageSize} />
      )}
    </Box>
  )
}
