import { Box, Text, VStack, Center, Button } from "@chakra-ui/react"
import { FiMessageSquare } from "react-icons/fi"

export const SurveyIntro = ({ step, handleStartSurvey }) => {
  const handleProceed = () => {
    handleStartSurvey()
  }

  return (
    <>
      {step === 0 && (
        <VStack>
          <Box mb="8">
            <Center mb="4">
              <Text mb="4" fontSize="2xl" fontWeight="bold">
                Welcome to our survey!
              </Text>
            </Center>
            <Text m="2">
              We appreciate your support to help us improve our website. Your
              feedback is invaluable in enhancing the user experience. If you
              have any questions or feedback during the survey, feel free to use
              the message button
              <Box
                as={FiMessageSquare}
                sx={{ transform: "translateY(3px)" }}
                display="inline-block"
                w="14px"
                mr="1"
              />
              on the top bar.
            </Text>
            <Text m="2" my="4" fontWeight="black">
            Please complete the survey without pausing, as response time is recorded. It takes up to 10 minutes!
            </Text>
            <Text m="2">
              To begin the survey, please click &quot;Start&quot;.
            </Text>
          </Box>
          <Button
            shadow="md"
            colorScheme="green"
            onClick={handleProceed}
            size="lg"
            variant="solid"
          >
            Start
          </Button>
        </VStack>
      )}
    </>
  )
}
