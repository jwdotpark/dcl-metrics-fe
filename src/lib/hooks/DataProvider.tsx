import { createContext } from "react"

const data = {
  visitors: [],
  visitorsLoading: false,
}

export const DataContext = createContext(data)

const DataProvider = ({ children }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export default DataProvider
