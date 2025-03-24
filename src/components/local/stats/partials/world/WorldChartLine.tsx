import { Box, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  //AreaChart,
  //Area,
  ResponsiveContainer,
} from "recharts"
import { chartFormat } from "../../../../../lib/data/chart/chartInfo"
import { chartMargin } from "../../../../../lib/data/constant"
import { TitleHolder } from "./TitleHolder"

const WorldChartLine = ({ data }: any) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")

  const ToolTipComponent = (
    <Tooltip
      contentStyle={{
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        backgroundColor: useColorModeValue("#fff", "#171923"),
        borderColor: useColorModeValue("#fff", "#171923"),
      }}
      itemStyle={{
        fontSize: "12px",
        fontWeight: "bold",
        lineHeight: "7px",
      }}
      wrapperStyle={{
        fontSize: "12px",
      }}
      labelStyle={{
        fontSize: "14px",
        fontWeight: "bold",
        color: AxisFontColor,
        marginBottom: "4px",
      }}
      labelFormatter={(label) => {
        const date = new Date(label)
        return format(date, "yyyy MMMM d")
      }}
    />
  )

  return (
    <Box m="4">
      <Box mb="4">
        <TitleHolder
          title="Total World Count"
          description="Total count of DCL, ENS and both worlds"
        />
      </Box>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={150}
          height={200}
          data={data}
          syncId="anyId"
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
          <XAxis
            dataKey="date"
            fontSize={chartFormat.fontSize}
            tick={{ fill: AxisFontColor }}
            tickFormatter={(tick) => {
              const date = new Date(tick)
              return format(date, "MM/dd")
            }}
            interval={15}
          />
          <YAxis
            dataKey="total_world_count"
            fontSize={chartFormat.fontSize}
            tick={{ fill: AxisFontColor }}
          />
          {ToolTipComponent}
          <Line
            type="monotone"
            dataKey="total_world_count"
            stroke="#6272A4"
            fill="#6272A4"
            strokeWidth={2}
            strokeLinejoin="bevel"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="dcl_world_count"
            strokeWidth={2}
            stroke="#FF5555"
            fill="#FF5555"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="ens_world_count"
            stroke="#BD93F9"
            fill="#BD93F9"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <TitleHolder
        title="User Count"
        description="Total and average number of users in the world at the same time"
      />
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
          <XAxis
            dataKey="date"
            fontSize={chartFormat.fontSize}
            tickFormatter={(tick) => {
              const date = new Date(tick)
              return format(date, "MM/dd")
            }}
            tick={{ fill: AxisFontColor }}
            interval={15}
          />
          <YAxis
            dataKey="max_user_count"
            fontSize={chartFormat.fontSize}
            tick={{ fill: AxisFontColor }}
          />
          {ToolTipComponent}
          <Line
            type="monotone"
            dataKey="max_user_count"
            stroke="#8884d8"
            strokeWidth={2}
            fill="#8884d8"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="avg_user_count"
            stroke="#82ca9d"
            strokeWidth={2}
            fill="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <TitleHolder
        title="Occupied Worlds"
        description="Total and average number of occupied worlds"
      />
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
          <XAxis
            dataKey="date"
            fontSize={chartFormat.fontSize}
            tickFormatter={(tick) => {
              const date = new Date(tick)
              return format(date, "MM/dd")
            }}
            tick={{ fill: AxisFontColor }}
            interval={15}
          />
          <YAxis
            fontSize={chartFormat.fontSize}
            tick={{ fill: AxisFontColor }}
          />
          {ToolTipComponent}
          <Line
            type="monotone"
            dataKey="max_occupied_worlds"
            stroke="#C53030"
            strokeWidth={2}
            fill="#C53030"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="avg_occupied_worlds"
            stroke="#805AD5"
            strokeWidth={2}
            fill="#805AD5"
            dot={false}
          />
          <Brush
            dataKey="date"
            height={15}
            travellerWidth={10}
            stroke={useColorModeValue("#718096", "#EDF2F7")}
            fill={useColorModeValue("#EDF2F7", "#4A5568")}
            fillOpacity={0.5}
            tickFormatter={(tick) => {
              const date = new Date(tick)
              return format(date, "MMM dd")
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default WorldChartLine
