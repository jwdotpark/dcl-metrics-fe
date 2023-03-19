/* eslint-disable react-hooks/rules-of-hooks */
import { Box, useColorModeValue, Select, Tooltip } from "@chakra-ui/react"

const CurveBtn = ({ setCurve }) => {
  return (
    <Box display="inline-block" mr="2">
      <Tooltip
        p="2"
        fontSize="sm"
        borderRadius="md"
        label="Chart curve"
        placement="auto"
      >
        <Select
          fontWeight="semibold"
          bg={useColorModeValue("gray.300", "gray.700")}
          border={useColorModeValue("gray.200", "gray.600")}
          borderRadius="md"
          shadow="md"
          onClick={(e) => setCurve((e.target as HTMLInputElement).value)}
          size="xs"
          variant="solid"
        >
          <option value="linear">Linear</option>
          <option value="basis">Basis</option>
          <option value="cardinal">Cardianal</option>
          <option value="natural">Natural</option>
          <option value="step">Step</option>
          <option value="stepAfter">stepAfter</option>
          <option value="stepBefore">stepBefore</option>
        </Select>
      </Tooltip>
    </Box>
  )
}

export default CurveBtn
