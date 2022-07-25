import {
  Text,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Center,
  Button,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import Pagination from "../Pagination"
import Loading from "../Loading"
import { convertSeconds } from "../../../lib/hooks/utils"
import { FiLink } from "react-icons/fi"
import staticData from "../../../../public/data/daily-user-stats.json"
import { fetchResult } from "../../../lib/hooks/fetch"

const TopUsersTimeSpentComponent = ({ box, isLoading, setIsLoading }) => {
  const [res, setRes] = useState([])

  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsLoading(true)
      const url = "api/fetch/daily-user-timespent"
      fetchResult(url, setRes)
      setIsLoading(false)
    }, [isLoading, setIsLoading])
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsLoading(true)
      // @ts-ignore
      setRes(staticData)
      setIsLoading(false)
    }, [setIsLoading])
  }

  // // NOTE from API
  // useEffect(() => {
  //   setIsLoading(true)
  //   const url = "api/fetch/daily-user-timespent"
  //   fetchResult(url, setRes)
  //   setIsLoading(false)
  // }, [isLoading, setIsLoading])

  // // json
  // useEffect(() => {
  //   setIsLoading(true)
  //   // @ts-ignore
  //   setRes(staticData)
  //   setIsLoading(false)
  // }, [setIsLoading])

  // consolidate data as date/timeSpent/address
  const data = Object.entries(res)
  const dataArr = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][1].length; j++) {
      dataArr.push({
        date: data[i][0],
        timeSpent: data[i][1][j].time_spent,
        address: data[i][1][j].address,
      })
    }
  }
  // sort by time_spent
  dataArr.sort((a, b) => {
    return b.timeSpent - a.timeSpent
  })

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = dataArr.length / rowsPerPage

  const TableComponent = () => {
    return (
      <TableContainer mx="4" whiteSpace="nowrap">
        <Table
          size="sm"
          variant="simple"
          overflowX="scroll"
          maxW="100%"
          height="500px"
        >
          <Thead>
            <Tr>
              <Th>#</Th>
              {dateClicked && <Th>Date</Th>}
              <Th>Time Spent</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataArr.slice((page - 1) * 10, page * 10).map((item, index) => {
              return (
                <Tr
                  key={item.address}
                  style={{
                    background: `linear-gradient(90deg, #61CDBB50 ${
                      // FIXME convert to 100%
                      item.timeSpent / 2000
                    }%, #ffffff 0)`,
                  }}
                >
                  <Td>
                    <Text color="gray.500">
                      {index + 1 + page * rowsPerPage - rowsPerPage}
                    </Text>
                  </Td>
                  {dateClicked && <Td>{item.date}</Td>}
                  <Td>{convertSeconds(item.timeSpent)}</Td>
                  <Td>
                    <a
                      target="_blank"
                      href={"https://etherscan.io/address/" + `${item.address}`}
                      rel="noreferrer"
                    >
                      {dateClicked ? (
                        <Text color="gray.600">
                          {item.address.slice(0, 10)}..{" "}
                          <Box display="inline-block">
                            <FiLink size="12" />
                          </Box>
                        </Text>
                      ) : (
                        <Text color="gray.600">
                          {item.address.slice(0, 40)}
                          <Box display="inline-block">
                            <FiLink size="12" />
                          </Box>
                        </Text>
                      )}
                    </a>
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

  const [dateClicked, setDateClicked] = useState(false)

  return (
    <>
      <GridBox box={box}>
        <>
          <Box position="relative" mt="4" mx="5">
            <Text fontSize="xl">
              <b>Top Users Time Spent </b>
              <Box display="inline" ml="2">
                <Button
                  size="sm"
                  variant={dateClicked ? "solid" : "outline"}
                  onClick={() => {
                    setDateClicked(!dateClicked)
                  }}
                >
                  <Text color={dateClicked ? "gray.300" : "gray.800"} size="sm">
                    Date
                  </Text>
                </Button>
              </Box>
            </Text>
          </Box>
          {dataArr.length > 0 && !isLoading ? (
            <Box>
              <TableComponent />
            </Box>
          ) : (
            <Loading />
          )}
        </>
      </GridBox>
    </>
  )
}

export default TopUsersTimeSpentComponent
