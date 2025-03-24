import { Box, Flex, ButtonGroup, Button, Spacer } from "@chakra-ui/react"
import { inquiries } from "./statics"

export const SurveyContents = ({
  step,
  prevStep,
  formData,
  nextStep,
  handleSubmit,
  setIsResetOpen,
}) => {
  return (
    <>
      {step > 0 && (
        <Box
          pos="absolute"
          bottom="16px"
          left="50%"
          w="100%"
          transform="translateX(-50%)"
        >
          <Flex px="4">
            <Box>
              <ButtonGroup isAttached>
                {step > 1 && (
                  <Button onClick={prevStep} variant="outline">
                    Previous
                  </Button>
                )}
                {step < inquiries.length && (
                  <Button
                    colorScheme="green"
                    disabled={!formData[`step${step}`]?.answer}
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </Box>
            <Spacer />
            <Box>
              {step === inquiries.length && (
                <Button
                  mx="4"
                  colorScheme="green"
                  disabled={!formData[`step${step}`]?.answer}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
              <Button
                colorScheme="yellow"
                onClick={() => setIsResetOpen(true)}
                variant="outline"
              >
                Reset
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  )
}
