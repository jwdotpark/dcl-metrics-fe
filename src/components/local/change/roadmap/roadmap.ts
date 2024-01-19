// https://react-icons.github.io/react-icons/icons?name=fi
import {
  FiActivity,
  FiBox,
  FiGift,
  FiSliders,
  FiThumbsUp,
  FiTrendingUp,
  FiTruck,
  FiUserPlus,
} from "react-icons/fi"

export const roadmap = [
  {
    date: "2024 Q1",
    contents: [
      {
        icon: FiActivity,
        title: "Event Tracker",
        //description: "",
      },
      {
        icon: FiBox,
        title: "Additional Worlds Data",
        //description: "",
      },
    ],
  },
  {
    date: "2024 Q2",
    contents: [
      {
        icon: FiTrendingUp,
        title: "Historical scene history & expanded data scope",
        //description: "",
      },
      {
        icon: FiThumbsUp,
        title: "Quality of life improvements for site usability",
        //description: "",
      },
    ],
  },
  {
    date: "2024 Q3",
    contents: [
      {
        icon: FiUserPlus,
        title: "Atlas Corp historical user data integration",
        //description: "",
      },
      {
        icon: FiSliders,
        title: "Retention Metrics for scenes",
        //description: "",
      },
    ],
  },
  {
    date: "2024 Q4",
    contents: [
      {
        icon: FiTruck,
        title: "Land/Scene utilization for detailed metrics",
        //description: "",
      },
    ],
  },
  {
    date: "2025+",
    contents: [
      {
        icon: FiGift,
        title:
          "Long-term maintenance and internal features leading to API accessibility",
        description:
          "Data consistency & technical debt tasks will be split across the whole roadmap",
      },
    ],
  },
]
