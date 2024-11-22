import { Button, Center } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FiShoppingBag } from "react-icons/fi"
import ToolTip from "../layout/local/ToolTip"
import { SurveyPanel } from "../utils/panel/SurveyPanel"

const SurveyButton = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const savedOpenState = localStorage.getItem("surveyPanelOpen")
    if (savedOpenState) {
      setOpen(JSON.parse(savedOpenState))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("surveyPanelOpen", JSON.stringify(open))
  }, [open])

  return (
    <>
      <Center>
        <ToolTip label="Take a user survey">
          <Button
            data-testid="colorBtn"
            onClick={() => {
              setOpen(!open)
            }}
            size="md"
            variant="link"
          >
            <FiShoppingBag />
          </Button>
        </ToolTip>
      </Center>
      {open && (
        <>
          <SurveyPanel setOpen={setOpen} />
        </>
      )}
    </>
  )
}

export default SurveyButton
