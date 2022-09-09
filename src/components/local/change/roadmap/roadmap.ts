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

        title: "Build Metrics for Scenes",
        description: `I.e. Wilderness P2E as a whole rather than each of the 20 parcels of which it is comprised.`,
      },
    ],
  },
  {
    date: "2022 Q4",
    contents: [
      {
        icon: FiPackage,

        title:
          "Build metrics for all users/parcels/scenes not just top 10 lists",
        description: "",
      },
      {
        icon: FiHome,

        title: "Introduce Daily New Users to global tracking",
        description: "",
      },
      {
        icon: FiPackage,

        title: "Introduce Concurrent Users histogram globally and by scene",
        description: "",
      },
      {
        icon: FiTrendingUp,

        title: "Increase daily metrics calculation interval",
        description: "",
      },
      {
        icon: FiTarget,

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

        title: "Personalized metric dashboards",
        description: "",
      },
      {
        icon: FiZoomIn,

        title: "More detailed parcel and scene-based metrics",
        description: "Z-axis analytics",
      },
      {
        icon: FiPackage,

        title: "Advanced user analytics",
        description: "Wearbles, POAPs, DAO Activity",
      },
      {
        icon: FiUsers,

        title:
          "Incorporate and work with Atlas Corporation's new data warehouse",
        description: "",
      },
    ],
  },
]
