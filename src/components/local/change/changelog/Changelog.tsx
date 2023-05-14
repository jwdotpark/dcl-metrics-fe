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
import { minorchangeTemplate } from "./changelog"

const ChangeLog = () => {
  const ChangeList = () => {
    return (
      <>
        {minorchangeTemplate.map((change, i) => (
          <Box key={i} mb={3} textAlign="left">
            <Heading my={8} fontSize="4xl" fontWeight="600">
              {change.date}
            </Heading>
            {change.contents.map((content, j) => {
              return (
                <Box key={j} mr="8">
                  <MilestoneItem
                    icon={content.icon}
                    skipTrail={j === change.contents.length - 1 && true}
                  >
                    <Text fontWeight="bold">{content.title}</Text>
                    <Text
                      my="4"
                      // eslint-disable-next-line
                      color={useColorModeValue("gray.600", "gray.400")}
                      fontSize="sm"
                      wordBreak="break-word"
                    >
                      {content.description}
                    </Text>
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
    <Container maxW="7xl" ml="4" p={{ base: 2, sm: 10 }}>
      <VStack align="start" mb={2} textAlign="start">
        <chakra.h3
          fontSize="4xl"
          fontWeight="bold"
          my={4}
          textAlign="center"
          w="100%"
        >
          Changelog
        </chakra.h3>
        <Box zIndex={1}>
          <ChangeList />
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
      <Flex pos="relative" align="center" direction="column" mr={4}>
        <Circle
          bg={useColorModeValue("gray.600", "gray.500")}
          opacity={useColorModeValue(0.07, 0.15)}
          size={12}
        />
        <Box
          as={icon}
          pos="absolute"
          top="1rem"
          left="1rem"
          color={color}
          size="1rem"
        />
        {!skipTrail && <Box flex={1} w="2px" my={1} bg="gray.400" />}
      </Flex>
      <Box pt={{ base: 1, sm: 2 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  )
}

export default ChangeLog
