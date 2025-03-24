import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react"

export const SurveyConfirm = ({
  isSubmitOpen,
  cancelRef,
  onCloseSubmit,
  resetSurvey,
}) => {
  return (
    <AlertDialog
      isCentered
      isOpen={isSubmitOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseSubmit}
    >
      <AlertDialogOverlay
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <AlertDialogContent>
          <AlertDialogHeader mt="4" fontSize="2xl" fontWeight="bold">
            Form Submitted
          </AlertDialogHeader>

          <AlertDialogBody>
            The form has been submitted successfully!
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="blue" onClick={resetSurvey}>
              Okay
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
