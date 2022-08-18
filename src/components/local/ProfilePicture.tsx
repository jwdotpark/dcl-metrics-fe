import { Avatar, Center, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import staticAvatar from "../../../public/avatar.png"

const ProfilePicture = ({ address, modal }) => {
  const [pic, setPic] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchProfile = async () => {
    const url = `https://peer.decentraland.org/lambdas/profiles/${address}`
    const result = await fetch(url)
    const data = await result.json()

    if (process.env.NEXT_PUBLIC_ENV === "prod" && data.avatars[0]) {
      const avatar = data.avatars[0].avatar.snapshots.face256
      setPic(avatar)
    } else {
      // @ts-ignore
      setPic(staticAvatar.src)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (process.env.NEXT_PUBLIC_ENV === "prod") {
      fetchProfile()
    } else {
      // @ts-ignore
      setPic(staticAvatar.src)
    }

    setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Center
        borderRadius="full"
        display="inline-block"
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
          <Avatar src={pic} size={modal ? "md" : "sm"} />
        )}
      </Center>
    </>
  )
}

export default ProfilePicture
