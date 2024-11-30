/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import {
  Button,
  Center,
  Flex,
  Text,
  Box,
  Table,
  Tr,
  Td,
  Tbody,
  useToast,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import SceneProfilePicture from "./SceneProfilePicture"
import TableLink from "../TableLink"
import TruncateName from "../TruncatedName"
import { formatDuration, intervalToDuration } from "date-fns"
import ToolTip from "../../../../layout/local/ToolTip"
import Link from "next/link"

const SceneMarathonUsers = ({ data }) => {
  const toast = useToast()
  const handleToast = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch (e) {
      console.log(e)
    } finally {
      toast({
        description: "Address has been copied to the clipboard.",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
        status: "success",
        variant: "subtle",
      })
    }
  }

  const dataArr = Object.entries(data)

  const MarathonUserTable = () => {
    const responsiveStr = useBreakpointValue({
      xs: 5,
      sm: 5,
      md: 15,
      lg: 15,
      xl: 30,
      base: 10,
    })
    const truncateName = (name: string) => {
      const nameLength = responsiveStr
      if (name && name.length > nameLength) {
        return name.slice(0, nameLength) + ".."
      }
      return name
    }
    return (
      <Box
        overflowY="hidden"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Table h="480px" colorScheme="blackAlpha" size="sm" variant="striped">
          <Tbody>
            {dataArr.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Flex w="50px" h="30px">
                    <Center w="10px">{index + 1}</Center>
                    <Box display="inline-block" ml="4">
                      <SceneProfilePicture
                        address={item[1].avatar_url}
                        verified={item[1].verified_user}
                        guest={item[1].guest_user}
                      />
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Link href={`/users/${item[1].address}`} target="_blank">
                    <Text color="blue.500" fontSize="xs" fontWeight="bold">
                      {item[1].name ? TruncateName(item[1].name) : "N/A"}
                    </Text>
                  </Link>
                </Td>
                <Td
                  onClick={() =>
                    handleToast(item[1].address ? item[1].address : "")
                  }
                >
                  <Button size="xs" variant="link">
                    <Text
                      as="kbd"
                      _hover={{ color: "gray.600", cursor: "pointer" }}
                    >
                      {item[1].address ? truncateName(item[1].address) : "N/A"}
                    </Text>
                  </Button>
                </Td>
                <Td isNumeric>
                  <Text fontSize="xs" wordBreak="keep-all">
                    {formatDuration(
                      intervalToDuration({
                        start: 0,
                        end: item[1].time_spent * 60 * 1000,
                      }),
                      { format: ["days", "hours", "minutes", "seconds"] }
                    )}
                  </Text>
                </Td>
                <Td>
                  <TableLink address={item[1].address ? item[1].address : ""} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    )
  }
  return (
    <Box
      h="520px"
      bg={useColorModeValue("white", "gray.700")}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <ToolTip label="This table shows the top 10 users who have spent the most time in the scene">
        <Box p="4">
          <MarathonUserTable />
        </Box>
      </ToolTip>
    </Box>
  )
}

export default SceneMarathonUsers
