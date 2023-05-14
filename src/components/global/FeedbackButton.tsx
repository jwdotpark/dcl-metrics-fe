import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiMessageSquare } from "react-icons/fi"
import FeedbackMenu from "./FeedbackMenu"

const FeedbackButton = () => {
  return (
    <>
      <Popover placement="bottom-start" variant="responsive">
        <PopoverTrigger>
          <Button data-testid="feedbackBtn" size="lg" variant="link">
            <FiMessageSquare />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          bg={useColorModeValue("white", "gray.700")}
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <PopoverArrow />
          <PopoverBody m="2">
            <FeedbackMenu />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default FeedbackButton
