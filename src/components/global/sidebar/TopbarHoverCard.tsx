import { Box, Center, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import Image from "next/image"

export const TopbarHoverCard = ({ name, image, description }) => {
  const bg = useColorModeValue("gray.50", "gray.600")
  const color = useColorModeValue("black", "white")
  const borderColor = useColorModeValue("gray.300", "gray.500")

  return (
    <Box
      p={2}
      color={color}
      bg={bg}
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      shadow="md"
    >
      <Flex alignContent="center" direction="column" w="200px">
        <Box overflow="hidden" rounded="md">
          <Image
            width={200}
            height={200}
            //layout='responsive'
            alt={name}
            src={image}
            quality={50}
            priority={true}
            loading="eager"
          />
        </Box>
        <Center w="100%" mt="2">
          <Text fontSize="xs" fontWeight="light" wordBreak="break-word">
            {description}
          </Text>
        </Center>
      </Flex>
    </Box>
  )
}
