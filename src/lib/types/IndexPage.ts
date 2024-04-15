export interface DataObjectType {
  active_parcels: number
  active_scenes: number
  users: {
    guest_users: number
    named_users: number
    new_users: number
    unique_users: number
  }
  degraded: boolean
}

export interface DataArrayType {
  date: string
  active_parcels: number
  active_scenes: number
  guest_users: number
  named_users: number
  new_users: number
  unique_users: number
  degraded: boolean
}
