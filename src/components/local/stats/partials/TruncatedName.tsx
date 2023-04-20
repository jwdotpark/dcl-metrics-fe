import { Text, useToast, Box } from "@chakra-ui/react"
import ToolTip from "../../../layout/local/ToolTip"

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
        duration: 1000,
        isClosable: true,
        position: "bottom-right",
        status: "success",
        variant: "subtle",
      })
    }
  }

  const stringLimit = 13
  if (name.length > stringLimit) {
    return (
      <ToolTip label={name}>
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
      </ToolTip>
    )
  }
  return name
}

export default TruncateName
