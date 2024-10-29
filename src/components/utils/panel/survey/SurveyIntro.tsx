/* eslint-disable react/no-unescaped-entities */
import { Box, Text, VStack, Center, Button } from "@chakra-ui/react"

export const SurveyIntro = ({ step, handleStartSurvey }) => {
  const handleProceed = () => {
    handleStartSurvey()
  }

  return (
    <>
      {step === 0 && (
        <VStack spacing={4}>
          <Box>
            <Center mb="4">
              <Text mb="4" fontSize="2xl">
                Welcome to the survey!
              </Text>
            </Center>
            <Text m="4">
              This survey will help us improve the usability of our site. Please
              note that your responses will be recorded, and the time it takes
              to complete the survey will also be tracked. The data collected
              will be used to enhance your experience and improve the site's
              usability. If you have any questions or feedback, please let us
              know by using the message button on the top bar.
            </Text>
            <Text m="4">
              If you agree to participate, please click "Okay" to proceed with
              the survey.
            </Text>
          </Box>
          <Button onClick={handleProceed}>Okay</Button>
        </VStack>
      )}
    </>
  )
}
