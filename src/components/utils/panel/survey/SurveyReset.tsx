import {
  useColorModeValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react"

export const SurveyReset = ({
  isResetOpen,
  cancelRef,
  onCloseReset,
  resetSurvey,
}) => {
  return (
    <AlertDialog
      isCentered
      isOpen={isResetOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseReset}
    >
      <AlertDialogOverlay
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <AlertDialogContent bg={useColorModeValue("gray.50", "gray.600")}>
          <AlertDialogHeader mt="4" fontSize="lg" fontWeight="bold">
            Reset Survey
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to reset the survey? All your progress will be
            lost.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseReset} size="sm">
              Cancel
            </Button>
            <Button ml={3} colorScheme="red" onClick={resetSurvey} size="sm">
              Reset
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
