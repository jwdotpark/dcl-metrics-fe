import { Box, useColorModeValue } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { useState } from "react"

const DatePicker = () => {
  const [date, setDate] = useState(new Date())
  return (
    <Box
      w="135px"
      border="2px solid"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <SingleDatepicker
        name="date-input"
        date={date}
        onDateChange={setDate}
        propsConfigs={{
          popoverCompProps: {
            popoverBodyProps: {
              borderRadius: "xl",
              shadow: "md",
              bg: useColorModeValue("gray.100", "gray.600"),
            },
            popoverContentProps: {
              borderRadius: "xl",
              shadow: "md",
            },
          },
          dateNavBtnProps: {
            colorScheme: "gray",
            variant: "solid",
            borderRadius: "xl",
          },
          dayOfMonthBtnProps: {
            defaultBtnProps: {
              borderRadius: "xl",
              bg: useColorModeValue("gray.200", "gray.700"),
              borderColor: useColorModeValue("gray.200", "gray.600"),
              _hover: {
                background: useColorModeValue("gray.300", "gray.500"),
              },
            },
            isInRangeBtnProps: {
              color: "green.400",
            },
            selectedBtnProps: {
              background: useColorModeValue("gray.100", "gray.700"),
              color: useColorModeValue("#ff5555", "#50fa7b"),
              fontWeight: "bold",
            },
            todayBtnProps: {
              background: useColorModeValue("gray.300", "gray.600"),
              borderColor: useColorModeValue("gray.200", "gray.600"),
            },
          },
        }}
        configs={{
          dateFormat: "MMM. d yyyy",
        }}
      />
    </Box>
  )
}

export default DatePicker
