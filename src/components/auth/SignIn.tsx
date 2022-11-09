import { useState } from "react"
import {
  Box,
  Flex,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Link,
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { AuthAtom } from "../../lib/hooks/atoms"
import { useAtom } from "jotai"

const SignIn = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useAtom(AuthAtom)
  const [btnMsg, setBtnMsg] = useState("Sign In")
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (values.account === "okja" && values.password === "1q2w") {
          setBtnMsg("Sign In")
          setIsAuthenticated(true)
          router.push("/dashboard/[id]", `/dashboard/${values.account}`)
        } else {
          setBtnMsg("Invalid account or password")
        }
        resolve()
      }, 500)
    })
  }

  return (
    <Container maxW="7xl" p={{ base: 2, md: 4 }}>
      <Center>
        <VStack
          w={[300, 400, 500]}
          h="100%"
          p={{ base: 4, sm: 8 }}
          bg={useColorModeValue("white", "gray.700")}
          border={useColorModeValue("gray.200", "gray.6s00")}
          shadow="md"
          rounded="xl"
          spacing={8}
        >
          <VStack w={[300, 400, 500]} borderRadius="xl">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%" }}>
              {/* @ts-ignore */}
              <FormControl mb="4" isInvalid={errors.account}>
                <FormLabel>Account</FormLabel>
                <Input
                  id="account"
                  placeholder="name"
                  rounded="xl"
                  variant="filled"
                  {...register("account", {
                    required: "This is required",
                    minLength: {
                      value: 2,
                      message: "Minimum length should be 2",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.account && String(errors.account.message)}
                </FormErrorMessage>
              </FormControl>
              {/* @ts-ignore */}
              <FormControl mb="4" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    placeholder="password"
                    rounded="xl"
                    type={show ? "text" : "password"}
                    variant="filled"
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 2,
                        message: "Minimum length should be 2",
                      },
                    })}
                  />
                  <InputRightElement w="4.5rem">
                    <Button
                      h="1.75rem"
                      bg={useColorModeValue("gray.300", "gray.700")}
                      _hover={{
                        bg: useColorModeValue("gray.400", "gray.800"),
                      }}
                      rounded="xl"
                      size="sm"
                      type="submit"
                      // onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && String(errors.password.message)}
                </FormErrorMessage>
              </FormControl>
              <Flex direction={["column", "row"]} w="100%">
                <Box mb="4"></Box>
                <Spacer />
                <Box mb="4">
                  <Link
                    fontSize={{ base: "md", sm: "md" }}
                    onClick={() => {
                      alert(
                        "WIP: link to admin email or discord id? Or implement password reset page?"
                      )
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
              </Flex>
              <Box w="100%">
                <Button
                  w="100%"
                  mt={4}
                  bg={
                    btnMsg === "Sign In"
                      ? // eslint-disable-next-line react-hooks/rules-of-hooks
                        useColorModeValue("gray.200", "gray.600")
                      : "red.400"
                  }
                  _hover={{
                    bg: useColorModeValue("gray.300", "gray.500"),
                  }}
                  isLoading={isSubmitting}
                  rounded="xl"
                  type="submit"
                >
                  {btnMsg}
                </Button>
              </Box>
            </form>
          </VStack>
        </VStack>
      </Center>
    </Container>
  )
}

export default SignIn
