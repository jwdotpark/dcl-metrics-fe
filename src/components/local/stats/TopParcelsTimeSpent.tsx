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

const TopParcelsTimeSpentComponent = ({ isLoading, setIsLoading }) => {
  const dataArr = {
    "-101,127": {
      avg_time_spent: 76014,
      avg_time_spent_afk: 51441,
      unique_visitors: 14653,
      logins: 7262,
      logouts: 8951,
    },
    "-101,129": {
      avg_time_spent: 75640,
      avg_time_spent_afk: 46818,
      unique_visitors: 8967,
      logins: 4017,
      logouts: 5067,
    },
    "-107,133": {
      avg_time_spent: 75360,
      avg_time_spent_afk: 57940,
      unique_visitors: 14362,
      logins: 8020,
      logouts: 9502,
    },
    "-101,128": {
      avg_time_spent: 61902,
      avg_time_spent_afk: 37988,
      unique_visitors: 8980,
      logins: 3062,
      logouts: 4090,
    },
    "-100,127": {
      avg_time_spent: 55575,
      avg_time_spent_afk: 35697,
      unique_visitors: 19164,
      logins: 12302,
      logouts: 6641,
    },
    "-101,126": {
      avg_time_spent: 53406,
      avg_time_spent_afk: 30369,
      unique_visitors: 0,
      logins: 0,
      logouts: 1700,
    },
    "-108,133": {
      avg_time_spent: 48952,
      avg_time_spent_afk: 32148,
      unique_visitors: 6830,
      logins: 896,
      logouts: 3004,
    },
    "-108,135": {
      avg_time_spent: 48414,
      avg_time_spent_afk: 30534,
      unique_visitors: 2933,
      logins: 747,
      logouts: 2085,
    },
    "-100,128": {
      avg_time_spent: 40690,
      avg_time_spent_afk: 27081,
      unique_visitors: 1281,
      logins: 161,
      logouts: 1672,
    },
    "-109,135": {
      avg_time_spent: 24853,
      avg_time_spent_afk: 12642,
      unique_visitors: 3644,
      logins: 1084,
      logouts: 243,
    },
    "-109,133": {
      avg_time_spent: 15287,
      avg_time_spent_afk: 7472,
      unique_visitors: 2126,
      logins: 834,
      logouts: 0,
    },
    "119,-12": {
      avg_time_spent: 10491,
      avg_time_spent_afk: 7888,
      unique_visitors: 0,
      logins: 0,
      logouts: 168,
    },
    "-100,126": {
      avg_time_spent: 7191,
      avg_time_spent_afk: 3616,
      unique_visitors: 0,
      logins: 0,
      logouts: 132,
    },
    "-107,135": {
      avg_time_spent: 5424,
      avg_time_spent_afk: 3286,
      unique_visitors: 878,
      logins: 320,
      logouts: 0,
    },
  }

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
          height="590px"
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
                    <Box boxSize="5.5rem" borderRadius="md" overflow="clip">
                      <Image
                        src={
                          `https://api.decentraland.org/v1/parcels/${coord[i]}` +
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
                        <Text fontSize="md">
                          {coord[i].replace("/", ",") + " "}
                          <Box display="inline-block">
                            <FiLink />
                          </Box>
                        </Text>
                      </a>
                    </Box>
                  </Td>
                  <Td>
                    <Text fontSize="md">
                      {convertSeconds(item[1].avg_time_spent)}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="md">
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
    h: "700",
    w: "100%",
    bg: "white",
  }

  return (
    <>
      <GridBox box={box}>
        <Box position="relative" mt="4" mx="5">
          <Box>
            <Text fontSize="xl" mb="4">
              <b>Top Parcels Time Spent </b>
              <Box display="inline" ml="2"></Box>
            </Text>
          </Box>
          <TableComponent />
        </Box>
      </GridBox>
    </>
  )
}

export default TopParcelsTimeSpentComponent
