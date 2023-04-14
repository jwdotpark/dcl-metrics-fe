import {
  Box,
  Text,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useBreakpointValue,
} from "@chakra-ui/react"
import Link from "next/link"

const UserDAOActivityDelegators = ({ delegators }) => {
  const responsiveStr = useBreakpointValue({
    xs: 5,
    sm: 5,
    md: 50,
    lg: 20,
    xl: 50,
    base: 20,
  })

  const truncateName = (name: string) => {
    const nameLength = responsiveStr
    if (name && name.length > nameLength) {
      return name.slice(0, nameLength) + ".."
    }
    return name
  }

  return (
    <>
      <Flex w="100%" h="100%">
        <Box>Delegators</Box>
        <Spacer />
        <Box>
          <Popover placement="left">
            <PopoverTrigger>
              <Button
                borderRadius="xl"
                disabled={delegators.length > 0 ? false : true}
                size="sm"
                variant="solid"
              >
                <Text>{delegators.length > 0 ? delegators.length : "N/A"}</Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent w="auto" borderRadius="xl">
              <PopoverArrow />
              <PopoverBody overflowY="scroll">
                <Box>
                  {delegators.length > 0 &&
                    delegators.map((item) => {
                      return (
                        <Flex key={item} mb="2">
                          <Button shadow="md" size="sm" variant="solid">
                            <Link href={`/users/${item}`} target="_blank">
                              <Text as="kbd">{truncateName(item)}</Text>
                            </Link>
                          </Button>
                        </Flex>
                      )
                    })}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
    </>
  )
}

export default UserDAOActivityDelegators
