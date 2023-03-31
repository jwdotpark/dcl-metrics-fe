import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import useSWR from "swr"
import { ResponsiveBar } from "@nivo/bar"
import { Box, Text, Center, Spinner, useColorModeValue } from "@chakra-ui/react"
import moment from "moment"
import BottomLegend from "./partial/BottomLegend"
import { lineChartAtom } from "../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const ActiveUsers = () => {
  const chartData = []
  const color = ["#6272a4"]

  const fetcher = (url) => fetch(url).then((r) => r.json())
  const endpoint =
    "https://cdn-data.decentraland.org/public/monthly/active-users.json"

  const { data, error, isLoading } = useSWR(endpoint, fetcher)
  const rawData = data && data.values

  data &&
    rawData.map((item) => {
      chartData.push({
        id: moment(item[0]).format("YYYY-MM-DD"),
        value: item[1],
      })
    })

  return (
    <BoxWrapper colSpan={3}>
      <BoxTitle
        name={`Active Users`}
        date={""}
        avgData={[]}
        slicedData={{}}
        color={color}
        description={`Unique users that have logged into Decentraland and moved out of their initial tile`}
        line={{}}
        setLine={{}}
      />
      {!isLoading && !error ? (
        <Box mb="4">
          <MyResponsiveBar data={chartData} />
          <BottomLegend
            description={"Source from"}
            link="https://status.decentraland.org/metrics"
          />
        </Box>
      ) : (
        <Box>
          <Center h="350">
            <Spinner />
          </Center>
        </Box>
      )}
    </BoxWrapper>
  )
}

export default ActiveUsers

const MyResponsiveBar = ({ data }) => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  return (
    <Box h={chartProps.height}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="id"
        margin={{ top: 30, right: 20, bottom: 50, left: 70 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["#6272a495"]}
        borderRadius={0}
        borderWidth={2}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => moment(value).format("YYYY MMM"),
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        ariaLabel="active users bar chart"
        theme={{
          textColor: useColorModeValue("black", "white"),
          fontSize: 12,
          grid: {
            line: {
              stroke: "gray",
              opacity: 0.25,
              strokeDasharray: "1 1",
            },
          },
        }}
        tooltip={({ label, value }) => (
          <Box
            sx={{ backdropFilter: "blur(5px)" }}
            p="2"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={useColorModeValue("whiteAlpha.700", "blackAlpha.500")}
            borderRadius="xl"
            shadow="md"
          >
            <Box mb="1" fontWeight="bold">
              <Text fontSize="sm">
                {moment(label.slice(-10)).format("YYYY MMMM")}
              </Text>
            </Box>
            <Center>
              <Box boxSize="15px" mr="2" bg="#6272a4" borderRadius="full" />
              <Text fontSize="sm">Users: {value}</Text>
            </Center>
          </Box>
        )}
        animate={true}
      />
    </Box>
  )
}
