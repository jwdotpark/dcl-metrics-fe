/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import EventCard from "./EventCard"

const EventCardGrid = ({ data }) => {
  const gridCol = useBreakpointValue({ base: "1", md: "3", lg: "4", xl: "5" })
  const gridHeight = useBreakpointValue({ base: "auto", md: "450px" })

  return (
    <Box m="2">
      <Grid gap={4} templateColumns={`repeat(${gridCol}, 1fr)`}>
        {data.map((event) => {
          return (
            <GridItem
              key={event.id}
              overflow="clip"
              overflowX="hidden"
              w="100%"
              h={gridHeight}
              pb="4"
              bg={useColorModeValue("gray.100", "gray.700")}
              border="1px solid"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              borderRadius="xl"
              shadow="sm"
              _hover={{
                shadow: useColorModeValue(
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                ),
                transition:
                  "box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out",
                bg: useColorModeValue("gray.200", "gray.900"),
              }}
              transition="box-shadow 0.1s ease-in-out"
            >
              <EventCard event={event} />
            </GridItem>
          )
        })}
      </Grid>
    </Box>
  )
}

export default EventCardGrid
