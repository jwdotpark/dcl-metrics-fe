/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react"
import CountUp from "react-countup"

const AvgStat = ({ avgData, data, color }) => {
  if (typeof avgData === "number") {
    avgData = [
      {
        id: "Average Value",
        value: avgData,
      },
    ]
  }

  //FIXME
  if (color.length === 4) {
    color = ["#48BB78", "#9F7AEA", "#4299E1", "#F56565"]
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
                  ml="2"
                  color="gray.500"
                  fontSize="sm"
                >
                  <Flex direction="column">
                    <Tooltip
                      p="2"
                      fontSize="sm"
                      borderRadius="xl"
                      label={tooltipStr(item.id, data)}
                      placement="top"
                    >
                      <Box
                        mr="2"
                        color={color[i]}
                        fontSize={["xl", "xl", "2xl", "2xl"]}
                        fontWeight="bold"
                        textAlign={["start", "start", "end", "end"]}
                        _hover={{ cursor: "pointer" }}
                      >
                        <CountUp end={item.value} duration={0.5} />
                      </Box>
                    </Tooltip>
                    <Box
                      minW={[0, 0, "auto", 140]}
                      mr="2"
                      textAlign={["start", "start", "end", "end"]}
                    >
                      <Text
                        display="inline-block"
                        fontSize={[10, "sm"]}
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
