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
  FormLabel,
} from "@chakra-ui/react"
import { FiAtSign, FiMessageCircle } from "react-icons/fi"
import { sendFeedback } from "../../lib/hooks/sendNotification"
import ToolTip from "../layout/local/ToolTip"

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
      <Center mt="2">
        <Text fontWeight="bold">Feedback?</Text>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.contact ? true : false}>
          <FormLabel>Your Name</FormLabel>
          <InputGroup mb="2" size="sm">
            <InputLeftAddon
              bg={useColorModeValue("gray.200", "gray.500")}
              borderRadius="xl"
              shadow={useColorModeValue("sm", "md")}
            >
              <Text fontSize="sm">
                <FiMessageCircle />
              </Text>
            </InputLeftAddon>
            <Input
              bg={useColorModeValue("gray.100", "gray.600")}
              borderTopRightRadius="xl"
              borderBottomRightRadius="xl"
              shadow={useColorModeValue("sm", "md")}
              id="name"
              placeholder="John Doe"
              size="sm"
              variant="filled"
              {...register("name", {
                maxLength: { value: 320, message: "Too long!" },
              })}
            />
          </InputGroup>
          <FormLabel>Contact</FormLabel>
          <InputGroup mb="2" size="sm">
            <ToolTip label="Account that we can contact you on">
              <InputLeftAddon
                bg={useColorModeValue("gray.200", "gray.500")}
                borderRadius="xl"
                shadow={useColorModeValue("sm", "md")}
              >
                <Text fontSize="sm">
                  <FiAtSign />
                </Text>
              </InputLeftAddon>
            </ToolTip>
            <Input
              bg={useColorModeValue("gray.100", "gray.600")}
              borderTopRightRadius="xl"
              borderBottomRightRadius="xl"
              shadow={useColorModeValue("sm", "md")}
              id="contact"
              placeholder="user@site.com, @user "
              size="sm"
              variant="filled"
              {...register("contact", {
                maxLength: { value: 320, message: "Too long!" },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {/* @ts-ignore */}
            {errors.contact && errors.contact.message}
          </FormErrorMessage>

          <FormLabel mb="2">Message</FormLabel>
          <InputGroup>
            <Textarea
              bg={useColorModeValue("gray.100", "gray.600")}
              borderRadius="xl"
              shadow={useColorModeValue("sm", "md")}
              id="msg"
              placeholder="Please share your feedback with us!"
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
          shadow={useColorModeValue("sm", "md")}
          colorScheme={useColorModeValue("teal", "green")}
          disabled={errors.contact || errors.msg ? true : false}
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
