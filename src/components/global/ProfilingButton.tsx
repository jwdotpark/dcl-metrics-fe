import { Button, Center } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { FiActivity } from "react-icons/fi"
import { profilerOpenAtom } from "../../lib/state/profiler"
import ToolTip from "../layout/local/ToolTip"

const ProfilingButton = () => {
  const [open, setOpen] = useAtom(profilerOpenAtom)

  return (
    <>
      <Center>
        <ToolTip label="Profiler">
          <Button
            data-testid="colorBtn"
            onClick={() => {
              setOpen(!open)
            }}
            size="lg"
            variant="link"
          >
            <FiActivity />
          </Button>
        </ToolTip>
      </Center>
    </>
  )
}

export default ProfilingButton
