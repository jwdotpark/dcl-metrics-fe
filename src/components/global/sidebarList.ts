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
} from "react-icons/fi"

export const sidebarList = {
  global: {
    label: "Global Dashboard",
    name: "",
    icon: FiTrendingUp,
    subItem: false,
  },
  users: {
    label: "Users",
    name: "users",
    icon: FiUsers,
    subItem: true,
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
  //docs: {
  //  label: "API Documentation",
  //  name: "api-docs",
  //  icon: FiFileText,
  //  subItem: false,
  //},
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
