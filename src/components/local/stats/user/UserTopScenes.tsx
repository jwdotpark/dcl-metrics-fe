/* eslint-disable react-hooks/rules-of-hooks */
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserTopScenes from "../../../../../public/data/staticUserTopScenes.json"
import { useState, useEffect } from "react"
import {
  isProd,
  isDev,
  isLocal,
  getEndpoint,
} from "../../../../lib/data/constant"
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
  Divider,
} from "@chakra-ui/react"
import { convertSeconds, mutateStringToURL } from "../../../../lib/hooks/utils"
import ToolTip from "../../../layout/local/ToolTip"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const UserTopScenes = ({ address, userAddressRes }) => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const topScenesUrl = getEndpoint(`users/${address}/activity/top_scenes`)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const url = `/api/server-fetch?url=${topScenesUrl}&address=${address}&endpoint=${address}/activity/top_scenes/`

      if (isProd) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isDev && !isLocal) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isLocal) {
        setData(staticUserTopScenes)
      }
    }
    fetchData()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const UserSceneTable = () => {
    return (
      <>
        {data.length > 0 ? (
          <Flex direction={["column", "column", "column", "column", "row"]}>
            <Box
              w={["auto", "auto", "auto", "auto", "50%"]}
              mb="2"
              mx="4"
              fontSize="sm"
            >
              {data.slice(0, 10).map((item, i) => {
                return (
                  <Box key={item.scene_uuid}>
                    <ToolTip label={`Open ${item.scene_name} page`}>
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
                          borderRadius="xl"
                          _hover={{
                            bg: useColorModeValue("gray.100", "gray.600"),
                            shadow: "md",
                          }}
                        >
                          <Center mr="4">{i + 1}.</Center>
                          <Flex direction={["column", "row"]}>
                            <Center
                              overflow="hidden"
                              w={["150px", "200px", "200px", "200px", "250px"]}
                              h="100px"
                              border="2px solid"
                              borderColor={useColorModeValue(
                                "gray.200",
                                "gray.600"
                              )}
                              borderRadius="xl"
                              shadow="md"
                            >
                              <Image
                                borderRadius="xl"
                                shadow="md"
                                objectFit="cover"
                                alt={item.scene_name}
                                src={item.map_url}
                              />
                            </Center>
                            <Center ml="6">
                              <Text fontSize={["xs", "sm"]} noOfLines={1}>
                                {item.scene_name}
                              </Text>
                            </Center>
                          </Flex>
                          <Spacer />
                          <Center>
                            <Text
                              as="kbd"
                              fontSize={["xs", "sm"]}
                              fontWeight="bold"
                            >
                              {convertSeconds(item.duration)}
                            </Text>
                          </Center>
                        </Flex>
                      </Link>
                    </ToolTip>
                    <Divider />
                  </Box>
                )
              })}
            </Box>
            <Box
              w={["auto", "auto", "auto", "auto", "50%"]}
              mb="2"
              mx="4"
              fontSize="sm"
            >
              {data.slice(10, data.length).map((item, i) => {
                return (
                  <Box key={item.scene_uuid}>
                    <ToolTip label={`Open ${item.scene_name} page`}>
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
                          borderRadius="xl"
                          _hover={{
                            bg: useColorModeValue("gray.100", "gray.600"),
                            shadow: "md",
                          }}
                        >
                          <Center mr="4">{i + 11}.</Center>
                          <Flex direction={["column", "row"]}>
                            <Center
                              overflow="hidden"
                              w={["150px", "200px", "200px", "200px", "250px"]}
                              h="100px"
                              border="2px solid"
                              borderColor={useColorModeValue(
                                "gray.200",
                                "gray.600"
                              )}
                              borderRadius="xl"
                              shadow="md"
                            >
                              <Image
                                borderRadius="xl"
                                shadow="md"
                                objectFit="cover"
                                alt={item.scene_name}
                                src={item.map_url}
                              />
                            </Center>
                            <Center ml="6">
                              <Text fontSize={["xs", "sm"]} noOfLines={1}>
                                {item.scene_name}
                              </Text>
                            </Center>
                          </Flex>
                          <Spacer />
                          <Center>
                            <Text
                              as="kbd"
                              fontSize={["xs", "sm"]}
                              fontWeight="bold"
                            >
                              {convertSeconds(item.duration)}
                            </Text>
                          </Center>
                        </Flex>
                      </Link>
                    </ToolTip>

                    <Divider />
                  </Box>
                )
              })}
            </Box>
          </Flex>
        ) : (
          <Center h={chartProps.height}>
            <Spinner />
          </Center>
        )}
      </>
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
      {isLoading ? (
        <Center h={chartProps.height}>
          <Spinner />
        </Center>
      ) : (
        <UserSceneTable />
      )}
    </BoxWrapper>
  )
}

export default UserTopScenes
