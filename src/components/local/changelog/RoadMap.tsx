import {
  chakra,
  VStack,
  Heading,
  Box,
  Container,
  BoxProps,
  Text,
  Circle,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiCheckCircle } from "react-icons/fi"
import { roadmap } from "./roadmap"

const RoadMap = () => {
  const RoadMapList = () => {
    return (
      <>
        {roadmap
          // .slice(0)
          // .reverse()
          .map((change, i) => (
            <Box mb={3} textAlign="left" key={i}>
              <Heading fontSize="4xl" fontWeight="600" my={8}>
                {change.date}
              </Heading>
              {change.contents
                // .slice(0)
                // .reverse()
                .map((content, j) => {
                  return (
                    <Box key={j}>
                      <MilestoneItem icon={content.icon}>
                        <b>{content.title}</b>
                        <Text display="inline" ml="2" fontWeight="light">
                          {content.day}
                        </Text>
                        <Text fontSize="md">{content.description}</Text>
                      </MilestoneItem>
                    </Box>
                  )
                })}
            </Box>
          ))}
      </>
    )
  }

  return (
    <Container maxW="7xl" p={{ base: 2, sm: 10 }}>
      <VStack textAlign="start" align="start" mb={5}>
        <chakra.h3
          fontSize="4xl"
          fontWeight="bold"
          mb={18}
          textAlign="center"
          w="100%"
        >
          Roadmap
        </chakra.h3>
        <Box zIndex={5}>
          <RoadMapList />
        </Box>
      </VStack>
    </Container>
  )
}

interface MilestoneItemProps extends BoxProps {
  icon?: any
  boxProps?: BoxProps
  skipTrail?: boolean
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  icon = FiCheckCircle,
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  const color = useColorModeValue("gray.700", "gray.500")
  return (
    <Flex minH={24} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue("gray.600", "gray.500")}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box
          as={icon}
          size="1.25rem"
          color={color}
          pos="absolute"
          left="0.875rem"
          top="0.875rem"
        />
        {!skipTrail && <Box w="1px" flex={1} bg={color} my={1} />}
      </Flex>
      <Box pt={{ base: 1, sm: 2 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  )
}

export default RoadMap
