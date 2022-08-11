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
        day: "2022 Aug",
        title: "Build Metrics for Scenes",
        description: `I.e. Wilderness P2E as a whole rather than each of the 20 parcels of which it is comprised.`,
      },
      {
        icon: FiBarChart2,
        day: "2022 Aug",
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
        day: "2022 Oct",
        title:
          "Build metrics for all users/parcels/scenes not just top 10 lists",
        description: "",
      },
      {
        icon: FiHome,
        day: "2022 Oct",
        title: "Introduce Daily New Users to global tracking",
        description: "",
      },
      {
        icon: FiPackage,
        day: "2022 Nov",
        title: "Introduce Concurrent Users histogram globally and by scene",
        description: "",
      },
      {
        icon: FiTrendingUp,
        day: "2022 Nov",
        title: "Increasing daily run intervals for nearly live metrics",
        description: "",
      },
      {
        icon: FiTarget,
        day: "2022 Nov",
        title: "Incorporate land sales and rental data",
        description: "",
      },
      {
        icon: FiUsers,
        day: "2022 Nov",
        title:
          "Incorporate and work with Atlas Corporation's new data warehouse",
        description: "",
      },
    ],
  },
  {
    date: "2023 Q1",
    contents: [
      {
        icon: FiUserPlus,
        day: "2023 Jan",
        title: "Personalized metric dashboards",
        description: "",
      },
      {
        icon: FiZoomIn,
        day: "2023 Jan",
        title: "More detailed parcel and scene-based metrics",
        description: "Z-axis analytics",
      },
      {
        icon: FiPackage,
        day: "2022 Nov",
        title: "Advanced user analytics ",
        description: "Wearbles, POAPs, DAO Activity",
      },
    ],
  },
]
