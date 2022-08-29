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
  useColorModeValue,
  useColorMode,
  Flex,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import ProfilePicture from "../ProfilePicture"

const Explorers = ({ res, isLoading }) => {
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const data = Object.entries(res)

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = Math.ceil(data.length / rowsPerPage)
  const dataPaginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  // make an array that contains second index of each array in dataPaginated
  const lengthArr = []
  for (let i = 0; i < dataPaginated.length; i++) {
    lengthArr.push(dataPaginated[i][1])
  }

  const normalizedData = []
  for (let i = 0; i < lengthArr.length; i++) {
    normalizedData.push(Math.round((lengthArr[i] / lengthArr[0]) * 100))
  }

  const TableComponent = () => {
    const { colorMode } = useColorMode()
    return (
      <TableContainer mx="4" whiteSpace="nowrap" mt="4">
        <Table size="sm" variant="unstyled" height="450px" w="100%">
          <Thead display="block">
            <Tr>
              <Th>Parcels Visited</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPaginated.map((item, index) => {
              return (
                <Tr
                  borderBottom="1px solid rgba(0, 0, 0, 0.06)"
                  key={index}
                  style={{
                    background: `linear-gradient(90deg, #F4756050 ${
                      normalizedData[index]
                    }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
                  }}
                  display="block"
                  h="3rem"
                >
                  <Td>
                    <Box w="105px">
                      <Text as="kbd">
                        <b>{Number(item[1])}</b>
                      </Text>
                    </Box>
                  </Td>
                  <Td>
                    <Flex>
                      <Box display="inline" mr="2">
                        <ProfilePicture address={item[0]} modal={false} />
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
                            {item[0]}
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
            <Text fontSize="xl" ml="5">
              <b>Explorers</b>
              <Text fontSize="sm" color="gray.500">
                Users that visited the most parcels in the last 7 days
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

export default Explorers
