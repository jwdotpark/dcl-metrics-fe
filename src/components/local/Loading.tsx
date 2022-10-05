import { Spinner, Center } from "@chakra-ui/react"

const Loading = () => {
  return (
    <Center h="100%" minH="550px">
      <Spinner size="xl" />
    </Center>
  )
}

export default Loading
