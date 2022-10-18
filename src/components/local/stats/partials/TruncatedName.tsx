import { Button, Tooltip, Text, useToast, Box } from "@chakra-ui/react"

const TruncateName = (name: string) => {
  const toast = useToast()
  const handleToast = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch (e) {
      console.log(e)
    } finally {
      toast({
        description: "POI " + value + " has been copied to the clipboard.",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
        status: "success",
        variant: "subtle",
      })
    }
  }


  const stringLimit = 22
  if (name.length > stringLimit) {
    return (
      <Tooltip
        p="2"
        fontSize="sm"
        borderRadius="xl"
        aria-label="A tooltip"
        label={name}
        placement="top"
      >
        <Text
          as="span"
          overflow="hidden"
          _hover={{ cursor: "pointer" }}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          onClick={() => handleToast(name)}
        >
          {name.slice(0, stringLimit) + ".."}
        </Text>
      </Tooltip>
    )
  }
  return name
}

export default TruncateName
