import { useAtom } from "jotai"
import { Profiler } from "react"
import { isProd } from "../../lib/data/constant"
import { profilerDataAtom } from "../../lib/state/profiler"

const Inspector = ({ children, id }) => {
  // eslint-disable-next-line no-unused-vars
  const [profiling, setProfiling] = useAtom(profilerDataAtom)

  const option = {
    dataLegnth: 500,
    interval: 1000,
  }

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout

    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const updateProfilingData = (newData) => {
    setProfiling((oldData) => {
      const updatedData = [
        ...oldData,
        {
          ...newData,
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

  return (
    <>
      {process.env.NEXT_PUBLIC_INSPECTOR === "true" ? (
        <Profiler id={id} onRender={onRenderCallback}>
          {children}
        </Profiler>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default Inspector
