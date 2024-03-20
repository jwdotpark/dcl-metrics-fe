import { Box, Center, Flex } from "@chakra-ui/react"
import { format } from "date-fns"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import SceneBarChart from "../../stats/partials/scene/SceneBarChart"
import SceneLineChart from "../../stats/partials/scene/SceneLineChart"
import SceneMap from "../../stats/partials/scene/SceneMap"
import SceneMarathonUsers from "../../stats/partials/scene/SceneMarathonUsers"
import SceneParcelsHeatmap from "../../stats/partials/scene/SceneParcelsHeatmap"
import { EventStatBox } from "./EventStatBox"

export const EnrichedData = ({ event, eventData, sceneData }) => {
  console.log(sceneData.uuid)

  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`${event.name} information on ${
          eventData.date
            ? format(new Date(eventData.date), "yyyy MMMM d")
            : format(new Date(event.next_start_at), "yyyy MMMM d")
        }`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      {sceneData.uuid ? (
        <Box m="4">
          <Flex direction={["column", "row"]} w="100%">
            <Box w={["100%", "30%"]} mr={[0, 4]} mb={[4, 0]}>
              <SceneMap
                height="100%"
                url={sceneData.map_url}
                name={sceneData.name ? sceneData.name : "N/A"}
              />
            </Box>
            <Box w={["100%", "70%"]}>
              <EventStatBox
                data={sceneData}
                selectedScene={0}
                date={undefined}
              />
            </Box>
          </Flex>
          <Flex direction={["column", "row"]} mt="4">
            <Box w={["100%", "30%"]} mr={[0, 4]} mb={[2, 0]}>
              <SceneParcelsHeatmap
                data={sceneData.parcels_heatmap}
                selectedScene={0}
              />
            </Box>
            <Box w={["100%", "70%"]}>
              <SceneLineChart data={[sceneData]} selectedScene={0} />
            </Box>
          </Flex>
          <Flex direction={["column", "row"]} mt="4">
            <Box w={["100%", "60%"]} mr={[0, 4]}>
              <SceneMarathonUsers data={sceneData.marathon_users} />
            </Box>
            <Box w={["100%", "40%"]}>
              <SceneBarChart
                visitors_by_hour_histogram={
                  sceneData.visitors_by_hour_histogram
                }
                selectedScene={0}
              />
            </Box>
          </Flex>
        </Box>
      ) : (
        <Center h="100px">No enriched Data</Center>
      )}
    </BoxWrapper>
  )
}
