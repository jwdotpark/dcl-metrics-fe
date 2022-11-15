import {
  Flex,
  Text,
  Box,
  useColorModeValue,
  useBreakpointValue,
  Spacer,
  Spinner,
  Center,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import SceneMap from "./partials/scene/SceneMap"
import SceneLineChart from "./partials/scene/SceneLineChart"
import SceneSelector from "./partials/scene/SceneSelector"
import StatBox from "./partials/scene/SceneStatBox"
import SceneParcelsHeatmap from "./partials/scene/SceneParcelsHeatmap"
import SceneBarChart from "./partials/scene/SceneBarChart"
import SceneMarathonUsers from "./partials/scene/SceneMarathonUsers"
import moment from "moment"
import DatePicker from "./scenes/DatePicker"
import SceneUserLineChart from "./scenes/SceneUserLineChart"

const Scene = ({
  res,
  date,
  setDate,
  availableDate,
  isLoading,
  dailyUsers,
}) => {
  const [selectedScene, setSelectedScene] = useState(0)
  const {
    name,
    map_url,
    marathon_users,
    parcels_heatmap,
    visitors_by_hour_histogram,
  } = res[selectedScene]

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  })

  const box = {
    h: "100%",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const hasMultipleScenes = res.length > 1 ? true : false

  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    const visitorValue = res[selectedScene].visitors
    if (visitorValue === 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])

  const EmptyScene = () => {
    return (
      <Center
        h={["100px", "300px", "450px"]}
        bg={useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        shadow="md"
      >
        <Text m="4" fontSize={["md", "xl", "2xl", "3xl"]}>
          {name} had no visitors on {moment(date).format("MMMM D")}!
        </Text>
      </Center>
    )
  }

  return (
    <Box h="100%" mb="4" mx={[-4, 0]}>
      <GridBox box={box}>
        <Flex pos="relative" mx="5">
          <Flex direction={isMobile ? "column" : "row"} w="100%" mt="4">
            <Flex direction={["column", "row"]} w="100%">
              <Box>
                <Text fontSize={["md", "2xl"]}>
                  <b>{name}</b>
                </Text>
              </Box>
              <Spacer />
              {!hasMultipleScenes && !isLoading && (
                <Box>
                  <DatePicker
                    date={date}
                    setDate={setDate}
                    availableDate={availableDate}
                  />
                </Box>
              )}
              {isLoading && (
                <Box pt="4" pr="4">
                  <Spinner />
                </Box>
              )}
            </Flex>
            <Spacer />
          </Flex>
        </Flex>
        <Box ml="5" mx="6">
          {hasMultipleScenes && (
            <Text color="gray.500" fontSize={["xs", "sm"]}>
              Most populated scene in Decentraland on{" "}
              <i>
                {moment(res[selectedScene].date).format("dddd MMM. Do YYYY")}
              </i>
            </Text>
          )}
        </Box>
        {!hasMultipleScenes && (
          <Flex
            sx={{
              "& > * + *": {
                ml: [0, 0, 0, 4],
                mt: [4, 4, 4, 0],
              },
            }}
            direction={["column", "column", "column", "row"]}
            w="100%"
            h="auto"
            mb="4"
          >
            <Box w="100%" mb="2" p="4">
              {!isEmpty && <SceneUserLineChart data={dailyUsers} />}
            </Box>
          </Flex>
        )}
        <Box m="4">
          <Flex
            sx={{
              "& > * + *": {
                ml: [0, 0, 0, 4],
                mt: [4, 4, 4, 0],
              },
            }}
            direction={["column", "column", "column", "row"]}
            w="100%"
            h="auto"
            mb="4"
          >
            <Box w={["100%", "100%", "100%", "35%"]}>
              {hasMultipleScenes && (
                <Box mb="2">
                  <SceneSelector
                    res={res}
                    name={name}
                    selectedScene={selectedScene}
                    setSelectedScene={setSelectedScene}
                  />
                </Box>
              )}
              <SceneMap url={map_url} height={!hasMultipleScenes ? 450 : 405} />
            </Box>
            <Box
              w={["100%", "100%", "100%", "65%"]}
              h={["100%", "100%", "100%", "450px"]}
              mt={[4, 4, 4, 0]}
            >
              {isEmpty && <EmptyScene />}
              {!isEmpty && (
                <StatBox
                  data={res[selectedScene]}
                  selectedScene={selectedScene}
                />
              )}
            </Box>
          </Flex>
          <Flex
            sx={{
              "& > * + *": {
                ml: [0, 0, 0, 4],
                mt: [4, 4, 4, 0],
              },
            }}
            direction={["column", "column", "column", "row"]}
            w="100%"
            h="auto"
            mb="4"
          >
            <Box w={["100%", "100%", "100%", "35%"]}>
              {!isEmpty && (
                <SceneParcelsHeatmap
                  data={parcels_heatmap}
                  selectedScene={selectedScene}
                />
              )}
            </Box>
            <Box w={["100%", "100%", "100%", "65%"]} h="435px" mt={[4, 4, 0]}>
              {!isEmpty && (
                <SceneLineChart data={res} selectedScene={selectedScene} />
              )}
            </Box>
          </Flex>
          <Flex
            sx={{
              "& > * + *": {
                ml: [0, 0, 0, 4],
                mt: [4, 4, 4, 0],
              },
            }}
            direction={["column", "column", "column", "row"]}
            w="100%"
            h="auto"
          >
            <Box w={["100%", "100%", "100%", "50%"]} h="520" mt={[4, 4, 8, 0]}>
              {!isEmpty && <SceneMarathonUsers data={marathon_users} />}
            </Box>
            <Box
              w={["100%", "100%", "100%", "50%"]}
              h="520px"
              mb={[4, 4, 4, 0]}
            >
              {!isEmpty && (
                <SceneBarChart
                  visitors_by_hour_histogram={visitors_by_hour_histogram}
                  selectedScene={selectedScene}
                />
              )}
            </Box>
          </Flex>
        </Box>
      </GridBox>
    </Box>
  )
}

export default Scene
