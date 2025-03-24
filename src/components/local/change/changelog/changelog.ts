// https://react-icons.github.io/react-icons/icons?name=fi
import {
  FiPackage,
  FiHome,
  FiBarChart2,
  FiCheckCircle,
  FiTarget,
  FiUsers,
  FiUserPlus,
  FiCalendar,
  FiZoomIn,
  FiActivity,
  FiBox,
  FiThumbsUp,
  FiTrendingUp,
  FiTruck,
} from "react-icons/fi"

export const minorchangeTemplate = [
  {
    date: "2022 Q3",
    contents: [
      {
        icon: FiHome,
        day: "2022 July",
        title: "Project initialized",
        description: ``,
      },
      {
        icon: FiBarChart2,
        day: "2022 August",
        title: "Dashboard with basic global metrics available",
        description: ``,
      },
      {
        icon: FiCheckCircle,
        day: "2022 August",
        title: "DAO Grant passed to fund dcl-metrics for one year!",
        description: `https://governance.decentraland.org/proposal/?id=ac2b57f0-12ac-11ed-affb-95d45c2147f8`,
      },
      {
        icon: FiTarget,
        day: "2022 September",
        title: "More accurate daily stats",
        description:
          "By using multiple data streams, we are able to build a more accurate count of daily active parcels with data going back to 2022-08-22",
      },
      {
        icon: FiCalendar,
        day: "2022 September",
        title: "Display global stats with selectable date range",
        description:
          "User now can select date range of week, month and quarter on each global chart",
      },
      {
        icon: FiPackage,
        day: "2022 October",
        title: "Build Metrics for Scenes",
        description:
          "I.e. Wilderness P2E as a whole rather than each of the 20 parcels of which it is comprised",
      },
    ],
  },
  {
    date: "2022 Q4",
    contents: [
      {
        icon: FiUsers,
        title:
          "Incorporate and work with Atlas Corporation's new data warehouse",
        description:
          "Increase data fidelity by pulling at higher frequency as well as reduce strain on DCL's catalyst servers",
      },
      {
        icon: FiPackage,
        title:
          "Build metrics for all users/parcels/scenes not just top 10 lists",
        description:
          "With the scene map, we've begun displaying data for all parcels and scenes and user data and dashboards will be added in the next iteration",
      },
      {
        icon: FiHome,
        title: "Introduce Daily New Users to global tracking",
        description: "",
      },
    ],
  },
  {
    date: "2023 Q1",
    contents: [
      {
        icon: FiPackage,
        title: "Added dedicated page for scene metrics",
        description:
          "Most scene metrics are now available on the scene page via map",
      },
      {
        icon: FiUserPlus,
        title: "Introduce map component for navigating to scenes and parcels",
        description: "",
      },
      {
        icon: FiUserPlus,
        title: "Incorporate land sales and rental data",
        description: "",
      },
      {
        icon: FiPackage,
        title: "Introduce Concurrent Users histogram globally and by scene",
        description: "",
      },
    ],
  },
  {
    date: "2023 Q2",
    contents: [
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
  {
    date: "2024 Q1",
    contents: [
      {
        icon: FiActivity,
        title: "Event Tracker",
        description: `Incorporate the event stat tracker in /events`,
      },
      {
        icon: FiBox,
        title: "Additional Worlds Data",
        description: "Incorporate the global world stat tracker in /worlds",
      },
    ],
  },
  {
    date: "2024 Q2",
    contents: [
      {
        icon: FiTrendingUp,
        title: "Historical scene history & expanded data scope",
        description:
          "Data for the individual scene can go back to April 2022 and be saved locally",
      },
      {
        icon: FiThumbsUp,
        title: "Quality of life improvements for site usability",
        description: "Improved site usability and performance in general",
      },
    ],
  },
  {
    date: "2024 Q3",
    contents: [
      {
        icon: FiTruck,
        title: "Land/Scene utilization for detailed metrics",
        //description: "",
      },
    ],
  },
]
