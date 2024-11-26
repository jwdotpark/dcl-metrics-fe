import { Box, useColorModeValue } from "@chakra-ui/react"
import { Title } from "../../../../layout/global/grid/Title"
import WorldTable from "../../world/WorldTable"

export const WorldListGrid = ({ worldCurrentRes, pageSize = 9 }) => {
  const bg = useColorModeValue("gray.50", "gray.800")
  const borderColor = useColorModeValue("gray.300", "gray.600")

  return (
    <Box
      h="100%"
      p="4"
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      shadow="md"
      _hover={{
        shadow: useColorModeValue(
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        ),
        transition: "outline 3s ease-in-out",
      }}
      transition="box-shadow 0.5s ease-in-out"
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
