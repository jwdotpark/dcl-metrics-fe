/* eslint-disable no-unused-vars */
import {
  useColorModeValue,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Center,
} from "@chakra-ui/react"
import { categoryAtom, filterAtom } from "../../../lib/state/eventFilter"
import { useAtom } from "jotai"
import { Select as MultiSelect } from "chakra-react-select"
import { useState } from "react"

const EventFilter = ({ filters, HandleView }) => {
  const [selectedFilter, setSelectedFilter] = useAtom(filterAtom)
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom)

  const handleCheckboxChange = (newSelectedFilters) => {
    setSelectedFilter(newSelectedFilters)
  }

  const categoryData = filters.map((category) => {
    return {
      value: category,
      label: category.toUpperCase(),
    }
  })

  const groupedOptions = [
    {
      label: "Categories",
      options: categoryData,
    },
  ]

  return (
    <Flex direction={["column", "row"]} w="100%" mt={[8, 0]} mb="-2" pl="4">
      <Flex align="center" minW="40%">
        <HandleView />
        <Box>
          <RadioGroup
            colorScheme="purple"
            defaultValue={"all"}
            onChange={handleCheckboxChange}
          >
            <Stack direction={["row"]} spacing={[1, 5]}>
              <Radio value="all">All</Radio>
              <Radio value="oneoff">One-Off Event</Radio>
              <Radio value="regular">Regular Event</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
      <Box zIndex="banner" w="100%" mx={[-4, 0]}>
        <FormControl p={4}>
          <MultiSelect
            variant="filled"
            isMulti
            name="categories"
            colorScheme="purple"
            options={groupedOptions}
            placeholder="Select Categories.."
            closeMenuOnSelect={false}
            // @ts-ignore
            onChange={(value) => setSelectedCategory(value)}
          />
        </FormControl>
      </Box>
    </Flex>
  )
}

export default EventFilter
