import { GridItem, useColorModeValue } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { BoxAtom } from "../../../lib/hooks/atoms"

const BoxWrapper = ({ children }) => {
  const box = {
    h: "auto",
    w: "100%",
    p: [0, 1, 2, 3, 4],
    bg: useColorModeValue("white", "gray.800"),
    border: "1px solid",
    borderColor: useColorModeValue("gray.300", "gray.700"),
    borderRadius: "xl",
    shadow: "md",
  }

  const [boxAtom, setBoxAtom] = useAtom(BoxAtom)
  useEffect(() => {
    setBoxAtom(box)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GridItem
      w={box.w}
      h={box.h}
      p={box.p}
      bg={box.bg}
      border={box.border}
      borderColor={box.borderColor}
      borderRadius={box.borderRadius}
      shadow={box.shadow}
    >
      {children}
    </GridItem>
  )
}

export default BoxWrapper
