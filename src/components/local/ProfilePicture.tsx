import { Avatar, Center, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import staticAvatar from "../../../public/avatar.png"

const ProfilePicture = ({ address }) => {
  const [pic, setPic] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (process.env.NEXT_PUBLIC_ENV !== "prod") {
      setPic(address)
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
        backgroundColor="#A0AEC0FF"
        overflow="clip"
      >
        {isLoading ? (
          <Center h="100%">
            <Spinner size="sm" />
          </Center>
        ) : (
          <Avatar src={pic} size="sm" />
        )}
      </Center>
    </>
  )
}

export default ProfilePicture
