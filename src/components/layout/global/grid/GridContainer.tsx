import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { ParcelVisitedGrid } from "../../../local/stats/chart/grid/ParcelVisitedGrid"

const ResponsiveGridLayout = WidthProvider(Responsive)

export const GridContainer = ({ chartData }) => {
  const layout = [
    {
      i: "1",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      resizehandles: ["s", "n"],
      isResizable: false,
    },
    { i: "2", x: 1, y: 0, w: 1, h: 1 },
    { i: "3", x: 0, y: 1, w: 2, h: 1 },
    { i: "4", x: 1, y: 1, w: 2, h: 1 },
  ]

  const [avg, setAvg] = useState({
    avgActiveParcels: 0,
    avgActiveScenes: 0,
    avgGuestUsers: 0,
    avgNamedUsers: 0,
    avgNewUsers: 0,
    avgUniqueUsers: 0,
  })

  return (
    <Box w="100%" h="100%">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 2, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={350}
        width="100%"
        draggableHandle=".drag-handle"
        isDraggable={true}
        useCSSTransforms={true}
      >
        <Box key="1" data-grid={layout[0]}>
          <ParcelVisitedGrid chartData={chartData} avg={avg} setAvg={setAvg} />
        </Box>
        <Box
          key="2"
          p="2"
          bg="gray.200"
          border="1px solid"
          data-grid={layout[1]}
        >
          2
        </Box>
        <Box
          key="3"
          p="2"
          bg="gray.200"
          border="1px solid"
          data-grid={layout[2]}
        >
          3
        </Box>
        <Box
          key="4"
          p="2"
          bg="gray.200"
          border="1px solid"
          data-grid={layout[3]}
        >
          4
        </Box>
      </ResponsiveGridLayout>
    </Box>
  )
}
