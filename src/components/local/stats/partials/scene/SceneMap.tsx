import {
  Flex,
  Image,
  Box,
  useColorModeValue,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  ButtonGroup,
  Text,
  useDisclosure,
  PopoverFooter,
} from "@chakra-ui/react"

const SceneMap = (props) => {
  const { url, height, name } = props
  const { isOpen, onToggle, onClose } = useDisclosure()

  const centerCoord = url.split("center=")[1].split("&")[0].split(",")
  const jumpInUrl = `https://play.decentraland.org/?position=${centerCoord[0]}%2C${centerCoord[1]}`

  return (
    <Box
      overflow="hidden"
      w="100%"
      h={height}
      border="3px solid"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      borderRadius="xl"
      shadow="md"
      onMouseEnter={onToggle}
      onMouseLeave={onClose}
    >
      <Popover isOpen={isOpen} onClose={onClose} placement="left">
        <PopoverTrigger>
          <Image
            w="100%"
            h="100%"
            objectFit="cover"
            alt="map image"
            src={url}
          />
        </PopoverTrigger>
        <PopoverContent
          bg={useColorModeValue("gray.50", "gray.900")}
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.800")}
          shadow="md"
        >
          <PopoverArrow
            bg={useColorModeValue("gray.50", "gray.900")}
            border="1px solid"
            borderColor={useColorModeValue("gray.50", "gray.900")}
          />
          <PopoverBody>
            <Flex dir="column">
              <Box>
                <Text>Would you like to jump into {name}?</Text>
              </Box>
            </Flex>
          </PopoverBody>
          <PopoverFooter justifyContent="flex-end" display="flex">
            <ButtonGroup size="sm">
              <Button
                color={useColorModeValue("#fff", "#fff")}
                bg={useColorModeValue("#6272a4", "#bd93f9")}
              >
                <a target="_blank" href={jumpInUrl} rel="noopener noreferrer">
                  Jump In!
                </a>
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default SceneMap
