import { Box, Center, GridItem, Select, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchResult } from "../../../lib/hooks/fetch"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/recent-marathon-users.json"
import Loading from "../Loading"
import BarChart2 from "../../../lib/BarChart2"
import Pagination from "../Pagination"

const MarathonUsers = ({ isLoading, setIsLoading }) => {
  const box = {
    h: "580",
    w: "100%",
    bg: "white",
  }

  const [res, setRes] = useState([])

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsLoading(true)
      const url = "api/fetch/recent-marathon-users"
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

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = Math.ceil(data.length / rowsPerPage)
  const dataPaginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <GridBox box={box}>
      <Box position="relative" mt="4">
        <Box>
          <Box>
            <Text fontSize="xl" mb="1" ml="5">
              <b>Recent Marathon Users</b>
              <Text fontSize="sm" color="gray.500">
                Users with most online time yesterday
              </Text>
            </Text>
          </Box>
        </Box>

        {data.length > 0 && !isLoading ? (
          <Box>
            <GridItem h={450} bg={box.bg} borderRadius="md">
              <BarChart2 data={dataPaginated} />
              <Center>
                <Pagination page={page} pages={pages} setPage={setPage} />
              </Center>
            </GridItem>
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

export default MarathonUsers
