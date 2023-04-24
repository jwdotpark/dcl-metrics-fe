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
  Table,
  Tr,
  Td,
  Box,
  useColorModeValue,
  Link,
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
        <Table variant="simple">
          {data.map((item, i) => {
            return (
              <Tr
                key={item.scene_uuid}
                mb="2"
                // eslint-disable-next-line react-hooks/rules-of-hooks
                _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
              >
                <Link
                  href={`/scenes/${mutateStringToURL(item.scene_name)}/${
                    item.scene_uuid
                  }`}
                  target="_blank"
                >
                  <Td>{i + 1}.</Td>
                  <Td>
                    <Box>
                      <Image
                        w={["200px", "400px"]}
                        h="100px"
                        borderRadius="xl"
                        shadow="md"
                        objectFit="cover"
                        alt={item.scene_name}
                        src={item.map_url}
                      />
                      <Center mt="2">{item.scene_name}</Center>
                    </Box>
                  </Td>
                  <Td>{item.visits}</Td>
                  <Td>
                    <Text>{convertSeconds(item.duration)}</Text>
                  </Td>
                </Link>
              </Tr>
            )
          })}
        </Table>
      </Box>
    )
  }

  return (
    <BoxWrapper colSpan={2}>
      <BoxTitle
        name={`Scenes ${userAddressRes.name} visited`}
        description={`Top ${data.length} list of scenes ${userAddressRes.name} visited`}
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
