import { Box, Avatar, Center } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import verifiedBadge from "../../../public/verified.svg"
import guestBadge from "../../../public/guest.svg"
import ToolTip from "../layout/local/ToolTip"

const ProfilePicture = ({ name, address, verified, guest }) => {
  const [profileImage, setProfileImage] = useState<string>()
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)

  if (verified) {
    guest = false
  }

  const fetchUserPicture = async (address) => {
    const url = `https://peer-ec1.decentraland.org/lambdas/profiles/${address}`
    setIsLoading(true)
    try {
      const res = await fetch(url)
      const data = await res.json()
      const image = data.avatars[0].avatar.snapshots.face256
      setProfileImage(image)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserPicture(address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Center display="inline-block" borderRadius="full">
        <Box w="2rem">
          <Avatar
            borderColor="gray.300"
            name={name}
            showBorder={true}
            size="xs"
            src={profileImage}
          />

          {guest && (
            <ToolTip label="Guest user">
              <Box
                display="inline-block"
                boxSize="12px"
                border="1px solid yellow"
                borderRadius="full"
                bgColor="yellow.200"
                css={{ transform: "translateX(-12px) translateY(12px)" }}
              >
                <Center h="100%">
                  <Image objectFit="cover" src={guestBadge} alt="guest user" />
                </Center>
              </Box>
            </ToolTip>
          )}
          {verified && (
            <ToolTip label="User owns DCL ENS token">
              <Box
                display="inline-block"
                css={{ transform: "translateX(-16px) translateY(12px)" }}
              >
                <Image
                  src={verifiedBadge}
                  alt="verified logo"
                  width="18"
                  height="18"
                />
              </Box>
            </ToolTip>
          )}
        </Box>
      </Center>
    </>
  )
}

export default ProfilePicture
