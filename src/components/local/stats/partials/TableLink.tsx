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
        <Link href={dclLink}>
          <a target="_blank" rel="noopener noreferrer">
            <Tooltip
              label="Decentraland"
              placement="auto"
              fontSize="sm"
              borderRadius="md"
            >
              <Button
                backgroundColor={useColorModeValue("gray.300", "gray.500")}
                variant="unstyled"
                size="sm"
                borderRadius="200"
                boxShadow="sm"
                _hover={{ filter: "brightness(90%)" }}
              >
                <Center h="100%" w="100%">
                  <Image
                    src={dclLogo}
                    alt="link logo"
                    width="28px"
                    height="28px"
                    objectFit="cover"
                  />
                </Center>
              </Button>
            </Tooltip>
          </a>
        </Link>

        <Link href={etherscanLink}>
          <a target="_blank" rel="noopener noreferrer">
            <Tooltip
              label="Etherscan"
              placement="auto"
              fontSize="sm"
              borderRadius="md"
            >
              <Button
                backgroundColor={useColorModeValue("gray.300", "gray.500")}
                variant="unstyled"
                size="sm"
                borderRadius="200"
                boxShadow="sm"
                _hover={{ filter: "brightness(90%)" }}
              >
                <Center h="100%" w="100%">
                  <Image
                    src={etherscanLogo}
                    alt="link logo"
                    width="28px"
                    height="28px"
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
