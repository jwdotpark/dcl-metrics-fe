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
import { FiAlertTriangle } from "react-icons/fi"

const UserTopScenes = ({ address, userAddressRes }) => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const topScenesUrl = `https://api.dcl-metrics.com/users/${address}/activity/top_scenes`

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const url = `/api/server-fetch?url=${topScenesUrl}&address=${address}&endpoint=${address}/activity/top_scenes/`

      if (isProd) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isDev) {
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

  console.log(data)

  const UserSceneTable = () => {
    return (
      <Flex direction="row">
        <Box w="50%" mb="2" mx="4" fontSize="sm">
          {data.slice(0, 10).map((item, i) => {
            return (
              <Box key={item.scene_uuid}>
                <Link
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
                      <Center ml="6">
                        <Text>{item.scene_name}</Text>
                      </Center>
                    </Center>
                    <Spacer />
                    <Center>
                      <Text as="kbd" fontWeight="bold">
                        {convertSeconds(item.duration)}
                      </Text>
                    </Center>
                  </Flex>
                </Link>
              </Box>
            )
          })}
        </Box>
        <Box w="50%" mb="2" mx="4" fontSize="sm">
          {data.slice(10, data.length).map((item, i) => {
            return (
              <Box key={item.scene_uuid}>
                <Link
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
                    <Center mr="4">{i + 11}.</Center>
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
              </Box>
            )
          })}
        </Box>
      </Flex>
    )
  }

  return (
    <BoxWrapper colSpan={6}>
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
        data.length > 0 ? (
          <UserSceneTable />
        ) : (
          <Center>
            <Text
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("gray.600", "gray.200")}
            >
              <Box
                sx={{ transform: "translateY(3px)" }}
                display="inline-block"
                mr="2"
              >
                <FiAlertTriangle />
              </Box>
              No Data
            </Text>
          </Center>
        )
      ) : (
        <Center h={chartProps.height}>
          <Spinner />
        </Center>
      )}
    </BoxWrapper>
  )
}

export default UserTopScenes
