import { Box, useColorModeValue } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"

const DatePicker = ({ date, setDate, availableDate }) => {
  const minDate = new Date(availableDate[0].replace(/-/g, "/"))
  const maxDate = new Date(
    availableDate[availableDate.length - 1].replace(/-/g, "/")
  )

  return (
    <Box
      w={["100%", "135px"]}
      border="2px solid"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <SingleDatepicker
        minDate={minDate}
        maxDate={maxDate}
        name="date-input"
        date={date}
        onDateChange={setDate}
        propsConfigs={{
          popoverCompProps: {
            popoverBodyProps: {
              borderRadius: "xl",
              shadow: "md",
              bg: useColorModeValue("gray.50", "gray.800"),
              border: "none",
            },
            popoverContentProps: {
              borderRadius: "xl",
              shadow: "md",
            },
          },
          dateNavBtnProps: {
            colorScheme: "gray",
            variant: "solid",
            size: "xs",
            borderRadius: "xl",
          },
          dayOfMonthBtnProps: {
            defaultBtnProps: {
              border: "none",
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
              bg: useColorModeValue("gray.100", "gray.700"),
              color: useColorModeValue("#ff5555", "#50fa7b"),
              fontWeight: "bold",
            },
            todayBtnProps: {
              bg: useColorModeValue("teal.100", "teal.700"),
              borderColor: useColorModeValue("teal.100", "teal.700"),
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
