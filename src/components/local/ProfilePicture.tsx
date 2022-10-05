import {
  Text,
  useColorModeValue,
  Box,
  Avatar,
  Center,
  Spinner,
  Tooltip,
} from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import verifiedBadge from "../../../public/verified.svg"
import guestBadge from "../../../public/guest.svg"
import staticAvatar from "../../../public/avatar.png"

const ProfilePicture = ({ address, verified, guest }) => {
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
          <Box w="2rem">
            <Avatar
              borderColor="gray.300"
              showBorder={true}
              size="sm"
              src={pic}
            />
            {guest && (
              <Tooltip
                fontSize="sm"
                borderRadius="md"
                label="Guest user"
                placement="auto"
              >
                <Box
                  display="inline-block"
                  boxSize="14px"
                  border="1px solid yellow"
                  borderRadius="full"
                  bgColor="yellow.200"
                  css={{ transform: "translateX(-12px) translateY(16px)" }}
                >
                  <Center h="100%">
                    <Image
                      objectFit="cover"
                      src={guestBadge}
                      alt="guest user"
                    />
                  </Center>
                </Box>
              </Tooltip>
            )}
            {verified && (
              <Tooltip
                fontSize="sm"
                borderRadius="md"
                label="User owns DCL ENS token"
                placement="auto"
              >
                <Box
                  display="inline-block"
                  css={{ transform: "translateX(-16px) translateY(14px)" }}
                >
                  <Image
                    src={verifiedBadge}
                    alt="verified logo"
                    width="22"
                    height="22"
                  />
                </Box>
              </Tooltip>
            )}
          </Box>
        )}
      </Center>
    </>
  )
}

export default ProfilePicture
