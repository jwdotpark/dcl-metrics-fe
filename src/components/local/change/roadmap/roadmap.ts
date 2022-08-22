// https://react-icons.github.io/react-icons/icons?name=fi
import {
  FiPackage,
  FiHome,
  FiBarChart2,
  FiCheckCircle,
  FiCloudDrizzle,
  FiTrendingUp,
  FiTarget,
  FiUsers,
  FiUserPlus,
  FiZoomIn,
} from "react-icons/fi"

export const roadmap = [
  {
    date: "2022 Q3",
    contents: [
      {
        icon: FiPackage,
        day: "",
        title: "Build Metrics for Scenes",
        description: `I.e. Wilderness P2E as a whole rather than each of the 20 parcels of which it is comprised.`,
      },
      {
        icon: FiBarChart2,
        day: "",
        title: "Update Frontend aesthetic and charts components",
        description: ``,
      },
    ],
  },
  {
    date: "2022 Q4",
    contents: [
      {
        icon: FiPackage,
        day: "",
        title: "Build metrics for all users/parcels/scenes not just top 10 lists",
        description: "",
      },
      {
        icon: FiHome,
        day: "",
        title: "Introduce Daily New Users to global tracking",
        description: "",
      },
      {
        icon: FiPackage,
        day: "",
        title: "Introduce Concurrent Users histogram globally and by scene",
        description: "",
      },
      {
        icon: FiTrendingUp,
        day: "",
        title: "Increase daily metrics calculation interval",
        description: "",
      },
      {
        icon: FiTarget,
        day: "",
        title: "Incorporate land sales and rental data",
        description: "",
      },
    ],
  },
  {
    date: "2023 Q1",
    contents: [
      {
        icon: FiUserPlus,
        day: "",
        title: "Personalized metric dashboards",
        description: "",
      },
      {
        icon: FiZoomIn,
        day: "",
        title: "More detailed parcel and scene-based metrics",
        description: "Z-axis analytics",
      },
      {
        icon: FiPackage,
        day: "",
        title: "Advanced user analytics",
        description: "Wearbles, POAPs, DAO Activity",
      },
      {
        icon: FiUsers,
        day: "",
        title:
          "Incorporate and work with Atlas Corporation's new data warehouse",
        description: "",
      },
    ],
  },
]
