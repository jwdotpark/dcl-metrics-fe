import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "../../../lib/data/syntaxHighlight"

const ApiExample = ({ selectedItem }) => {
  const content = selectedItem.content
  const { description } = selectedItem.data

  const newTheme = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const syntaxColor = useColorModeValue(oneLight, oneDark)
      return !inline && match ? (
        <Box overflow="clip" my="4" borderRadius="xl">
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
  }

  return (
    <BoxWrapper colSpan={[6, 6, 6, 4]}>
      <Box p="4">
        <Box mb="8">
          <Text as="kbd" fontSize="6xl" fontWeight="bold">
            {description}
          </Text>
        </Box>
        <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
          {content}
        </ReactMarkdown>
      </Box>
    </BoxWrapper>
  )
}

export default ApiExample
