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
  Image,
  TableCaption,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchResult } from "../../../lib/hooks/fetch"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/explorers.json"
import { FiLink } from "react-icons/fi"
import Loading from "../Loading"
import Pagination from "../Pagination"
import ProfilePicture from "../ProfilePicture"

const Explorers = () => {
  const box = {
    h: "560",
    w: "100%",
    bg: "white",
  }

  const [res, setRes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsLoading(true)
      const url = "api/fetch/explorers"
      fetchResult(url, setRes)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      // @ts-ignore
      setRes(staticData)
      setIsLoading(false)
    }
  }, [])

  const data = Object.entries(res)

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = Math.ceil(data.length / rowsPerPage)
  const dataPaginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  // create a table with data
  const TableComponent = () => {
    return (
      <TableContainer mx="4" whiteSpace="nowrap" mt="4">
        <Table size="sm" variant="simple" height="450px" w="100%">
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
                  key={index}
                  style={{
                    background: `linear-gradient(90deg, #F4756050 ${
                      item[1] / 10
                    }%, #ffffff 0)`,
                  }}
                  display="block"
                >
                  <Td>
                    <Box w="100px">
                      <Text as="kbd">
                        <b>{item[1]}</b>
                      </Text>
                    </Box>
                  </Td>
                  <Td>
                    <a
                      target="_blank"
                      href={"https://etherscan.io/address/" + `${item[0]}`}
                      rel="noreferrer"
                    >
                      <Box display="inline-block" mr="2">
                        <ProfilePicture address={item[0]} modal={false} />
                      </Box>
                      <Text
                        color="gray.600"
                        as="kbd"
                        display="inline-block"
                        _hover={{ color: "gray.900" }}
                        css={{ transform: "translateY(3px)" }}
                      >
                        {item[0]}
                      </Text>
                    </a>
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
