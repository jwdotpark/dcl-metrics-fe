// useChartZoom.js
import { useState } from "react"

export const useChartZoom = (initialData) => {
  const [chartState, setChartState] = useState({
    startX: null,
    endX: null,
    startY: null,
    endY: null,
    data: initialData,
  })

  const handleMouseDown = (e) => {
    if (e?.activeLabel && e?.activePayload?.length) {
      const x = e?.activeLabel
      const y = e?.activePayload[0]?.value
      setChartState((prevState) => ({
        ...prevState,
        startX: x,
        endX: x,
        startY: y,
        endY: y,
      }))
    }
  }

  const handleMouseMove = (e) => {
    if (chartState.startX !== null) {
      if (e?.activeLabel && e?.activePayload?.length) {
        const x = e?.activeLabel
        const y = e?.activePayload[0]?.value
        setChartState((prevState) => ({ ...prevState, endX: x, endY: y }))
      }
    }
  }

  const handleMouseUp = () => {
    if (
      chartState.startX !== null &&
      chartState.endX !== null &&
      chartState.startY !== null &&
      chartState.endY !== null
    ) {
      const xValues = chartState.data.map((entry) => entry.date)
      const startIndex = xValues.indexOf(chartState.startX)
      const endIndex = xValues.indexOf(chartState.endX)
      if (startIndex < endIndex) {
        const zoomedData = chartState.data.slice(startIndex, endIndex + 1)
        setChartState({
          startX: null,
          endX: null,
          startY: null,
          endY: null,
          data: zoomedData,
        })
      }
    }
  }

  const handleReset = () => {
    setChartState({ ...chartState, data: initialData })
  }

  return { chartState, handleMouseDown, handleMouseMove, handleMouseUp, handleReset }
}
