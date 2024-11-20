import React from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"
import { Brush, XAxis, AreaChart, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

export const BrushGrid = ({ chartData }) => {
  return (
    <Box mx="2" border="0px">
      <ResponsiveContainer width="100%" height={30}>
        <AreaChart syncId="anyId" dataKey="date" data={chartData}>
          <XAxis dataKey="date" hide={true} />
          <Brush
            dataKey="date"
            height={20}
            travellerWidth={12}
            stroke={useColorModeValue("#718096", "#EDF2F7")}
            fill={useColorModeValue("#EDF2F7", "#4A5568")}
            fillOpacity={0.5}
            tickFormatter={(tick) => {
              const date = new Date(tick)
              return format(date, "yyyy MMM d")
            }}
            leaveTimeOut={10000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
