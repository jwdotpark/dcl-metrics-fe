interface MarathonUser {
  address: string
  avatar_url: string | null
  guest_user: boolean
  name: string
  verified_user: boolean
  time_spent: number
}

interface HistogramEntry {
  [key: string]: number
}

interface ParcelsHeatmap {
  [key: string]: number
}

export interface SceneDataType {
  name: string
  uuid: string
  date: string
  map_url: string
  visitors: number
  share_of_global_visitors: number
  avg_time_spent: number
  avg_time_spent_afk: number
  total_logins: number
  unique_logins: number
  total_logouts: number
  unique_logouts: number
  complete_sessions: number
  avg_complete_session_duration: number
  marathon_users: MarathonUser[]
  time_spent_histogram: number[][]
  visitors_by_hour_histogram: HistogramEntry
  parcels_heatmap: ParcelsHeatmap
}
