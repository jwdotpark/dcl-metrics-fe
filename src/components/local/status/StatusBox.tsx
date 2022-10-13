import { SimpleGrid, Box, useColorModeValue } from "@chakra-ui/react"
import GridBox from "../GridBox"
import ErrorBox from "../stats/error/ErrorBox"

const StatusBox = ({ data }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const successRate = (success, total) => {
    return (success / total) * 100
  }

  const successArr = Object.entries(data).map((item) => {
    // @ts-ignore
    return successRate(item[1].success_count, item[1].total_count)
  })

  const isError = successArr.some((item) => item < 75)

  return (
    <Box w="100%">
      <ErrorBox isError={isError} />
      <SimpleGrid gap={4} columns={[1, 2]}>
        {data.map((item, i) => (
          <GridBox box={box} key={i} w="100%" border="1px solid red">
            <Box m="4">
              <Box>
                Success rate:{" "}
                {successRate(item.success_count, item.total_count)}
              </Box>
              <Box>Total count: {item.total_count}</Box>
              <Box>200: {item.statuses[200]}</Box>
              <Box>Success count: {item.success_count}</Box>
              <Box>Failure count: {item.failure_count}</Box>
              <Box>Failure rate: {item.failure_rate}</Box>
            </Box>
          </GridBox>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default StatusBox
