import { Box, Text, Progress, useColorModeValue } from "@chakra-ui/react"
import { inquiries } from "./statics"

export const ProgressBar = ({ step, progress }) => {
  return (
    <>
      {step > 0 && (
        <Box pos="relative" mb={4}>
          <Progress
            h="20px"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={useColorModeValue("gray.300", "gray.600")}
            borderRadius="md"
            value={progress}
          />
          <Text
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            whiteSpace="nowrap"
          >
            {step} / {inquiries.length}
          </Text>
        </Box>
      )}
    </>
  )
}
