import { Box, Text, Flex, Spacer, Center } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiCalendar,
  FiMoreVertical,
} from "react-icons/fi"
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
        {!isMobile && (
          <Flex direction="row" fontSize="sm">
            <Box sx={{ transform: "translateY(12px)" }} mr="1">
              <FiCalendar />
            </Box>
            <Box
              sx={{ transform: "translateY(8px)" }}
              mr="4"
              fontWeight="light"
            >
              {payload &&
                format(new Date(payload[0].payload.date), "yyyy MMM d")}
            </Box>
          </Flex>
        )}

        <Flex>
          {!isMobile &&
            payload &&
            payload.map((item, index) => {
              const avgValue = item.avg
              return (
                <Center key={index} w="100%" mr="2" fontSize="sm">
                  <Flex w="100%">
                    <Spacer />
                    <Flex direction="row" mr="1">
                      <Box sx={{ transform: "translateY(5px)" }} mr="1">
                        <FiActivity size="13px" color={item.stroke} />
                      </Box>
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
                  <Center sx={{ transform: "translateY(1px)" }} ml="2">
                    <FiMoreVertical size="10px" />
                  </Center>
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
