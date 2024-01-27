/* eslint-disable react-hooks/rules-of-hooks */
import { useColorModeValue, Box, Text } from "@chakra-ui/react"

type TitleProps = {
  title: string
  description?: string
}

export const TitleHolder = ({ title, description }: TitleProps) => {
  return (
    <Box w="100%" mb="2" ml="8">
      <Text fontSize="sm" fontWeight="bold">
        {title}
        {description && (
          <Text
            color={useColorModeValue("gray.600", "gray.200")}
            fontSize="xs"
            fontWeight="light"
          >
            {description}
          </Text>
        )}
      </Text>
    </Box>
  )
}
