/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  SimpleGrid,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Tooltip,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
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
      return "#50fa7b"
    } else if (successRate < 85 && successRate >= 70) {
      return "#ffb86c"
    } else {
      return "#ff5555"
    }
  }

  return (
    <Box w="100%">
      <ErrorBox isError={isError} />
      <SimpleGrid gap={4} columns={[1, 2, 2, 2, 4]}>
        {data.map((item, i) => (
          <GridBox box={box} key={i} w="100%" border="1px solid red">
            <Box m="4">
              <Flex>
                <Box mx="4">
                  <Text
                    as="kbd"
                    fontSize={["sm", "md", "lg", "xl"]}
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
                      {item.url.replace("https://", "")}
                    </a>
                  </Text>
                </Box>
                <Spacer />

                <Box mt={[0, -2]} mx="4">
                  <Text
                    color={successColor(
                      successRate(item.success_count, item.total_count)
                    )}
                    fontSize={["xl", "2xl", "3xl", "4xl"]}
                    cursor="grab"
                  >
                    <CountUp
                      end={Number(
                        successRate(item.success_count, item.total_count)
                      )}
                      duration={0.5}
                    />
                    %
                  </Text>
                </Box>
              </Flex>

              <Box py="2">
                <Table borderBottom="none" size="sm" variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Total Count</Td>
                      <Td isNumeric>{item.total_count}</Td>
                    </Tr>
                    <Tr>
                      <Td>Success Count</Td>
                      <Td isNumeric>{item.success_count}</Td>
                    </Tr>
                    <Tr>
                      <Td>Failure Count</Td>
                      <Td isNumeric>
                        {Number(item.total_count) - Number(item.success_count)}
                      </Td>
                    </Tr>
                    {/* <Tr>
                      <Td>Failure Rate</Td>
                      <Td isNumeric>{item.failure_rate}</Td>
                    </Tr> */}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </GridBox>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default StatusBox
