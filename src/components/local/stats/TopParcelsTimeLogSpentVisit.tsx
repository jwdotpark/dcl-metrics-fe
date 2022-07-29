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
  GridItem,
  Button,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FiLink } from "react-icons/fi"
import { fetchResult } from "../../../lib/hooks/fetch"
import { convertSeconds } from "../../../lib/hooks/utils"
import GridBox from "../GridBox"
import Loading from "../Loading"
import Pagination from "../Pagination"
import dataArr from "../../../../public/data/top-visited-parcel.json"

const TopParcelsTimeLogSpentVisit = ({ parcel, isParcelLoading }) => {
  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // array dateArr
  const data = Object.entries(parcel)
  const dataPaginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const pages = Math.ceil(data.length / rowsPerPage)
  const coord = []

  for (let i = 0; i < dataPaginated.length; i++) {
    coord.push(dataPaginated[i][0].replace(",", "/"))
  }
  const baseUrl = "https://api.decentraland.org/v1/parcels/"
  const mapUrl = "/map.png?width=auto&height=auto&size=15"

  const TableComponent = () => {
    return (
      <TableContainer mt="2">
        <Table size="xs" variant="simple" height="730">
          <Thead>
            <Tr>
              <Th>
                <Text fontSize="xs">Parcel</Text>
              </Th>
              <Th>
                <Text fontSize="xs">Coordinate</Text>
              </Th>
              <Th>
                <Text fontSize="xs">Logins</Text>
              </Th>
              <Th>
                <Text fontSize="xs">Logouts</Text>
              </Th>
              <Th>
                <Text fontSize="xs">Unique Visitors</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPaginated.map((item, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    <Box
                      mr="10"
                      minW="150px"
                      borderRadius="md"
                      border="2px solid"
                      borderColor="gray.200"
                      overflow="clip"
                      boxShadow="md"
                    >
                      <Image
                        borderRadius="sm"
                        height="8rem"
                        w="100%"
                        src={baseUrl + coord[i] + mapUrl}
                        alt="map image"
                        objectFit="cover"
                      />
                    </Box>
                  </Td>
                  <Td>
                    <Box>
                      <a
                        // href={`https://api.decentraland.org/v1/parcels/${coord[i]}`}
                        // target="_blank"
                        // rel="noopener noreferrer"
                        href="#"
                      >
                        <Text
                          color="gray.600"
                          as="kbd"
                          _hover={{ color: "gray.900" }}
                          fontSize="sm"
                        >
                          {coord[i].replace("/", ",") + " "}
                        </Text>
                      </a>
                    </Box>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {/* @ts-ignore */}
                      <b>{item[1].logins}</b>
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {/* @ts-ignore */}
                      {item[1].logouts}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {/* @ts-ignore */}
                      {item[1].unique_visitors}
                    </Text>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <Center h="100%" w="100%">
          <Pagination page={page} pages={pages} setPage={setPage} />
        </Center>
      </TableContainer>
    )
  }

  const box = {
    h: "920",
    w: "100%",
    bg: "white",
  }

  return (
    <>
      <GridItem
        minW={box.w}
        maxW={box.w}
        h={box.h}
        bg={box.bg}
        borderRadius="md"
        boxShadow="md"
      >
        <Box position="relative" mt="4" mx="5">
          <Box>
            <Text fontSize="xl" mb="1" pt="4">
              <b>Parcel Login, Logout & Unique Visitors</b>
              <Text fontSize="sm" color="gray.500">
                Parcels with the most access and visit in the last 7 days
              </Text>
            </Text>
          </Box>
          {data.length > 0 && !isParcelLoading ? (
            <Box>
              <TableComponent />
            </Box>
          ) : (
            <Center h={box.h}>
              <Loading />
            </Center>
          )}
        </Box>
      </GridItem>
    </>
  )
}

export default TopParcelsTimeLogSpentVisit
