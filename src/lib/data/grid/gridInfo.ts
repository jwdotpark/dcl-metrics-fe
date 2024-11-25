export type Layout = {
  i: string
  x: number
  y: number
  w: number
  h: number
  isResizable?: boolean
  resizeHandles?: string[]
}

export const defaultLayout = [
  {
    i: "1",
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    isResizable: true,
    resizeHandles: ["e", "w"],
  },
  {
    i: "2",
    x: 1,
    y: 0,
    w: 1,
    h: 1,
    isResizable: true,
    resizeHandles: ["e", "w"],
  },
  {
    i: "3",
    x: 0,
    y: 1,
    w: 2,
    h: 1,
    isResizable: false,
  },
  {
    i: "4",
    x: 0,
    y: 2,
    w: 1,
    h: 1,
    isResizable: true,
    resizeHandles: ["e", "w"],
  },
  {
    i: "5",
    x: 1,
    y: 2,
    w: 1,
    h: 1,
    isResizable: true,
    resizeHandles: ["e", "w"],
  },
  {
    i: "6",
    x: 0,
    y: 3,
    w: 1,
    h: 1,
    isResizable: false,
  },
  {
    i: "7",
    x: 1,
    y: 3,
    w: 1,
    h: 1,
    isResizable: false,
  },
  {
    i: "8",
    x: 0,
    y: 4,
    w: 2,
    h: 2,
    isResizable: true,
    resizeHandles: ["e", "w"],
  },
]

export const getSavedLayout = () => {
  const savedLayout = localStorage.getItem("gridLayout")
  return savedLayout ? JSON.parse(savedLayout) : null
}

export const saveLayout = (layout: Layout) => {
  localStorage.setItem("gridLayout", JSON.stringify(layout))
}
