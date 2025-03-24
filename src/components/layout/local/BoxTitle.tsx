import { useColorModeValue, Box, Text, Flex, Spacer } from "@chakra-ui/react"
import { serifFont } from "../../../../pages/_app"
import AvgStat from "../../local/stats/partials/AvgStat"

const BoxTitle = ({
  name,
  description,
  date,
  avgData,
  slicedData,
  color,
  line,
  setLine,
}) => {
  return (
    <Box w="100%">
      <Flex direction={["column", "column", "row", "row"]} w="100%">
        <Box mt="4">
          <Flex direction="column" ml="5">
            <Box>
              <Text
                fontFamily={serifFont.style.fontFamily}
                fontSize="2xl"
                fontWeight="bold"
              >
                {name}
              </Text>
            </Box>
            {date !== "" && name !== "Land Picker" && (
              <Box mr="4">
                <Text color="gray.500" fontSize={["xs", "sm"]}>
                  {name} from {date.first} - {date.last}
                </Text>
              </Box>
            )}
            {date === "" && (
              <Box mr="4">
                <Text fontSize="xs" fontWeight="light">
                  {description}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
        <Spacer />
        <Box mt={[0, 2]} mr="4" pl={[3, 0]}>
          <AvgStat
            avgData={avgData}
            data={slicedData}
            color={color}
            line={line}
            setLine={setLine}
          />
        </Box>
      </Flex>
      <Box
        w="auto"
        mt="2"
        mb="4"
        mx="4"
        borderBottom="1px solid"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      />
    </Box>
  )
}

export default BoxTitle
