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
import { useState, useEffect } from "react"
import { FiLink } from "react-icons/fi"
import { fetchResult } from "../../../lib/hooks/fetch"
import { convertSeconds } from "../../../lib/hooks/utils"
import GridBox from "../GridBox"
import Loading from "../Loading"
import Pagination from "../Pagination"
import dataArr from "../../../../public/data/top-visited-parcel.json"

const TopParcelsTimeSpentComponent = ({ isLoading, setIsLoading }) => {
  const [res, setRes] = useState([])

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsLoading(true)
      const url = "api/fetch/top-parcels-timespent"
      fetchResult(url, setRes)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      // @ts-ignore
      setRes(dataArr)
      setIsLoading(false)
    }
  }, [isLoading, setIsLoading])

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // array dateArr
  const data = Object.entries(dataArr)
  const dataPaginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const pages = Math.ceil(data.length / rowsPerPage)
  const coord = []

  // extract coordinates from data
  for (let i = 0; i < dataPaginated.length; i++) {
    coord.push(dataPaginated[i][0].replace(",", "/"))
  }
  const mapUrl = "/map.png?width=auto&height=auto&size=10"

  const TableComponent = () => {
    return (
      <TableContainer>
        <Table
          size="sm"
          variant="simple"
          overflowX="scroll"
          maxW="100%"
          height="500px"
        >
          <Thead>
            <Tr>
              <Th>Parcel</Th>
              <Th>Coordinate</Th>
              <Th>Avg. time spent</Th>
              <Th>Avg. time spent afk</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPaginated.map((item, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    <Box boxSize="4rem" borderRadius="md" overflow="clip">
                      <Image
                        src={
                          `https://api.decentraland.org/v1/parcels/ + ${coord[i]}` +
                          mapUrl
                        }
                        alt="map image"
                        objectFit="cover"
                        // boxSize="1px"
                      />
                    </Box>
                  </Td>
                  {/* coordinate column */}
                  <Td>
                    <Box>
                      <a
                        // href={`https://api.decentraland.org/v1/parcels/${coord[i]}`}
                        href="#"
                        // target="_blank"
                        // rel="noopener noreferrer"
                      >
                        <Text fontSize="lg" color="gray.600" as="kbd">
                          {coord[i].replace("/", ",") + " "}
                          <Box display="inline-block">
                            <FiLink />
                          </Box>
                        </Text>
                      </a>
                    </Box>
                  </Td>
                  <Td>
                    <Text fontSize="lg">
                      <b>{convertSeconds(item[1].avg_time_spent)}</b>
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="lg">
                      {convertSeconds(item[1].avg_time_spent_afk)}
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

  const box = {
    h: "625",
    w: "100%",
    bg: "white",
  }

  return (
    <>
      <GridBox box={box}>
        <Box position="relative" mt="4" mx="5">
          <Box>
            <Text fontSize="xl" mb="1">
              <b>Top Parcels/Scenes Time Spent </b>
              <Text fontSize="sm" color="gray.500">
                Parcels with the most time spent on them in the last 7 days
              </Text>
            </Text>
          </Box>
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
    </>
  )
}

export default TopParcelsTimeSpentComponent
