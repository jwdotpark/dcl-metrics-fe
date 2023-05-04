import { Flex, Text, Box, useColorModeValue, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SceneMap from "./partials/scene/SceneMap"
import SceneLineChart from "./partials/scene/SceneLineChart"
import SceneSelector from "./partials/scene/SceneSelector"
import StatBox from "./partials/scene/SceneStatBox"
import SceneParcelsHeatmap from "./partials/scene/SceneParcelsHeatmap"
import SceneBarChart from "./partials/scene/SceneBarChart"
import SceneMarathonUsers from "./partials/scene/SceneMarathonUsers"
import moment from "moment"
import SceneUserLineChart from "./scenes/SceneUserLineChart"
import BoxWrapper from "../../layout/local/BoxWrapper"
import SceneTitle from "../../layout/local/SceneTitle"

const Scene = ({ res, date, setDate, availableDate, dailyUsers, uuid }) => {
  const [selectedScene, setSelectedScene] = useState(0)
  const {
    map_url,
    name,
    marathon_users,
    parcels_heatmap,
    visitors_by_hour_histogram,
  } = res[selectedScene]

  // for private dashboard
  const hasMultipleScenes = res.length > 1 ? true : false
  const [isEmpty, setIsEmpty] = useState(false)
  const latest = moment(res[selectedScene].date)

  const EmptyScene = () => {
    return (
      <Center
        h={["100px", "300px", "450px"]}
        bg={useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        shadow="md"
      >
        <Text m="4" fontSize={["md", "xl", "2xl", "3xl"]}>
          {name && name} had no visitors on {moment(date).format("MMMM D")}!
        </Text>
      </Center>
    )
  }

  useEffect(() => {
    const visitorValue = res[selectedScene].visitors
    if (visitorValue === 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])

  return (
    <>
      <SceneTitle
        name={name}
        date={latest}
        dateForPicker={date}
        setDate={setDate}
        availableDate={availableDate}
        hasMultipleScenes={hasMultipleScenes}
        uuid={uuid}
        description={`Last update ${latest}`}
      />
      {/* main scene user chart on private dashboard */}
      {dailyUsers.length > 0 && (
        <SceneUserLineChart data={dailyUsers} name={name} />
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
              <SceneSelector
                res={res}
                name={name && name}
                selectedScene={selectedScene}
                setSelectedScene={setSelectedScene}
              />
            )}
            <SceneMap
              url={map_url}
              height={!hasMultipleScenes ? 450 : 405}
              name={name && name}
            />
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
          <Box w={["100%", "100%", "100%", "50%"]} h="520px" mb={[4, 4, 4, 0]}>
            {!isEmpty && (
              <SceneBarChart
                visitors_by_hour_histogram={visitors_by_hour_histogram}
                selectedScene={selectedScene}
              />
            )}
          </Box>
        </Flex>
      </Box>
    </>
    //  </Box>
    //</Box>
  )
}

export default Scene
