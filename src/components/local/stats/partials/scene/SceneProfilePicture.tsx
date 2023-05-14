import { Box, Avatar, Center, Spinner } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import verifiedBadge from "../../../../../../public/verified.svg"
import guestBadge from "../../../../../../public/guest.svg"
import staticAvatar from "../../../../../../public/avatar.png"
import ToolTip from "../../../../layout/local/ToolTip"

const SceneProfilePicture = ({ address, verified, guest }) => {
  const [pic, setPic] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (process.env.NEXT_PUBLIC_ENV === "prod") {
      setPic(address)
    } else {
      // @ts-ignore
      setPic(staticAvatar.src)
    }
    setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  if (verified) {
    guest = false
  }

  return (
    <>
      <Center display="inline-block" borderRadius="full">
        {isLoading ? (
          <Center h="100%">
            <Spinner size="sm" />
          </Center>
        ) : (
          <Box>
            <Avatar
              borderColor="gray.300"
              showBorder={true}
              size="xs"
              src={pic}
            />
            {guest && (
              <ToolTip label="Guest user">
                <Box
                  display="inline-block"
                  boxSize="12px"
                  border="1px solid yellow"
                  borderRadius="full"
                  bgColor="yellow.200"
                  css={{ transform: "translateX(12px) translateY(-12px)" }}
                >
                  <Center h="100%">
                    <Image
                      objectFit="cover"
                      src={guestBadge}
                      alt="guest user"
                    />
                  </Center>
                </Box>
              </ToolTip>
            )}
            {verified && (
              <ToolTip label="User owns DCL ENS token">
                <Box
                  display="inline-block"
                  css={{ transform: "translateX(12px) translateY(-12px)" }}
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
        )}
      </Center>
    </>
  )
}

export default SceneProfilePicture
