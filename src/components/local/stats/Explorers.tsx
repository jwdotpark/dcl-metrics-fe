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
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchResult } from "../../../lib/hooks/fetch"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/explorers.json"
import { FiLink } from "react-icons/fi"
import Loading from "../Loading"
import Pagination from "../Pagination"

const Explorers = ({ isLoading, setIsLoading }) => {
  const box = {
    h: "570",
    w: "100%",
    bg: "white",
  }

  const [res, setRes] = useState([])

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
  }, [isLoading, setIsLoading])

  const data = Object.entries(res)

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = Math.ceil(data.length / rowsPerPage)
  const dataPaginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  // create a table with data
  const TableComponent = () => {
    return (
      <TableContainer mx="4" whiteSpace="nowrap">
        <Table size="sm" variant="simple" height="450px">
          <Thead>
            <Tr>
              <Th>Address</Th>
              <Th>Parcels Visited</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPaginated.map((item, index) => {
              return (
                <Tr
                  key={index}
                  style={{
                    background: `linear-gradient(90deg, #F4756075 ${
                      item[1] / 10
                    }%, #ffffff 0)`,
                  }}
                >
                  <Td>
                    <a
                      target="_blank"
                      href={"https://etherscan.io/address/" + `${item[0]}`}
                      rel="noreferrer"
                    >
                      <Text as="kbd" color="gray.600" fontSize="md">
                        {item[0].slice(0, 35) + ".. "}
                        <Box display="inline-block">
                          <FiLink size="12" />
                        </Box>
                      </Text>
                    </a>
                  </Td>
                  <Td>
                    <Text fontSize="lg" textAlign="center">
                      <b>{item[1]}</b>
                    </Text>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <Center>
          <Pagination page={page} pages={pages} setPage={setPage} />
        </Center>
      </TableContainer>
    )
  }

  return (
    <GridBox box={box}>
      <Box position="relative" mt="4">
        <Box>
          <Box>
            <Text fontSize="xl" mb="1" ml="5">
              <b>Explorers</b>
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

export default Explorers
