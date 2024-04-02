import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"

export const Unique_Visitors = ({ data }) => {
  console.log(data)
  
  return (
    <BoxWrapper colSpan={0}>
      <PlainBoxTitle name="Unique Visitors" description="description" />
    </BoxWrapper>
  )
}
