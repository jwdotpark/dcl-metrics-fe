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
import { FiPackage, FiHome, FiBarChart2, FiCheckCircle } from "react-icons/fi"
import { minorchangeTemplate } from "./changelog"

const ChangeLog = () => {
  const ChangeList = () => {
    return (
      <>
        {minorchangeTemplate.map((change, i) => (
          <Box mb={3} textAlign="left" key={i}>
            <Heading fontSize="4xl" fontWeight="600" my={8}>
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
                      fontSize="sm"
                      // eslint-disable-next-line
                      color={useColorModeValue("gray.600", "gray.400")}
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
    <Container maxW="7xl" p={{ base: 2, sm: 10 }} ml="4">
      <VStack textAlign="start" align="start" mb={2}>
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
        {!skipTrail && <Box w="2px" flex={1} bg="gray.400" my={1} />}
      </Flex>
      <Box pt={{ base: 1, sm: 2 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  )
}

export default ChangeLog
