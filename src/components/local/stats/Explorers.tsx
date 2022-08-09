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
import { useEffect, useState } from "react"
import { fetchResult } from "../../../lib/hooks/fetch"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/explorers.json"
import Loading from "../Loading"
import ProfilePicture from "../ProfilePicture"

const Explorers = ({ res, isLoading }) => {
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // const [res, setRes] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const ENV = process.env.NEXT_PUBLIC_ENV

  // useEffect(() => {
  //   if (ENV === "prod") {
  //     setIsLoading(true)
  //     const url = "api/fetch/explorers"
  //     fetchResult(url, setRes)
  //     setIsLoading(false)
  //   } else {
  //     setIsLoading(true)
  //     // @ts-ignore
  //     setRes(staticData)
  //     setIsLoading(false)
  //   }
  //   // eslint-disable-next-line
  // }, [])

  const data = Object.entries(res)

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = Math.ceil(data.length / rowsPerPage)
  const dataPaginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  // create a table with data
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
                      Number(item[1]) / 10
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
