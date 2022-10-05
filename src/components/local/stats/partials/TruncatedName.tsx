import { Tooltip, Text } from "@chakra-ui/react"

const TruncateName = (name: string) => {
  if (name.length > 30) {
    return (
      <Tooltip
        fontSize="sm"
        borderRadius="md"
        aria-label="A tooltip"
        label={name}
        placement="top"
      >
        <Text
          as="span"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {name.slice(0, 30) + ".."}
        </Text>
      </Tooltip>
    )
  }
  return name
}

export default TruncateName
