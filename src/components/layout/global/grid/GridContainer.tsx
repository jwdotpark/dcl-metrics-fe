import { Box, useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import {
  gridChartHeight,
  handleHeight,
} from "../../../../lib/data/chart/chartInfo"
import {
  defaultLayout,
  getSavedLayout,
  Layout,
  saveLayout,
} from "../../../../lib/data/grid/gridInfo"
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

const componentMap = {
  "1": ParcelVisitedGrid,
  "2": SceneVisitedGrid,
  "3": UniqueVisitorsGrid,
  "4": OnlineUsersGrid,
  "5": ActiveUsersGrid,
  "6": GlobalUtilizationGrid,
  "7": WorldStatGrid,
  "8": WorldListGrid,
}

export const GridContainer = ({ chartData, worldData }) => {
  const toast = useToast()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const toastId = "layout-toast"

  const handleLayoutToast = () => {
    if (!toast.isActive(toastId)) {
      toast({
        title: "Layout is Changed",
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "bottom-right",
      })
    }
  }

  const [layout, setLayout] = useState(getSavedLayout() || defaultLayout)

  const [avg, setAvg] = useState({
    avgActiveParcels: 0,
    avgActiveScenes: 0,
    avgGuestUsers: 0,
    avgNamedUsers: 0,
    avgNewUsers: 0,
    avgUniqueUsers: 0,
  })

  const handleLayoutChange = (newLayout: Layout) => {
    handleLayoutToast()
    setLayout(newLayout)
  }

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      if (
        (windowWidth >= 400 && newWidth < 400) ||
        (windowWidth < 400 && newWidth >= 400)
      ) {
        setLayout(defaultLayout)
      }
      setWindowWidth(newWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [windowWidth])

  useEffect(() => {
    saveLayout(layout)
  }, [layout])

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
        onLayoutChange={handleLayoutChange}
      >
        {layout.map((item) => {
          const GridComponent = componentMap[item.i]
          return (
            <Box key={item.i} data-grid={item}>
              <GridComponent
                chartData={chartData}
                avg={avg}
                setAvg={setAvg}
                worldCurrentRes={worldData}
              />
            </Box>
          )
        })}
      </ResponsiveGridLayout>
    </Box>
  )
}
