/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text, Flex } from "@chakra-ui/react"
import CountUp from "react-countup"
import { convertSeconds } from "../../../../lib/hooks/utils"
import ToolTip from "../../../layout/local/ToolTip"

const AvgStat = ({ avgData, data, color, line, setLine }) => {
  if (typeof avgData === "number") {
    avgData = [
      {
        id: "Average",
        value: avgData,
      },
    ]
  }

  const dateStr = (val) => (typeof val === "number" ? val : val.length)

  const tooltipStr = (id, data) => {
    const tooltip = `${id} for ${dateStr(data)} days`
    return (
      (id === "Total Mana" ||
        id === "Total Rentals" ||
        id === "Average Value") &&
      tooltip
    )
  }

  return (
    <Box>
      <Flex>
        {typeof avgData === "object" &&
          avgData.map((item, i) => (
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
                    {color[0] === "#ff5555" ? (
                      convertSeconds(item.value)
                    ) : color[0] === "#ff79c6" ? (
                      item.value.toFixed(1)
                    ) : (
                      <CountUp end={item.value} duration={0.5} />
                    )}
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
          ))}
      </Flex>
    </Box>
  )
}

export default AvgStat
