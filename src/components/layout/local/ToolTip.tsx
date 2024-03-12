import { Tooltip, useColorModeValue } from "@chakra-ui/react"

const ToolTip = ({ children, label }) => {
  return (
    <Tooltip
      sx={{ backdropFilter: "blur(5px)" }}
      m="2"
      py="1"
      color={useColorModeValue("black", "white")}
      fontSize="xs"
      fontWeight="semibold"
      bg={useColorModeValue("gray.50", "gray.600")}
      border="1px solid"
      borderColor={useColorModeValue("gray.600", "gray.200")}
      borderRadius="xl"
      shadow="md"
      label={label}
      placement="auto"
    >
      {children}
    </Tooltip>
  )
}

export default ToolTip
