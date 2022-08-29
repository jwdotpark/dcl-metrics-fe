import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Select,
  useColorMode,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import ProfilePicture from "../ProfilePicture"

const RecentExplorers = ({ res, isLoading }) => {
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const data = Object.entries(res)

  const DateArr = []
  for (let i = 0; i < data.length; i++) {
    DateArr.push(data[i][0])
  }
  const valueArr = []
  for (let i = 0; i < data.length; i++) {
    valueArr.push(data[i][1])
  }

  const [currentDate, setCurrentDate] = useState(valueArr.length - 1)

  const DateSelector = () => {
    return (
      <Box w="100">
        <Select
          variant="flushed"
          size="sm"
          onChange={(e) => {
            setCurrentDate(Number(e.target.value))
          }}
          value={currentDate}
        >
          {DateArr.map((date, index) => {
            return (
              <option key={index} value={index}>
                {date}
              </option>
            )
          })}
        </Select>
      </Box>
    )
  }

  const lengthArr = []
  for (let i = 0; i < valueArr[currentDate].length; i++) {
    lengthArr.push(valueArr[currentDate][i].parcels_visited)
  }

  const normalizedData = []
  for (let i = 0; i < lengthArr.length; i++) {
    normalizedData.push(Math.round((lengthArr[i] / lengthArr[0]) * 100))
  }

  const TableComponent = () => {
    const { colorMode } = useColorMode()
    return (
      <TableContainer mx="4" whiteSpace="nowrap" mt="4">
        <Table size="sm" variant="unstyled" height="450px">
          <Thead display="block">
            <Tr>
              <Th>Parcels Visited</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {valueArr[currentDate].map((item, index) => {
              return (
                <Tr
                  display="block"
                  borderBottom="1px solid rgba(0, 0, 0, 0.06)"
                  key={index}
                  style={{
                    background: `linear-gradient(90deg, #EED31250 ${
                      normalizedData[index]
                    }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
                  }}
                  h="3rem"
                >
                  <Td>
                    <Box w="105px">
                      <Text as="kbd">
                        <b>{item.parcels_visited}</b>
                      </Text>
                    </Box>
                  </Td>
                  <Td>
                    <Flex>
                      <Box display="inline-block" mr="2">
                        <ProfilePicture address={item.address} modal={false} />
                      </Box>
                      <Box display="inline-block" mt="1.5">
                        <a
                          target="_blank"
                          href={
                            "https://etherscan.io/address/" + `${item.address}`
                          }
                          rel="noreferrer"
                        >
                          <Text
                            as="kbd"
                            // eslint-disable-next-line
                            color={useColorModeValue("gray.800", "gray.200")}
                            _hover={{ color: "gray.600" }}
                          >
                            {item.address}
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
        {/* <Box>
          <DateSelector />
        </Box> */}
      </TableContainer>
    )
  }

  return (
    <GridBox box={box}>
      <Box position="relative" mt="4">
        <Box>
          <Box>
            <Text fontSize="xl" mb="1" ml="5">
              <b>Recent Explorers</b>
              <Text fontSize="sm" color="gray.500">
                Users that visited the most parcels yesterday
              </Text>
            </Text>
          </Box>
        </Box>
        {/* <TableComponent /> */}
        {data.length > 0 && !isLoading ? (
          <Box>
            <TableComponent />
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

export default RecentExplorers
