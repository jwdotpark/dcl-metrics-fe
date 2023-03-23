import { Box, Text, useColorModeValue } from "@chakra-ui/react"

export const CallOut = ({ children }) => {
  return (
    <Box
      mb="16"
      p="8"
      bg={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <Text fontSize="xl">{children}</Text>
    </Box>
  )
}

export const MDYoutube = ({ id }) => {
  return (
    <Box overflow="clip" my="4" borderRadius="xl">
      <iframe
        width="100%"
        height="450"
        src={"https://www.youtube.com/embed/" + id}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </Box>
  )
}
