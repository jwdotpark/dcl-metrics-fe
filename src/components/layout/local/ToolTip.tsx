import { Tooltip, useColorModeValue } from "@chakra-ui/react"

const ToolTip = ({ children, label }) => {
  return (
    <Tooltip
      sx={{ backdropFilter: "blur(5px)" }}
      px="2"
      py="1"
      color={useColorModeValue("black", "white")}
      fontSize="xs"
      fontWeight="semibold"
      bg={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
      label={label}
      placement="left"
    >
      {children}
    </Tooltip>
  )
}

export default ToolTip
