/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  HStack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react"
import { categoryAtom, filterAtom } from "../../../lib/state/eventFilter"
import { useAtom } from "jotai"
import { Select } from "@chakra-ui/react"
import { FiDelete, FiRefreshCcw } from "react-icons/fi"
import ToolTip from "../../layout/local/ToolTip"

const EventFilter = ({ categories, HandleView }) => {
  const [selectedFilter, setSelectedFilter] = useAtom(filterAtom)
  const [category, setCategory] = useAtom(categoryAtom)

  const handleCheckboxChange = (newSelectedFilters) => {
    setSelectedFilter(newSelectedFilters)
  }

  const handleClearBtn = () => {
    setSelectedFilter("all")
    setCategory("")
  }

  return (
    <Box mx="-2">
      <Flex direction={["column", "row"]} w="100%" m="4" pr="8">
        <Flex align="center" gap={4} w="100%">
          <HandleView />
          <Box>
            <RadioGroup
              colorScheme="purple"
              //defaultValue={"all"}
              onChange={handleCheckboxChange}
              value={selectedFilter}
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
                value={category}
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
          <ToolTip label="Clear Filter">
            <Box>
              <Button
                borderRadius="xl"
                shadow="sm"
                onClick={handleClearBtn}
                size="sm"
              >
                <FiRefreshCcw />
              </Button>
            </Box>
          </ToolTip>
        </Flex>
      </Flex>
    </Box>
  )
}

export default EventFilter
