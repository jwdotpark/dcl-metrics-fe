/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import {
  ButtonGroup,
  Button,
  Box,
  Flex,
  Center,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react"
import SceneBarChart from "../../stats/partials/scene/SceneBarChart"
import SceneLineChart from "../../stats/partials/scene/SceneLineChart"
import SceneMap from "../../stats/partials/scene/SceneMap"
import SceneMarathonUsers from "../../stats/partials/scene/SceneMarathonUsers"
import SceneParcelsHeatmap from "../../stats/partials/scene/SceneParcelsHeatmap"
import { EventStatBox } from "./EventStatBox"
import { getEndpoint } from "../../../../lib/data/constant"
import { SceneDataType } from "../../../../lib/types/SceneData"
import { format } from "date-fns"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { isMobile } from "../../../../lib/hooks/utils"
import { Details } from "./Details"

export const EventRelatedEvent = ({ event, data, itemsPerPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [sceneData, setSceneData] = useState<SceneDataType>()

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const generatePageNumbers = () => {
    let pages = []
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, 4)
    }

    if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const fetchSceneData = async (scene_uuid: string, date: string) => {
    setIsLoading(true)
    try {
      const url = getEndpoint(`scenes/${scene_uuid}?date=${date}`)
      const sceneData = await fetch("/api/fetch?url=" + url, {
        method: "GET",
        cache: "default",
      })
      const data = await sceneData.json()
      const { result } = data
      if (result.scene_uuid) {
        fetchSceneData(result.scene_uuid, result.date)
      }
      setSceneData(result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    fetchSceneData(data[pageNumber - 1].scene_uuid, data[pageNumber - 1].date)
  }

  const firstValidScene = data.find((item) => item.scene_uuid)
  const firstValidSceneIndex = data.indexOf(firstValidScene)

  useEffect(() => {
    if (firstValidScene) {
      fetchSceneData(firstValidScene.scene_uuid, firstValidScene.date)
      setCurrentPage(firstValidSceneIndex + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <Center mt="-4">
        <ButtonGroup mt={4} borderRadius="xl" shadow="md" isAttached={true}>
          <Button
            disabled={currentPage === 1}
            onClick={() => handleClick(currentPage > 1 ? currentPage - 1 : 1)}
            size={["xs", "sm"]}
          >
            <FiArrowLeftCircle />
          </Button>
          {generatePageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              color={
                data[pageNumber - 1].scene_uuid
                  ? useColorModeValue("#000", "#fff")
                  : useColorModeValue("gray.400", "gray.600")
              }
              fontSize={["xs", "sm"]}
              onClick={() => handleClick(pageNumber)}
              size={["xs", "sm"]}
              variant={currentPage === pageNumber ? "solid" : "outline"}
            >
              {format(
                new Date(data[pageNumber - 1].date),
                isMobile() ? "MM/dd" : "MMM d, yyyy"
              )}
            </Button>
          ))}
          <Button
            disabled={currentPage === totalPages}
            onClick={() =>
              handleClick(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            size={["xs", "sm"]}
          >
            <FiArrowRightCircle />
          </Button>
        </ButtonGroup>
      </Center>

      {isLoading && (
        <Center h="400px">
          <Spinner />
        </Center>
      )}

      {sceneData && sceneData.uuid && !isLoading ? (
        <Box m="4">
          <Flex direction={["column", "row"]} mt="4" mb={[0, 4]}>
            <Box w={["100%", "30%"]} mr="4" mb={[4, 0]}>
              <Details event={event} sceneData={sceneData} />
            </Box>
            <Box w={["100%", "40%"]} mr={[0, 4]} mb={[2, 0]}>
              <SceneParcelsHeatmap
                data={sceneData.parcels_heatmap}
                selectedScene={0}
              />
            </Box>

            <Box w={["100%", "60%"]} h="100%">
              <SceneLineChart data={[sceneData]} selectedScene={0} />
            </Box>
          </Flex>
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
            {/*<Box w={["100%", "60%"]} mr={[0, 4]} mb={[2, 0]}>
              <SceneMarathonUsers data={sceneData.marathon_users} />
            </Box>*/}
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
        <Center h="150px">Data not available for this date yet.</Center>
      )}
    </Box>
  )
}
