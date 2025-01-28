import {
  useBreakpointValue,
  Text,
  Grid,
  GridItem,
  Center,
  Spinner,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { convertSeconds } from "../src/lib/hooks/utils"
import { ATapiKey, ATbaseID, ATnewTableName } from "../src/lib/data/constant"
import { useState } from "react"
import { inquiries } from "../src/components/utils/panel/survey/statics"

const SurveyPage = () => {
  const [surveyData, setSurveyData] = useState([])
  const [oldSurveyData, setOldSurveyData] = useState([])

  const [isTableLoading, setIsTableLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 1, base: 1 })
  const getColors = (isCorrect) => (isCorrect ? "green" : "red")

  const fetchData = async () => {
    const AToldTableName = process.env.NEXT_PUBLIC_OLD_AIRTABLE_NAME
    try {
      setIsTableLoading(true)
      const newTableResponse = await fetch(
        `/api/airtable?baseID=${ATbaseID}&tableName=${ATnewTableName}&apiKey=${ATapiKey}`
      )
      const newTableData = await newTableResponse.json()

      const oldTableResponse = await fetch(
        `/api/airtable?baseID=${ATbaseID}&tableName=${AToldTableName}&apiKey=${ATapiKey}`
      )
      const oldTableData = await oldTableResponse.json()

      setSurveyData(newTableData)
      setOldSurveyData(oldTableData)
      return { newTableData, oldTableData }
    } catch (error) {
      console.error(error)
    } finally {
      setIsTableLoading(false)
    }
  }

  const steps = Array.from({ length: 15 }, (_, i) => `step${i + 1}`)
  const clusteredData = steps.map((step, i) => ({
    step: `Q${i + 1}`,
    ...surveyData.reduce((acc, item, index) => {
      acc[`Survey ${index + 1}`] = item[`${step} rt`]
      acc[`Survey ${index + 1} correct`] = item[`${step} answer`] === "correct"
      return acc
    }, {}),
  }))
  const oldClusteredData = steps.map((step, i) => ({
    step: `Q${i + 1}`,
    ...oldSurveyData.reduce((acc, item, index) => {
      acc[`Survey ${index + 1}`] = item[`${step} rt`]
      acc[`Survey ${index + 1} correct`] = item[`${step} answer`] === "correct"
      return acc
    }, {}),
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const getLabelNum = () => {
        const labelNum = label.split("Q")[1]
        return labelNum - 1
      }

      const labelNum = getLabelNum()
      const question = inquiries[labelNum]
        ? inquiries[labelNum].question
        : "Unknown Question"

      const totalResponseTime = payload.reduce(
        (acc, entry) => acc + Number(entry.value),
        0
      )

      const avgResponseTime = (
        totalResponseTime /
        payload.length /
        1000
      ).toFixed(2)

      const totalCorrect = payload.reduce(
        (acc, entry) => acc + (entry.payload[`${entry.name} correct`] ? 1 : 0),
        0
      )
      const avgAccuracyRate = ((totalCorrect / payload.length) * 100).toFixed(2)

      return (
        <Box p="4" bg="white" borderRadius="md" shadow="md">
          <Text mb="2" fontSize="sm" fontWeight="bold">
            Q{labelNum + 1}: {question}
          </Text>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Time (seconds)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payload.map((entry, index) => (
                <Tr key={`item-${index}`}>
                  <Td>{`P ${index + 1}`}</Td>
                  <Td>
                    <Text
                      color={
                        entry.payload && entry.payload[`${entry.name} correct`]
                          ? "green"
                          : "red"
                      }
                    >
                      {(entry.value / 1000).toFixed(2)}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justify="space-between" w="100%" mt="2" mx="4" fontSize="sm">
            <Box w="100%">AVG Response Time: {avgResponseTime}s</Box>
            <Box w="100%">AVG Accuracy Rate: {avgAccuracyRate}%</Box>
          </Flex>
        </Box>
      )
    }
    return null
  }

  const handlePasswordSubmit = () => {
    if (password === "okgu") {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  if (!isAuthenticated) {
    return (
      <Center h="100vh">
        <Box p="4" bg="white" borderRadius="md" shadow="md">
          <Text mb="2" fontWeight="bold">
            Enter Password
          </Text>
          <Input
            mb="2"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Box>
      </Center>
    )
  }

  const chartHeight = 300

  return (
    <Layout>
      <Grid
        templateColumns={`repeat(${gridColumn}, 1fr)`}
        p="6"
        bg="#fff"
        borderRadius="md"
        shadow="md"
      >
        <Button mb="8" onClick={() => fetchData()}>
          Fetch Data
        </Button>
        <GridItem>
          {isTableLoading ? (
            <Center h="600px">
              <Spinner />
            </Center>
          ) : (
            <>
              <Center>Test Environment</Center>
              <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                  barGap={1}
                  data={clusteredData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis
                    tickFormatter={(tick) => {
                      const val = convertSeconds(tick / 1000)
                      return val
                    }}
                  />
                  {/*<Tooltip />*/}
                  <Tooltip
                    content={
                      <CustomTooltip
                        active={undefined}
                        payload={undefined}
                        label={undefined}
                      />
                    }
                  />
                  {surveyData.map((_, index) => (
                    <Bar
                      key={index}
                      dataKey={`Survey ${index + 1}`}
                      barSize={4}
                    >
                      {clusteredData.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={getColors(entry[`Survey ${index + 1} correct`])}
                        />
                      ))}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
              <Center>Original Environment</Center>
              <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                  barGap={1}
                  data={oldClusteredData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis
                    tickFormatter={(tick) => {
                      const val = convertSeconds(tick / 1000)
                      return val
                    }}
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
                  {oldSurveyData.map((_, index) => (
                    <Bar
                      key={index}
                      dataKey={`Survey ${index + 1}`}
                      barSize={4}
                    >
                      {oldClusteredData.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={getColors(entry[`Survey ${index + 1} correct`])}
                        />
                      ))}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </GridItem>
      </Grid>
    </Layout>
  )
}

export default SurveyPage
{
}
