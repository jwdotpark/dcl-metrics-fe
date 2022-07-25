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
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FiLink } from "react-icons/fi"
import { fetchResult } from "../../../lib/hooks/fetch"
import { convertSeconds } from "../../../lib/hooks/utils"
import GridBox from "../GridBox"
import Loading from "../Loading"
import Pagination from "../Pagination"

const TopParcelsTimeSpentComponent = ({ box, isLoading, setIsLoading }) => {
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
  const [timeSpent, setTimeSpent] = useState([])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = Math.ceil(Object.keys(dataArr).length / rowsPerPage)

  const TableComponent = () => {
    return (
      <TableContainer m="2" mt="12" whiteSpace="nowrap">
        <Table variant="simple" size="sm" overflowX="scroll">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Address</Th>
              <Th>Time Spent</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(dataArr)
              .slice((page - 1) * 10, page * 10)
              .map((item, index) => {
                return (
                  <Tr
                    key={index}
                    style={{
                      background: `linear-gradient(90deg, #61CDBB50 ${
                        // FIXME convert to 100&
                        dataArr[item] / 2400
                      }%, #ffffff 0)`,
                    }}
                  >
                    <Td>
                      <Text color="gray.500">
                        {index + 1 + page * rowsPerPage - rowsPerPage}
                      </Text>
                    </Td>
                    <Td>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://etherscan.io/address/${item}`}
                      >
                        <Text color="gray.600">
                          {item + " "}
                          <Box display="inline-block">
                            <FiLink size="10" />
                          </Box>
                        </Text>
                      </a>
                    </Td>
                    <Td>{convertSeconds(dataArr[item])}</Td>
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
      {!isLoading ? (
        <>
          <Box position="absolute" m="2" ml="4">
            <Text fontSize="xl">
              <b>Top Recent 7 Days Users Time Spent</b>
            </Text>
          </Box>
          <TableComponent />
        </>
      ) : (
        <Loading />
      )}
    </GridBox>
  )
}

export default TopUsersTimeSpentComponent2
