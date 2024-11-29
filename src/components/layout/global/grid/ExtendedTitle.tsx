import { Box, Text, Flex, Spacer, Center, Divider } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { FiArrowDown, FiArrowUp, FiCalendar } from "react-icons/fi"
import { Handle } from "./Handle"

export const ExtendedTitle = ({ title, description, payload }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth])

  return (
    <Box mb="4" ml="2">
      <Flex direction="row">
        <Center>
          <Text fontSize="2xl" fontWeight="bold" whiteSpace="nowrap">
            {title}
          </Text>
        </Center>
        <Spacer />
        <Flex direction="row">
          <Box sx={{ transform: "translateY(10px)" }} mr="1">
            <FiCalendar />
          </Box>
          <Box sx={{ transform: "translateY(6px)" }} mr="4" fontWeight="light">
            {payload && format(new Date(payload[0].payload.date), "yyyy MMM d")}
          </Box>
        </Flex>
        <Flex mr="4">
          {!isMobile &&
            payload &&
            payload.map((item, index) => {
              const avgValue = item.avg
              return (
                <Center key={index} w="100%" mr="6">
                  <Flex w="100%">
                    <Spacer />
                    <Flex direction="row" mr="1">
                      <Box>
                        <Text mr="1" color={item.stroke} fontWeight="bold">
                          {item.value}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex direction="row">
                      <Box sx={{ transform: "translateY(4px)" }} mr="0">
                        {item.value - avgValue > 0 ? (
                          <FiArrowUp color="#22c55e" />
                        ) : (
                          <FiArrowDown color="#ef4444" />
                        )}
                      </Box>
                      <Box>
                        <Text
                          color={
                            item.value - avgValue > 0 ? "#22c55e" : "#ef4444"
                          }
                          fontWeight="bold"
                        >
                          {item.value - avgValue}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Center>
              )
            })}
        </Flex>
        <Center>
          <Handle />
        </Center>
      </Flex>
      <Box>
        <Text fontSize="xs" fontWeight="light">
          {description}
        </Text>
      </Box>
    </Box>
  )
}
