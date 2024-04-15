import { Box, Button, Center } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useState } from "react"
import { FiActivity } from "react-icons/fi"
import { profilerAtom } from "../../lib/state/profiler"
import ToolTip from "../layout/local/ToolTip"
import { Panel } from "../utils/Panel"

const ProfilingButton = () => {
  const [open, setOpen] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [profiling, setProfiling] = useAtom(profilerAtom)

  return (
    <>
      <Center>
        <ToolTip label="Profiler">
          <Button
            data-testid="colorBtn"
            onClick={() => setOpen(!open)}
            size="lg"
            variant="link"
          >
            <FiActivity />
          </Button>
        </ToolTip>
      </Center>
      {open && (
        <Box pos="absolute">
          <Panel profilingData={profiling} setOpen={setOpen} />
        </Box>
      )}
    </>
  )
}

export default ProfilingButton
