/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiSettings } from "react-icons/fi"
import { useRouter } from "next/router"
import FeedbackMenu from "./FeedbackMenu"
import SettingsMenu from "./SettingsMenu"

const SettingsButton = () => {
  const router = useRouter()
  return (
    <>
      <Popover placement="bottom-start" variant="responsive">
        <PopoverTrigger>
          <Button size="lg" variant="link">
            <FiSettings />
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
            {router.pathname === "/" && <SettingsMenu />}
            <FeedbackMenu />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default SettingsButton
