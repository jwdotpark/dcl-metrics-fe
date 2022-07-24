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
  Button,
  Center,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import Loading from "../Loading"
import { FiLink } from "react-icons/fi"
import { fetchResult } from "../../../lib/hooks/fetch"

const TopUsersTimeSpentComponent = ({ box, isLoading, setIsLoading }) => {
  const [timeSpent, setTimeSpent] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const timeSpentUrl = "time_spent.json"
    fetchResult(timeSpentUrl).then((data) => {
      setTimeSpent(data)
    })
    setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  const data = Object.entries(timeSpent)

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

  // make a function that convert seconds to hrs min secs
  const convertSeconds = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const min = Math.floor((seconds % 3600) / 60)
    const sec = Math.floor(seconds % 60)
    return `${hrs}hrs ${min}min ${sec}s`
  }

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = dataArr.length / rowsPerPage

  const Pagination = () => {
    return (
      <Box m="2">
        {Array.from({ length: pages }, (_, i) => {
          return (
            <Button
              key={i}
              size="sm"
              variant="ghost"
              onClick={() => {
                setPage(i + 1)
              }}
              color={page === i + 1 ? "blue.500" : "gray.500"}
              fontSize="sm"
              cursor="pointer"
            >
              {i + 1}
            </Button>
          )
        })}
      </Box>
    )
  }

  const TableComponent = () => {
    return (
      <TableContainer m="2" mt="12" whiteSpace="nowrap">
        <Table variant="simple" size="sm" overflowX="scroll">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Date</Th>
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
                    background: `linear-gradient(90deg, #e0f2fe ${
                      item.timeSpent / 3600
                    }%, #ffffff 0)`,
                  }}
                >
                  <Td>
                    <Text>{index + 1 + page * rowsPerPage - rowsPerPage}</Text>
                  </Td>
                  <Td>{item.date}</Td>
                  <Td>{convertSeconds(item.timeSpent)}</Td>
                  <Td>
                    <a
                      target="_blank"
                      href={"https://etherscan.io/address/" + `${item.address}`}
                      rel="noreferrer"
                    >
                      <Text color="gray.500">
                        {item.address.slice(0, 10)}..{" "}
                        <Box display="inline-block">
                          <FiLink size="12" />
                        </Box>
                      </Text>
                    </a>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <Center>
          <Pagination />
        </Center>
      </TableContainer>
    )
  }

  return (
    <>
      <GridBox box={box}>
        {!isLoading ? (
          <>
            <Box position="absolute" m="2" ml="4">
              <Text fontSize="xl">
                <b>Top Users Time Spent</b>
              </Text>
            </Box>
            <TableComponent />
          </>
        ) : (
          <Loading />
        )}
      </GridBox>
    </>
  )
}

export default TopUsersTimeSpentComponent
