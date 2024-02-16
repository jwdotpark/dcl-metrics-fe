/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { categoryAtom, filterAtom } from "../../../lib/state/eventFilter"
import { useAtom } from "jotai"
import { Select } from "@chakra-ui/react"

const EventFilter = ({ categories, HandleView }) => {
  const [selectedFilter, setSelectedFilter] = useAtom(filterAtom)
  const [category, setCategory] = useAtom(categoryAtom)

  const handleCheckboxChange = (newSelectedFilters) => {
    setSelectedFilter(newSelectedFilters)
  }

  return (
    <Box
      m="2"
      mb="4"
      py="1"
      bg={useColorModeValue("white", "gray.700")}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
      borderRadius="xl"
      shadow="md"
    >
      <Flex direction={["column", "row"]} w="100%" m="4" pr="8">
        <Flex align="center" gap={4} w="100%">
          <HandleView />
          <Box>
            <RadioGroup
              colorScheme="purple"
              defaultValue={"all"}
              onChange={handleCheckboxChange}
            >
              <HStack gap="4">
                <Radio value="all">All</Radio>
                <Radio value="oneoff">One-Off Event</Radio>
                <Radio value="regular">Regular Event</Radio>
              </HStack>
            </RadioGroup>
          </Box>
          <Box>
            <Flex align="center" direction="row">
              <Select
                borderRadius="lg"
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
                placeholder="Category"
                size="sm"
                variant="outline"
              >
                {categories.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category.toUpperCase()}
                    </option>
                  )
                })}
              </Select>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default EventFilter
