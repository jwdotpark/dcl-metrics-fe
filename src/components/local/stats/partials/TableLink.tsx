import {
  Box,
  Center,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import dclLogo from "../../../../../public/dcl-logo.svg"
import etherscanLogo from "../../../../../public/etherscan-logo.svg"
import ToolTip from "../../../layout/local/ToolTip"

const TableLink = ({ address }) => {
  const dclLink = "https://market.decentraland.org/accounts/" + address
  const etherscanLink = "https://etherscan.io/address/" + address

  return (
    <Box>
      <ButtonGroup size="sm">
        <Link href={dclLink} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <ToolTip label="Decentraland">
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
            </ToolTip>
          </a>
        </Link>

        <Link href={etherscanLink} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <ToolTip label="Etherscan">
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
            </ToolTip>
          </a>
        </Link>
      </ButtonGroup>
    </Box>
  )
}

export default TableLink
