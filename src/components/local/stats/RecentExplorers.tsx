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
  Select,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchResult } from "../../../lib/hooks/fetch"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/recent-explorers.json"
import { FiLink } from "react-icons/fi"
import Loading from "../Loading"
import ProfilePicture from "../ProfilePicture"

const RecentExplorers = ({ isLoading, setIsLoading }) => {
  const box = {
    h: "590",
    w: "100%",
    bg: "white",
  }

  const [res, setRes] = useState([])

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsLoading(true)
      const url = "api/fetch/recent-explorers"
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

  const DateArr = []
  for (let i = 0; i < data.length; i++) {
    DateArr.push(data[i][0])
  }
  const valueArr = []
  for (let i = 0; i < data.length; i++) {
    valueArr.push(data[i][1])
  }

  const [currentDate, setCurrentDate] = useState(6)

  const DateSelector = () => {
    return (
      <Box w="100">
        <Select
          variant="flushed"
          size="sm"
          onChange={(e) => {
            setCurrentDate(Number(e.target.value))
          }}
          value={currentDate}
        >
          {DateArr.map((date, index) => {
            return (
              <option key={index} value={index}>
                {date}
              </option>
            )
          })}
        </Select>
      </Box>
    )
  }

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
            {valueArr[currentDate].map((item, index) => {
              return (
                <Tr
                  key={index}
                  style={{
                    background: `linear-gradient(90deg, #EED31250 ${
                      item.parcels_visited / 3
                    }%, #ffffff 0)`,
                  }}
                >
                  <Td>
                    <a
                      target="_blank"
                      href={"https://etherscan.io/address/" + `${item.address}`}
                      rel="noreferrer"
                    >
                      <Box display="inline-block" mr="2">
                        <ProfilePicture address={item.address} />
                      </Box>
                      <Text
                        color="gray.600"
                        as="kbd"
                        display="inline-block"
                        css={{ transform: "translateY(-7px)" }}
                      >
                        {item.address.slice(0, 35) + ".. "}
                        <Box display="inline-block">
                          <FiLink size="12" />
                        </Box>
                      </Text>
                    </a>
                  </Td>
                  <Td>
                    <Text>
                      <b>{item.parcels_visited}</b>
                    </Text>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        {/* <Box>
          <DateSelector />
        </Box> */}
      </TableContainer>
    )
  }

  return (
    <GridBox box={box}>
      <Box position="relative" mt="4">
        <Box>
          <Box>
            <Text fontSize="xl" mb="1" ml="5">
              <b>Recent Explorers</b>
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

export default RecentExplorers
