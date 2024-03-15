import { Center, Avatar, AvatarGroup, WrapItem } from "@chakra-ui/react"
import Link from "next/link"
import useSWR from "swr"
import ToolTip from "../../../layout/local/ToolTip"

export const Profile = ({ id }) => {
  const endpoint = `https://peer-ap1.decentraland.org/lambdas/profiles?id=${id}`
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data } = useSWR(endpoint, fetcher)

  const { name, avatar } =
    data && data.length > 0 ? data[0].avatars[0] : "no data"
  const profileImage = avatar?.snapshots?.face256

  return (
    <WrapItem
      _hover={{
        transform: "scale(1.02)",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
      }}
    >
      <ToolTip label={name ? name : "N/A"}>
        <Link href={`/users/${id}`} target="_blank">
          <Center overflow="hidden" w="auto" h="auto">
            <AvatarGroup>
              <Avatar size={["md", "lg"]} src={profileImage} />
            </AvatarGroup>
          </Center>
        </Link>
      </ToolTip>
    </WrapItem>
  )
}
