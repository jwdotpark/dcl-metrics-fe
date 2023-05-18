/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
  Box,
  useColorModeValue,
  Flex,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@chakra-ui/react"
import { FiMenu } from "react-icons/fi"

const MapMenu = ({
  heatmapProperties,
  selectedProp,
  setSelectedProp,
  btnBg,
}) => {
  const formatName = (name) => {
    return name
      .replace(/_/g, " ")
      .replace("intensity", "")
      .replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
  }

  const HeatmapLegend = () => {
    const heatmapGradient =
      "linear-gradient(90deg, rgba(0,3,255,1) 0%, rgba(3,255,0,1) 50%, rgba(255,0,0,1) 100%)"
    return (
      <Popover>
        <PopoverTrigger>
          <Button
            zIndex="banner"
            w={[20, 20, 20, 40]}
            h="auto"
            ml="2"
            bg={useColorModeValue("gray.200", "gray.900")}
            borderRadius="xl"
            shadow="md"
            size="sm"
          >
            <Center w="100%">
              <Box
                w="100%"
                h="3"
                px="2"
                bg={heatmapGradient}
                borderRadius="xl"
                shadow="sm"
              />
            </Center>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          bg={useColorModeValue("gray.200", "gray.900")}
          borderRadius="xl"
        >
          <PopoverArrow />
          <PopoverBody>
            <Box>
              <Center pb="2">
                <Text fontSize="xs">Heatmap Intensity Level</Text>
              </Center>
              <Center w="100%">
                <Box
                  w="100%"
                  h="3"
                  bg={heatmapGradient}
                  borderRadius="xl"
                  shadow="sm"
                />
              </Center>
              <Flex as="kbd" w="100%" pl="1" fontSize="xs" dir="row">
                <Box>0</Box>
                <Spacer />
                <Box>25</Box>
                <Spacer />
                <Box>50</Box>
                <Spacer />
                <Box>75</Box>
                <Spacer />
                <Box>100(%)</Box>
              </Flex>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }

  const MapMenuList = () => {
    return (
      <>
        {heatmapProperties.map((property) => {
          return (
            <MenuItem
              className={`umami--click--heatmap_` + property.name}
              key={property.name}
              justifyContent="flex-end"
              bg={useColorModeValue("gray.50", "gray.900")}
              onClick={() => {
                setSelectedProp(property)
              }}
            >
              <Text fontSize="sm">{formatName(property.name)}</Text>
            </MenuItem>
          )
        })}
      </>
    )
  }

  return (
    <Flex dir="row">
      <Menu isLazy={true}>
        <MenuButton
          as={Button}
          bg={btnBg}
          borderRadius="xl"
          shadow="md"
          aria-label="Options"
          leftIcon={<FiMenu />}
          size="sm"
          variant="solid"
        >
          {formatName(selectedProp.name)}
        </MenuButton>
        <MenuList
          bg={useColorModeValue("gray.50", "gray.900")}
          borderRadius="xl"
          rootProps={{ width: "100%" }}
        >
          <MapMenuList />
        </MenuList>
      </Menu>
      <HeatmapLegend />
    </Flex>
  )
}

export default MapMenu
