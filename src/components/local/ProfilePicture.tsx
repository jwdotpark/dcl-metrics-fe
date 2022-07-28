import { Image, WrapItem, Avatar, Box, Center, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchResult } from "../../lib/hooks/fetch"

const ProfilePicture = ({ address, modal }) => {
  const [pic, setPic] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchProfile = async () => {
    const url = `https://peer.decentraland.org/lambdas/profiles/${address}`
    const result = await fetch(url)
    const data = await result.json()
    const avatar = data.avatars[0].avatar.snapshots.face256
    setPic(avatar)
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
