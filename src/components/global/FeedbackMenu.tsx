import { useForm } from "react-hook-form"
import {
  Center,
  FormErrorMessage,
  FormControl,
  Button,
  Box,
  Text,
  Textarea,
  Input,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  Tooltip,
} from "@chakra-ui/react"
import { FiAtSign } from "react-icons/fi"
import { sendFeedback } from "../../lib/hooks/sendNotification"

const FeedbackMenu = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (values) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        sendFeedback(values)
        reset()
        resolve()
      }, 500)
    })
  }

  return (
    <Box my="4">
      <Center mb="4">
        <Text fontWeight="bold">Feedback</Text>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.sender ? true : false}>
          <InputGroup size="sm">
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="md"
              label="Account that developers can contact you on"
              placement="auto"
            >
              <InputLeftAddon
                bg={useColorModeValue("gray.200", "gray.500")}
                borderRadius="xl"
                shadow="md"
              >
                <Text fontSize="sm">
                  <FiAtSign />
                </Text>
              </InputLeftAddon>
            </Tooltip>
            <Input
              bg={useColorModeValue("gray.100", "gray.600")}
              borderTopRightRadius="xl"
              borderBottomRightRadius="xl"
              shadow="md"
              id="sender"
              placeholder="user@site.com, @user "
              size="sm"
              variant="filled"
              {...register("sender", {
                maxLength: { value: 320, message: "Too long!" },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {/* @ts-ignore */}
            {errors.sender && errors.sender.message}
          </FormErrorMessage>

          <InputGroup mt="4">
            <Textarea
              bg={useColorModeValue("gray.100", "gray.600")}
              borderRadius="xl"
              shadow="md"
              id="msg"
              placeholder="Hi!"
              size="sm"
              variant="filled"
              {...register("msg", {
                required: "This is required",
                minLength: { value: 4, message: "Too short!" },
                maxLength: { value: 1024, message: "Too long!" },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {/* @ts-ignore */}
            {errors.msg && errors.msg.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          w="100%"
          mt={4}
          borderRadius="xl"
          shadow="md"
          colorScheme={useColorModeValue("teal", "green")}
          disabled={errors.sender || errors.msg ? true : false}
          isLoading={isSubmitting}
          type="submit"
        >
          Send
        </Button>
      </form>
    </Box>
  )
}

export default FeedbackMenu
