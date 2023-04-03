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

  //const customized = {
  //  code,
  //  h1,
  //  h2,
  //  h3,
  //  h4,
  //  h5,
  //  h6,
  //  ol,
  //  p,
  //  ul,
  //}

  return (
    <BoxWrapper colSpan={[6, 6, 6, 4, 4]}>
      <Box p="4">
        <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
          {content}
        </ReactMarkdown>
      </Box>
    </BoxWrapper>
  )
}

export default ApiExample
