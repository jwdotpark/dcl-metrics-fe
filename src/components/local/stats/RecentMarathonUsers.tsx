import {
  Box,
  Center,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import ProfilePicture from "../ProfilePicture"
import { convertSeconds } from "../../../lib/hooks/utils"

const RecentMarathonUsers = ({ res, isLoading }) => {
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }
  const data = Object.entries(res)

  const valueArr = []
  data.forEach(([key, value]) => {
    valueArr.push(value)
  })

  const recentMarathonUserData = valueArr[valueArr.length - 1]
  const timeSpentArr = []
  for (let i = 0; i < recentMarathonUserData.length; i++) {
    timeSpentArr.push(recentMarathonUserData[i].time_spent)
  }

  const max = Math.max(...timeSpentArr)
  const min = Math.min(...timeSpentArr)
  const range = max - min
  const normalizedTimeSpentArr = []
  for (let i = 0; i < timeSpentArr.length; i++) {
    normalizedTimeSpentArr.push(
      Math.round(((timeSpentArr[i] - min) / range) * 100)
    )
  }

  // const DateSelector = () => {
  //   return (
  //     <Box w="100">
  //       <Select
  //         variant="flushed"
  //         size="sm"
  //         onChange={(e) => {
  //           setCurrentDate(Number(e.target.value))
  //         }}
  //         value={currentDate}
  //       >
  //         {dateArr.map((date, index) => {
  //           return (
  //             <option key={index} value={index}>
  //               {date}
  //             </option>
  //           )
  //         })}
  //       </Select>
  //     </Box>
  //   )
  // }

  const TableComponent = () => {
    const { colorMode } = useColorMode()
    return (
      <TableContainer mx="4" whiteSpace="nowrap" mt="4">
        <Table size="sm" variant="unstyled" height="450px" w="100%">
          <Thead display="block">
            <Tr>
              <Th>Time Spent</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentMarathonUserData.map((item, index) => {
              return (
                <Tr
                  borderBottom="1px solid rgba(0, 0, 0, 0.06)"
                  key={index}
                  style={{
                    background: `linear-gradient(90deg, #E9E0FAFF ${
                      normalizedTimeSpentArr[index]
                    }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
                  }}
                  display="block"
                  h="3rem"
                >
                  <Td>
                    <Box w="105px">
                      <Text as="kbd">
                        <b>
                          {convertSeconds(
                            Number(recentMarathonUserData[index].time_spent)
                          )}
                        </b>
                      </Text>
                    </Box>
                  </Td>
                  <Td>
                    <Flex>
                      <Box display="inline" mr="2">
                        <ProfilePicture
                          address={recentMarathonUserData[index].address}
                        />
                      </Box>
                      <Box display="inline-block" mt="1.5">
                        <a
                          target="_blank"
                          href={"https://etherscan.io/address/" + `${item[0]}`}
                          rel="noreferrer"
                        >
                          <Text
                            as="kbd"
                            _hover={{ color: "gray.600" }}
                            // eslint-disable-next-line
                            color={useColorModeValue("gray.800", "gray.200")}
                          >
                            {recentMarathonUserData[index].address}
                          </Text>
                        </a>
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        {/* <Center>
          <Pagination page={page} pages={pages} setPage={setPage} />
        </Center> */}
      </TableContainer>
    )
  }

  return (
    <GridBox box={box}>
      <Box position="relative" mt="4">
        <Box>
          <Box>
            <Text fontSize="xl" mb="1" ml="5">
              <b>Recent Marathon Users</b>
              <Text fontSize="sm" color="gray.500">
                Users with most online time yesterday
              </Text>
            </Text>
          </Box>
        </Box>

        {data.length > 0 && !isLoading ? (
          <Box>
            {data.length > 0 && !isLoading ? (
              <Box>
                <TableComponent />
              </Box>
            ) : (
              <Center h={box.h}>
                <Loading />
              </Center>
            )}
            {/* <Box mx="6">
              <DateSelector />
            </Box> */}
          </Box>
        ) : (
          <Center h={box.h}>
            <Loading />
          </Center>
        )}
      </Box>
    </GridBox>
  )
}

export default RecentMarathonUsers
