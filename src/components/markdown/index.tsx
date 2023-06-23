import {
  Box,
  Text,
  Divider,
  OrderedList,
  UnorderedList,
  useColorModeValue,
  Button,
  Center,
} from "@chakra-ui/react"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "../../../src/lib/data/syntaxHighlight"

export const CallOut = ({ children }) => {
  return (
    <Box
      mb="16"
      p="8"
      bg={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <Text fontSize="xl">{children}</Text>
    </Box>
  )
}

export const MDYoutube = ({ id }) => {
  return (
    <Box overflow="clip" my="4" borderRadius="xl">
      <iframe
        width="100%"
        height="450"
        src={"https://www.youtube.com/embed/" + id}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </Box>
  )
}

export const LinkButton = ({ children, link }) => {
  return (
    <Center mt="16">
      <Link href={link} target="_blank">
        <Button
          w="100%"
          h="100%"
          p="4"
          fontWeight="bold"
          borderRadius="xl"
          shadow="md"
        >
          <Text fontSize="4xl">{children}</Text>
        </Button>
      </Link>
    </Center>
  )
}

// eslint-disable-next-line no-unused-vars
export const code = ({ node, inline, className, children, ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const syntaxColor = useColorModeValue(oneLight, oneDark)
  const match = /language-(\w+)/.exec(className || "")
  return !inline && match ? (
    <Box overflow="clip" mb="4" borderRadius="xl">
      <SyntaxHighlighter
        style={syntaxColor}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </Box>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export const ul = ({ children }) => {
  return <UnorderedList my="8">{children}</UnorderedList>
}

export const ol = ({ children }) => {
  return <OrderedList my="8">{children}</OrderedList>
}

export const p = ({ children }) => {
  return <Text mb="8">{children}</Text>
}

export const h1 = ({ children }) => {
  return (
    <Text as="h1" mb="8" fontSize={["xl", "xl", "2xl", "3xl"]}>
      <kbd>
        <u>{children}</u>
      </kbd>
      <Divider />
    </Text>
  )
}

export const h2 = ({ children }) => {
  return (
    <Text as="h2" mb="8" fontSize="3xl">
      {children}
      <Divider mb="4" />
    </Text>
  )
}

export const h3 = ({ children }) => {
  return (
    <Text as="h3" mb="8" color="blue.600" fontSize="2xl">
      {children}
    </Text>
  )
}

export const h4 = ({ children }) => {
  return (
    <Text as="h4" mb="8" fontSize="xl">
      {children}
      <Divider mb="4" />
    </Text>
  )
}

export const h5 = ({ children }) => {
  return (
    <Text as="h5" mb="8" fontSize="lg">
      {children}
      <Divider mb="4" />
    </Text>
  )
}

export const h6 = ({ children }) => {
  return (
    <Text as="h6" mb="8" fontSize="md">
      {children}
      <Divider mb="4" />
    </Text>
  )
}
