import { useEffect } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"

const Rental = ({ data }) => {
  return <BoxWrapper>{JSON.stringify(data)}</BoxWrapper>
}

export default Rental
