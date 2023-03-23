import {
  Box,
  Divider,
  OrderedList,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "../../../lib/data/syntaxHighlight"

const ApiExample = ({ selectedItem }) => {
  const content = selectedItem.content

  const customized = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const syntaxColor = useColorModeValue(oneLight, oneDark)
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
    },
    ul: ({ children }) => {
      return <UnorderedList my="8">{children}</UnorderedList>
    },
    ol: ({ children }) => {
      return <OrderedList my="8">{children}</OrderedList>
    },
    p: ({ children }) => {
      return <Text mb="8">{children}</Text>
    },
    h1: ({ children }) => {
      return (
        <Text as="h1" mb="8" fontSize="6xl">
          <kbd>{children}</kbd>
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

  return (
    <BoxWrapper colSpan={[6, 6, 6, 4]}>
      <Box p="4">
        <ReactMarkdown components={ChakraUIRenderer(customized)} skipHtml>
          {content}
        </ReactMarkdown>
      </Box>
    </BoxWrapper>
  )
}

export default ApiExample
