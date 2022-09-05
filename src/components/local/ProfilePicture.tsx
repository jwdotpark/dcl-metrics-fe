import {
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
import staticAvatar from "../../../public/avatar.png"

const ProfilePicture = ({ address, verified }) => {
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

  return (
    <>
      <Center
        borderRadius="full"
        display="inline-block"
        border="1px solid"
        borderColor="gray.300"
        overflow="clip"
      >
        {isLoading ? (
          <Center h="100%">
            <Spinner size="sm" />
          </Center>
        ) : (
          <Box>
            <Avatar
              src={pic}
              size="sm"
              showBorder={true}
              borderColor="gray.300"
            ></Avatar>
            {verified && (
              <Tooltip
                label="Verified user"
                placement="auto"
                // eslint-disable-next-line
                color={useColorModeValue("black", "white")}
                fontSize="sm"
                // eslint-disable-next-line
                bg={useColorModeValue("gray.300", "gray.700")}
                borderRadius="md"
              >
                <Box
                  position="absolute"
                  css={{ transform: "translateX(16px) translateY(-14px)" }}
                >
                  <Image
                    src={verifiedBadge}
                    alt="verified logo"
                    width="24"
                    height="24"
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
