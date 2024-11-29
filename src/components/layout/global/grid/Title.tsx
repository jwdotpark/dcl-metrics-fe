import { Box, Text, Flex, Spacer, Center } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import {
  FiAlertCircle,
  FiArrowDown,
  FiArrowUp,
  FiCalendar,
} from "react-icons/fi"
import { Handle } from "./Handle"

export const Title = ({ title, description, payload }) => {
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
        {!isMobile &&
          payload &&
          payload.map((item, index) => (
            <Center key={index} w="100%">
              <Flex w="100%" mr="4">
                <Spacer />

                <Flex direction="row" mr="2">
                  <Box sx={{ transform: "translateY(4px)" }} mr="1">
                    {item.payload.degraded ? (
                      <FiAlertCircle color="#ef4444" />
                    ) : (
                      <FiCalendar />
                    )}
                  </Box>
                  <Box>
                    <Text
                      color={item.payload.degraded && "#ef4444"}
                      fontWeight="light"
                    >
                      {format(new Date(item.payload.date), "yyyy MMM d")}
                    </Text>
                  </Box>
                </Flex>

                <Flex direction="row" mr="2">
                  <Box>
                    <Text color={item.stroke} fontWeight="bold">
                      {item.value}
                    </Text>
                  </Box>
                </Flex>

                <Flex direction="row">
                  <Box sx={{ transform: "translateY(4px)" }} mr="0">
                    {item.value - payload[0].avg > 0 ? (
                      <FiArrowUp color="#22c55e" />
                    ) : (
                      <FiArrowDown color="#ef4444" />
                    )}
                  </Box>
                  <Box>
                    <Text
                      color={
                        item.value - payload[0].avg > 0 ? "#22c55e" : "#ef4444"
                      }
                      fontWeight="bold"
                    >
                      {item.value - payload[0].avg}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Center>
          ))}
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
