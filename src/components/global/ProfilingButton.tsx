import { Button, Center } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { FiActivity } from "react-icons/fi"
import { profilerDataAtom, profilerOpenAtom } from "../../lib/state/profiler"
import ToolTip from "../layout/local/ToolTip"
import { Panel } from "../utils/Panel"

const ProfilingButton = () => {
  const [open, setOpen] = useAtom(profilerOpenAtom)

  // eslint-disable-next-line no-unused-vars
  const [profiling, setProfiling] = useAtom(profilerDataAtom)

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
      {open && (
        <>
          <Panel profilingData={profiling} setOpen={setOpen} />
        </>
      )}
    </>
  )
}

export default ProfilingButton
