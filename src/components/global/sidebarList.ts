import {
  FiTrendingUp,
  FiCompass,
  FiAnchor,
  FiUsers,
  FiMapPin,
  FiPackage,
  FiActivity,
  FiLock,
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
    icon: FiMapPin,
    subItem: true,
  },
  parcels: {
    label: "Parcels",
    name: "parcels",
    icon: FiPackage,
    subItem: true,
  },
  private: {
    label: "Private Dashboard",
    name: "dashboard",
    icon: FiLock,
    subItem: false,
  },
  status: {
    label: "Status",
    name: "status",
    icon: FiActivity,
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
