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
    date: "2022 Q4",
    contents: [
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
    ],
  },
]
