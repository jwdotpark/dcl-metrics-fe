import { Box } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"
import { theme } from "../../markdown/theme"

const ApiExample = ({ selectedItem }) => {
  const { content } = selectedItem

  return (
    <BoxWrapper colSpan={[6, 6, 6, 4, 4]}>
      <Box p="4">
        <ReactMarkdown components={ChakraUIRenderer(theme)} skipHtml>
          {content}
        </ReactMarkdown>
      </Box>
    </BoxWrapper>
  )
}

export default ApiExample
