import { Image, WrapItem, Avatar, Box, Center, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchResult } from "../../lib/hooks/fetch"
import staticAvatar from "../../../public/avatar.png"

const ProfilePicture = ({ address, modal }) => {
  const [pic, setPic] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const ENV = process.env.NEXT_PUBLIC_ENV
  const staticPic =
    "https://peer-eu1.decentraland.org/content/contents/bafkreiawwdcbesqxgj6d66brhnjtastcnl24at4avhzsllp226ejphofq4"

  const fetchProfile = async () => {
    const url = `https://peer.decentraland.org/lambdas/profiles/${address}`
    const result = await fetch(url)
    const data = await result.json()

    if (ENV === "prod" && data.avatars[0]) {
      const avatar = data.avatars[0].avatar.snapshots.face256
      setPic(avatar)
    } else {
      // @ts-ignore
      setPic(staticAvatar.src)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchProfile()
    setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Center
        borderRadius="full"
        display="inline-block"
        boxSize={modal ? "10rem" : ""}
        border="1px solid"
        borderColor="gray.300"
        backgroundColor="gray.300"
        overflow="clip"
      >
        {isLoading ? (
          <Center h="100%">
            <Spinner size="sm" />
          </Center>
        ) : (
          <Avatar src={pic} size="xs" />
        )}
      </Center>
    </>
  )
}

export default ProfilePicture
