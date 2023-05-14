/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import {
  Box,
  Flex,
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
  Spinner,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { AuthAtom } from "../../lib/hooks/atoms"
import { useAtom } from "jotai"
import { encrypt } from "../../lib/hooks/utils"
import { sceneID } from "../../lib/data/sceneID"

const SignIn = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useAtom(AuthAtom)
  const [btnMsg, setBtnMsg] = useState("Sign In")
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleClick = () => setShow(!show)

  const onSubmit = async (data) => {
    setBtnMsg("Signing In...")
    const result = await fetch("/api/auth/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const res = await result.json()
    if (res.isAuthenticated === true) {
      setIsAuthenticated(encrypt("/dashboard/" + data.account))
      localStorage.setItem("account", data.account)

      router.push(
        "/dashboard/[name]",
        `/dashboard/${sceneID[data.account].name}`
      )
    } else {
      setBtnMsg("Invalid account or password")
    }
  }

  return (
    <Center>
      <VStack
        h="100%"
        p="8"
        bg={useColorModeValue("white", "gray.700")}
        border={useColorModeValue("gray.200", "gray.600")}
        shadow="md"
        rounded="xl"
        spacing={8}
      >
        <VStack borderRadius="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* @ts-ignore */}
            <FormControl mb="4" isInvalid={errors.account}>
              <FormLabel>Account</FormLabel>
              <Input
                shadow="md"
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
                  shadow="md"
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
                    shadow="sm"
                    _hover={{
                      bg: useColorModeValue("gray.400", "gray.800"),
                    }}
                    onClick={handleClick}
                    rounded="xl"
                    size="sm"
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
                      "Please contact the administrator contact@dcl-metrics.com to find/reset your password."
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
                    ? useColorModeValue("gray.200", "gray.600")
                    : btnMsg === "Signing In..."
                    ? useColorModeValue("gray.300", "gray.500")
                    : "red.400"
                }
                shadow="md"
                _hover={{
                  bg: useColorModeValue("gray.300", "gray.500"),
                }}
                isLoading={isSubmitting}
                rounded="xl"
                type="submit"
              >
                {btnMsg === "Signing In..." ? "" : btnMsg}
                {btnMsg === "Signing In..." && <Spinner size="sm" />}
              </Button>
            </Box>
          </form>
        </VStack>
      </VStack>
    </Center>
  )
}

export default SignIn
