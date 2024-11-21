import { Box, useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import {
  gridChartHeight,
  handleHeight,
} from "../../../../lib/data/chart/chartInfo"
import { ActiveUsersGrid } from "../../../local/stats/chart/grid/ActiveUsersGrid"
import { BrushGrid } from "../../../local/stats/chart/grid/BrushGrid"
import { GlobalUtilizationGrid } from "../../../local/stats/chart/grid/GlobalUtilizationGrid"
import { OnlineUsersGrid } from "../../../local/stats/chart/grid/OnlineUsersGrid"
import { ParcelVisitedGrid } from "../../../local/stats/chart/grid/ParcelVisitedGrid"
import { SceneVisitedGrid } from "../../../local/stats/chart/grid/SceneVisitedGrid"
import { UniqueVisitorsGrid } from "../../../local/stats/chart/grid/UniqueVisitorsGrid"
import { WorldListGrid } from "../../../local/stats/chart/grid/WorldListGrid"
import { WorldStatGrid } from "../../../local/stats/chart/grid/WorldStatGrid"

const ResponsiveGridLayout = WidthProvider(Responsive)

const getSavedLayout = () => {
  const savedLayout = localStorage.getItem("gridLayout")
  return savedLayout ? JSON.parse(savedLayout) : null
}

const saveLayout = (layout) => {
  localStorage.setItem("gridLayout", JSON.stringify(layout))
}

export const GridContainer = ({ chartData, worldData }) => {
  const toast = useToast()

  const handleLayoutToast = () => {
    toast({
      title: "Layout is Changed",
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "bottom-right",
    })
  }
  const defaultLayout = [
    { i: "1", x: 0, y: 0, w: 1, h: 1, isResizable: false },
    { i: "2", x: 1, y: 0, w: 1, h: 1, isResizable: false },
    { i: "3", x: 1, y: 1, w: 2, h: 1, isResizable: false },
    { i: "4", x: 0, y: 2, w: 1, h: 1, isResizable: false },
    { i: "5", x: 1, y: 3, w: 1, h: 1, isResizable: false },
    { i: "6", x: 0, y: 4, w: 1, h: 1, isResizable: false },
    { i: "7", x: 1, y: 4, w: 1, h: 1, isResizable: false },
    { i: "8", x: 0, y: 5, w: 2, h: 2, isResizable: false },
  ]

  const [layout, setLayout] = useState(getSavedLayout() || defaultLayout)

  const [avg, setAvg] = useState({
    avgActiveParcels: 0,
    avgActiveScenes: 0,
    avgGuestUsers: 0,
    avgNamedUsers: 0,
    avgNewUsers: 0,
    avgUniqueUsers: 0,
  })

  useEffect(() => {
    saveLayout(layout)
  }, [layout])

  const handleLayoutChange = (newLayout) => {
    handleLayoutToast()
    setLayout(newLayout)
  }

  return (
    <Box w="100%" h="100%">
      <BrushGrid chartData={chartData} />

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 2, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={handleHeight(gridChartHeight)}
        width="100%"
        draggableHandle=".drag-handle"
        isDraggable={true}
        useCSSTransforms={true}
        onLayoutChange={handleLayoutChange}
      >
        <Box key="1" data-grid={layout.find((item) => item.i === "1")}>
          <ParcelVisitedGrid chartData={chartData} avg={avg} setAvg={setAvg} />
        </Box>
        <Box key="2" data-grid={layout.find((item) => item.i === "2")}>
          <SceneVisitedGrid chartData={chartData} avg={avg} setAvg={setAvg} />
        </Box>
        <Box key="3" data-grid={layout.find((item) => item.i === "3")}>
          <UniqueVisitorsGrid chartData={chartData} avg={avg} setAvg={setAvg} />
        </Box>

        <Box key="4" data-grid={layout.find((item) => item.i === "4")}>
          <OnlineUsersGrid />
        </Box>
        <Box key="5" data-grid={layout.find((item) => item.i === "5")}>
          <ActiveUsersGrid />
        </Box>
        <Box key="6" data-grid={layout.find((item) => item.i === "6")}>
          <GlobalUtilizationGrid />
        </Box>
        <Box key="7" data-grid={layout.find((item) => item.i === "7")}>
          <WorldStatGrid worldCurrentRes={worldData} />
        </Box>
        <Box key="8" data-grid={layout.find((item) => item.i === "8")}>
          <WorldListGrid worldCurrentRes={worldData} />
        </Box>
      </ResponsiveGridLayout>
    </Box>
  )
}
