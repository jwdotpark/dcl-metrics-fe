import { Spinner, Center } from "@chakra-ui/react"

const Loading = () => {
  return (
    <Center minH="550px" h="100%">
      <Spinner size="xl" />
    </Center>
  )
}

export default Loading
