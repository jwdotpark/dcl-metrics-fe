import { Button, Center } from "@chakra-ui/react"
import { useState } from "react"
import { FiShoppingBag } from "react-icons/fi"
import ToolTip from "../layout/local/ToolTip"
import { SurveyPanel } from "../utils/panel/SurveyPanel"
//import { Panel } from "../utils/InspectorPanel"

const SurveyButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Center>
        <ToolTip label="Take a user survey">
          <Button
            data-testid="colorBtn"
            onClick={() => {
              setOpen(!open)
            }}
            size="lg"
            variant="link"
          >
            <FiShoppingBag />
          </Button>
        </ToolTip>
      </Center>
      {/*{open && (
        <>
          <SurveyPanel setOpen={setOpen} />
        </>
      )}*/}
      <SurveyPanel setOpen={setOpen} />
    </>
  )
}

export default SurveyButton
