import {
  FiTrendingUp,
  FiCompass,
  FiAnchor,
  FiUsers,
  FiMapPin,
  FiPackage,
  FiActivity,
  FiGrid,
  FiPenTool,
  FiGlobe,
  FiAtSign,
  // FiFileText,
} from "react-icons/fi"

type SidebarItem = {
  label: string
  name: string
  icon: React.ComponentType
  subItem: boolean
}

type SidebarList = {
  global: SidebarItem
  scenes: SidebarItem
  parcels: SidebarItem
  map: SidebarItem
  world: SidebarItem
  events: SidebarItem
  status: SidebarItem
  blog: SidebarItem
  roadmap: SidebarItem
  about: SidebarItem
  users?: SidebarItem
  // docs?: SidebarItem; // Uncomment if needed
}

const userAllowed = process.env.NEXT_PUBLIC_ALLOW_PRIVACY === "true"

let sidebarList: SidebarList = {
  global: {
    label: "Global Dashboard",
    name: "",
    icon: FiTrendingUp,
    subItem: false,
  },
  scenes: {
    label: "Scenes",
    name: "scenes",
    icon: FiGrid,
    subItem: true,
  },
  parcels: {
    label: "Parcels",
    name: "parcels",
    icon: FiPackage,
    subItem: true,
  },
  map: {
    label: "Map",
    name: "map",
    icon: FiMapPin,
    subItem: true,
  },
  world: {
    label: "Worlds",
    name: "worlds",
    icon: FiGlobe,
    subItem: false,
  },
  events: {
    label: "Events",
    name: "events",
    icon: FiAtSign,
    subItem: false,
  },
  status: {
    label: "Status",
    name: "status",
    icon: FiActivity,
    subItem: false,
  },
  blog: {
    label: "Blog",
    name: "blog",
    icon: FiPenTool,
    subItem: false,
  },
  roadmap: {
    label: "Roadmap",
    name: "roadmap",
    icon: FiAnchor,
    subItem: false,
  },
  about: {
    label: "About",
    name: "about",
    icon: FiCompass,
    subItem: false,
  },
}

if (userAllowed) {
  sidebarList = {
    global: sidebarList.global,
    users: {
      label: "Users",
      name: "users",
      icon: FiUsers,
      subItem: true,
    },
    ...sidebarList,
  }
}

export { sidebarList }
