import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserTopScenes from "../../../../../public/data/staticUserTopScenes.json"
import { useState, useEffect } from "react"
import { isProd, isDev } from "../../../../lib/data/constant"
import {
  Text,
  Image,
  Center,
  Spinner,
  Box,
  useColorModeValue,
  Link,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"
import { convertSeconds, mutateStringToURL } from "../../../../lib/hooks/utils"

const UserTopScenes = ({ address, userAddressRes }) => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const topScenesUrl = `https://api.dcl-metrics.com/users/${address}/activity/top_scenes`

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      if (isProd) {
        const url = `/api/server-fetch?url=${topScenesUrl}&address=${address}&endpoint=${address}/activity/top_scenes/`
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isDev) {
        const url = `/api/server-fetch?url=${topScenesUrl}&address=${address}&endpoint=${address}/activity/top_scenes/`
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else {
        setData(staticUserTopScenes)
      }
    }
    fetchData()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const UserSceneTable = () => {
    return (
      <Box mx="4">
        <Box mb="2" fontSize="sm">
          {data.map((item, i) => {
            return (
              <Link
                key={item.scene_uuid}
                href={`/scenes/${mutateStringToURL(item.scene_name)}/${
                  item.scene_uuid
                }`}
                target="_blank"
              >
                <Flex
                  direction="row"
                  px="4"
                  py="2"
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
                >
                  <Center mr="4">{i + 1}.</Center>
                  <Center>
                    <Box>
                      <Image
                        w={[100, 200, 200, 200]}
                        h={[50, 75, 75]}
                        borderRadius="xl"
                        shadow="md"
                        objectFit="cover"
                        alt={item.scene_name}
                        src={item.map_url}
                      />
                    </Box>
                    <Center ml="6">{item.scene_name}</Center>
                  </Center>
                  <Spacer />
                  <Center>
                    <Text as="kbd" fontWeight="bold">
                      {convertSeconds(item.duration)}
                    </Text>
                  </Center>
                </Flex>
              </Link>
            )
          })}
        </Box>
      </Box>
    )
  }

  return (
    <BoxWrapper colSpan={3}>
      <BoxTitle
        name={`Frequently Visited Scenes`}
        description={`Top ${data.length} list of scenes ${userAddressRes.name} visited the most`}
        date=""
        avgData={""}
        slicedData={[]}
        color={""}
        line={false}
        setLine={{}}
      />

      {!isLoading ? (
        <UserSceneTable />
      ) : (
        <Center h={chartProps.height}>
          <Spinner />
        </Center>
      )}
    </BoxWrapper>
  )
}

export default UserTopScenes
