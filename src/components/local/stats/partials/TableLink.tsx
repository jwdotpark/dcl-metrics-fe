import {
  Box,
  Center,
  Button,
  Tooltip,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import dclLogo from "../../../../../public/dcl-logo.svg"
import etherscanLogo from "../../../../../public/etherscan-logo.svg"

const TableLink = (data) => {
  const dclLink = "https://market.decentraland.org/accounts/" + data.address
  const etherscanLink = "https://etherscan.io/address/" + data.address

  return (
    <Box>
      <ButtonGroup size="sm">
        <Link href={dclLink} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="xl"
              label="Decentraland"
              placement="auto"
            >
              <Button
                borderRadius="full"
                shadow="sm"
                _hover={{ filter: "brightness(75%)" }}
                bgColor={useColorModeValue("gray.300", "gray.500")}
                size="xs"
                variant="unstyled"
              >
                <Center w="100%" h="100%">
                  <Image
                    src={dclLogo}
                    alt="link logo"
                    width="18"
                    height="18"
                    objectFit="cover"
                  />
                </Center>
              </Button>
            </Tooltip>
          </a>
        </Link>

        <Link href={etherscanLink} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="xl"
              label="Etherscan"
              placement="auto"
            >
              <Button
                borderRadius="200"
                shadow="sm"
                _hover={{ filter: "brightness(75%)" }}
                bgColor={useColorModeValue("gray.300", "gray.500")}
                size="xs"
                variant="unstyled"
              >
                <Center w="100%" h="100%">
                  <Image
                    src={etherscanLogo}
                    alt="link logo"
                    width="18"
                    height="18"
                    objectFit="cover"
                  />
                </Center>
              </Button>
            </Tooltip>
          </a>
        </Link>
      </ButtonGroup>
    </Box>
  )
}

export default TableLink
