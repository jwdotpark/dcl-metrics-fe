/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Divider,
  OrderedList,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import { oneDark, oneLight } from "../../lib/data/syntaxHighlight"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export const theme = {
  // eslint-disable-next-line no-unused-vars
  code: ({ node, inline, className, children, ...props }) => {
    const syntaxColor = useColorModeValue(oneLight, oneDark)
    const match = /language-(\w+)/.exec(className || "")
    return !inline && match ? (
      <Box overflow="clip" mb="4" fontSize="sm" borderRadius="xl">
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
  },
  ul: ({ children }) => {
    return <UnorderedList my="8">{children}</UnorderedList>
  },
  ol: ({ children }) => {
    return <OrderedList my="8">{children}</OrderedList>
  },
  p: ({ children }) => {
    return (
      <Text mb="8" fontSize="sm">
        {children}
      </Text>
    )
  },
  h1: ({ children }) => {
    return (
      <Text as="h1" mb="8" fontSize={["xl", "xl", "2xl", "3xl"]}>
        <kbd>
          <u>{children}</u>
        </kbd>
        <Divider />
      </Text>
    )
  },
  h2: ({ children }) => {
    return (
      <Text as="h2" mb="8" fontSize="3xl">
        {children}
        <Divider mb="4" />
      </Text>
    )
  },
  h3: ({ children }) => {
    return (
      <Text as="h3" mb="8" color="blue.600" fontSize="2xl">
        {children}
      </Text>
    )
  },
  h4: ({ children }) => {
    return (
      <Text as="h4" mb="8" fontSize="xl">
        {children}
        <Divider mb="4" />
      </Text>
    )
  },
  h5: ({ children }) => {
    return (
      <Text as="h5" mb="8" fontSize="lg">
        {children}
        <Divider mb="4" />
      </Text>
    )
  },
  h6: ({ children }) => {
    return (
      <Text as="h6" mb="8" fontSize="md">
        {children}
        <Divider mb="4" />
      </Text>
    )
  },
}
