/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  SimpleGrid,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react"
import CountUp from "react-countup"
import GridBox from "../GridBox"
import ErrorBox from "../stats/error/ErrorBox"

const StatusBox = ({ data }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const successRate = (success, total) => {
    return Math.floor((success / total) * 100)
  }

  const successArr = Object.entries(data).map((item) => {
    // @ts-ignore
    return successRate(item[1].success_count, item[1].total_count)
  })

  const isError = successArr.some((item) => item < 75)

  const successColor = (successRate) => {
    if (successRate >= 85) {
      return useColorModeValue("green.400", "#50fa7b")
    } else if (successRate < 85 && successRate >= 70) {
      return useColorModeValue("yellow.400", "#ffb86c")
    } else {
      return useColorModeValue("red.400", "#ff5555")
    }
  }

  const dataArr = Object.entries(data)
  const StatusDataBox = () => {
    return (
      <>
        {dataArr.map((category) => {
          return (
            <>
              <Box ml="2" my="4">
                <Text fontSize={["md", "xl", "3xl", "3xl"]}>{category[0]}</Text>
              </Box>
              <SimpleGrid gap={4} columns={[0, 2, 3, 4]}>
                {/* @ts-ignore */}
                {category[1].map((item, j) => {
                  return (
                    <GridBox box={box} key={j}>
                      <Box m="4">
                        <Flex mb="4">
                          <Box mx="2">
                            <Text
                              ml="2"
                              fontSize={["sm", "md", "lg", "md"]}
                              _hover={{
                                color: "gray.400",
                              }}
                              wordBreak="break-all"
                            >
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={item.url}
                              >
                                {item.host}
                              </a>
                            </Text>
                          </Box>
                          <Spacer />
                          <Box mr="2">
                            <Text
                              color={successColor(
                                successRate(
                                  item.success_count,
                                  item.total_count
                                )
                              )}
                              fontSize={["sm", "md", "xl", "2xl"]}
                              cursor="grab"
                            >
                              <CountUp
                                end={item.success_rate}
                                duration={0.5}
                                decimals={1}
                              />
                              %
                            </Text>
                          </Box>
                        </Flex>
                        <Box pb="2">
                          <Table borderBottom="none" size="sm" variant="simple">
                            <Tbody>
                              <Tr>
                                <Td>Total Count</Td>
                                <Td isNumeric>
                                  <b>{item.total_count}</b>
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>Success Count</Td>
                                <Td isNumeric>
                                  <b>{item.success_count}</b>
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </Box>
                      </Box>
                    </GridBox>
                  )
                })}
              </SimpleGrid>
            </>
          )
        })}
      </>
    )
  }

  return (
    <Box w="100%">
      <ErrorBox isError={isError} />
      <StatusDataBox />
    </Box>
  )
}

export default StatusBox
