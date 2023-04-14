import {
  useColorModeValue,
  Box,
  Text,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react"
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
              <Text fontSize={["2xl", "xl"]}>
                <b>{name}</b>
              </Text>
            </Box>
            {date !== "" && name !== "Land Picker" && (
              <Box>
                <Text color="gray.500" fontSize="sm">
                  {name} from {date.first} - {date.last}
                </Text>
              </Box>
            )}
            {date === "" && (
              <Box>
                <Text color="gray.500" fontSize="sm">
                  {description}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
        <Spacer />
        <Box mt={[2, 4, 4, 4]} mr={[4, 4, 4, 4]} ml={[5, 4, 4, 4]}>
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
