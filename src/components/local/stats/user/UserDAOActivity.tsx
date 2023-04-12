import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"

const UserDAOActivity = ({ data }) => {
  console.log("dao activity", data)
  return (
    <BoxWrapper colSpan={[1, 1, 1, 2, 2]}>
      <BoxTitle
        name="User Activity"
        description={`${name}'s activity in Decentraland`}
        date=""
        avgData={[]}
        slicedData={{}}
        color={{}}
        line={false}
        setLine={{}}
      />
      asdf
    </BoxWrapper>
  )
}

export default UserDAOActivity
