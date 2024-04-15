/* eslint-disable no-unused-vars */
import { Button, Flex } from "@chakra-ui/react"
import { format } from "date-fns"
import { useAtom } from "jotai"
import { Profiler, useState } from "react"
import { isProd } from "../../lib/data/constant"
import { profilerOpenAtom } from "../../lib/state/profiler"
import { Panel } from "./Panel"

const Inspector = ({ children, id }) => {
  const [profilingData, setProfilingData] = useState([])
  const [open, setOpen] = useAtom(profilerOpenAtom)

  // TODO add option to change the interval and data length
  // eslint-disable-next-line no-unused-vars
  const [option, setOption] = useState({
    dataLegnth: 500,
    interval: 1000,
  })

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout

    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const updateProfilingData = (newData) => {
    const time = format(new Date(), "HH:mm:ss")

    setProfilingData((oldData) => {
      const updatedData = [
        ...oldData,
        {
          ...newData,
          time: time,
        },
      ]

      return updatedData.slice(
        Math.max(updatedData.length - option.dataLegnth, 0)
      )
    })
  }

  const debouncedUpdateProfilingData = debounce(
    updateProfilingData,
    option.interval
  )

  const onRenderCallback = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: any
  ) => {
    !isProd &&
      debouncedUpdateProfilingData({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions: interactions,
      })
  }

  if (process.env.NEXT_PUBLIC_INSPECTOR === "true") {
    return (
      <>
        <Profiler id={id} onRender={onRenderCallback}>
          {children}
        </Profiler>
        {open && (
          <>
            asdf
            <Panel profilingData={profilingData} setOpen={setOpen} />
          </>
        )}
      </>
    )
  } else {
    return <>{children}</>
  }
}

export default Inspector
