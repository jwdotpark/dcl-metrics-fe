/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text, Flex } from "@chakra-ui/react"
import CountUp from "react-countup"
import ToolTip from "../../../layout/local/ToolTip"

const AvgStat = ({ avgData, data, color, line, setLine }) => {
  if (typeof avgData === "number") {
    avgData = [
      {
        id: "Average Value",
        value: avgData,
      },
    ]
  }

  const dateStr = (val) => {
    if (typeof val === "number") {
      return val
    } else {
      return val.length
    }
  }

  const tooltipStr = (id: string, data: number) => {
    if (
      id === "Total Volume of Mana" ||
      id === "Total Rentals" ||
      id === "Average Value"
    ) {
      return `${id} for ${dateStr(data)} days`
    }
    return `${id} average for ${dateStr(data)} days`
  }

  return (
    <Box>
      <Box>
        <Flex>
          {typeof avgData === "object" &&
            avgData.map((item, i) => {
              return (
                <Box
                  key={item.id}
                  w="100%"
                  minW={[0, 0, 100, 100]}
                  mt="2"
                  ml="2"
                  color="gray.500"
                  fontSize="sm"
                >
                  <Flex direction="column">
                    <ToolTip label={tooltipStr(item.id, data)}>
                      <Box
                        color={color[i]}
                        fontSize="xl"
                        fontWeight="bold"
                        textAlign={["start", "start", "end", "end"]}
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          if (line && Object.keys(line).length - 1 !== i)
                            setLine({
                              ...line,
                              [i]: !line[i],
                            })
                        }}
                      >
                        <CountUp end={item.value} duration={0.5} />
                      </Box>
                    </ToolTip>
                    <Box textAlign={["start", "start", "end", "end"]}>
                      <Text
                        display="inline-block"
                        fontSize={["xs", "sm"]}
                        noOfLines={1}
                      >
                        {item.id}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )
            })}
        </Flex>
      </Box>
    </Box>
  )
}

export default AvgStat
