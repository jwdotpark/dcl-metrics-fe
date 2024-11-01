/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Box,
  Center,
  GridItem,
  Spinner,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  Rectangle,
} from "recharts"
import { chartHeight } from "../../../../lib/data/constant"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"

export const ActiveUsers = () => {
  const axisFontColor = useColorModeValue("#000", "#fff")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    const url =
      "https://cdn-data.decentraland.org/public/monthly/active-users.json"

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
    const data = await res.json()
    const dataArr = data.values
    const mutateArr = dataArr.map((item) => {
      return {
        date: format(new Date(item[0]), "yyyy-MM"),
        value: parseInt(item[1]),
      }
    })
    setData(mutateArr)
    setIsLoading(false)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          p="2"
          fontSize="xs"
          bg={useColorModeValue("whiteAlpha.700", "blackAlpha.600")}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.800")}
          borderRadius="xl"
          shadow="md"
        >
          <Center fontSize="md" fontWeight="bold">
            {format(new Date(label), "yyyy MMMM")}
          </Center>
          <Table my="1" size="xs" variant="simple">
            <Thead>
              <Tr>
                <Td>Category</Td>
                <Td isNumeric>
                  <Box ml="2">Value</Box>
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              <Td>Active Users</Td>
              <Td isNumeric>
                <Text ml="2" fontWeight="bold">
                  {payload[0].value}
                </Text>
              </Td>
            </Tbody>
          </Table>
        </Box>
      )
    }

    return null
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BoxWrapper colSpan={2}>
      <GridItem w="100%" h="auto" colSpan={[6, 3]}>
        <Box mb="2">
          <PlainBoxTitle
            name="Active Users"
            description="Unique users that have logged into Decentraland and moved out of their initial tile"
          />
          {isLoading ? (
            <Center h={chartHeight}>
              <Spinner />
            </Center>
          ) : (
            <Box>
              <Box pos="relative" w="100%" h={chartHeight} mt="4" mb="2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="4 4" opacity="0.5" />
                    <XAxis
                      fontSize="10px"
                      style={{
                        fontWeight: "medium",
                      }}
                      tick={{ fill: axisFontColor }}
                      dataKey="date"
                    />
                    <YAxis
                      fontSize="10px"
                      style={{
                        fontWeight: "medium",
                      }}
                      tick={{ fill: axisFontColor }}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={undefined}
                          payload={undefined}
                          label={undefined}
                        />
                      }
                    />
                    <Bar
                      dataKey="value"
                      fill="#6272A480"
                      stroke="#6272A4"
                      activeBar={
                        <Rectangle fill="#44475A80" stroke="#44475A" />
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          )}
        </Box>
        <Center mt="-3" mb="1" fontSize="xs">
          Source from
          <Box ml="1" color="blue.500">
            <Link
              href="https://status.decentraland.org/metrics"
              target="_blank"
            >
              https://status.decentraland.org/metrics
            </Link>
          </Box>
        </Center>
      </GridItem>
    </BoxWrapper>
  )
}
