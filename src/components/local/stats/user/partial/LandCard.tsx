/* eslint-disable react-hooks/rules-of-hooks */
import {
  Center,
  Image,
  Text,
  Box,
  useColorModeValue,
  Button,
  Divider,
  Spinner,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { mutateStringToURL } from "../../../../../lib/hooks/utils"

const LandCard = ({ land }) => {
  const [parcelData, setParcelData] = useState<any>()
  const [estateData, setEstateData] = useState<any>()
  const [cardLoading, setCardLoading] = useState(false)
  const [error, setError] = useState<any>()
  const [extractedCoord, setExtractedCoor] = useState({ x: 0, y: 0 })
  const [imageUrl, setImageUrl] = useState("")

  const getUUID = async (x, y, category: string) => {
    try {
      const req = await fetch(`/api/getUUID?x=${x}&y=${y}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      })
      const res = await req.json()
      if (category === "parcel") {
        setParcelData(res)
      } else if (category === "estate") {
        setParcelData(res)
      }
    } catch (error) {
      setError(error)
    }
  }

  const getEstateParcel = async () => {
    try {
      const url = `https://nft-api.decentraland.org/v1/nfts?contractAddress=${land.contractAddress}&tokenId=${land.tokenId}`
      const req = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      })
      const res = await req.json()
      setEstateData(res)
    } catch (error) {
      setError(error)
    }
  }

  const getImageUrl = async () => {
    const url = land.image
    const res = await fetch(url)
    const data = res.url
    setImageUrl(data)
  }

  const checkDissolved = () => {
    if (imageUrl.includes("dissolved_estate")) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    setCardLoading(true)
    if (land.category === "parcel") {
      getUUID(land.x, land.y, "parcel")
    }

    if (land.category === "estate") {
      getEstateParcel()
      const x = estateData?.data[0]?.nft?.data?.estate?.parcels[0]?.x
      const y = estateData?.data[0]?.nft?.data?.estate?.parcels[0]?.y
      setExtractedCoor({ x, y })
      getUUID(extractedCoord.x, extractedCoord.y, "estate")
    }
    getImageUrl()
    setCardLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [land])

  let LandCardContent: JSX.Element

  if (cardLoading) {
    LandCardContent = (
      <Center minH="400px">
        <Spinner />
      </Center>
    )
  } else if (error) {
    LandCardContent = <Center minH="300px">{JSON.stringify(error)}</Center>
  } else {
    LandCardContent = (
      <>
        <Box
          key={land.tokenId}
          sx={{
            filter: checkDissolved() ? "grayScale(100%)" : "none",
            p: "4",
            bg: useColorModeValue("gray.300", "gray.700"),
            shadow: "md",
            rounded: "xl",
            _hover: {
              bg:
                !checkDissolved() && useColorModeValue("gray.400", "gray.800"),
              transition: "background-color 0.5s",
            },
          }}
        >
          <Image
            w="100%"
            minH="50px"
            borderRadius="xl"
            alt={land.name}
            src={land.image}
          />
          <Box p="2">
            <Box my={2} fontSize="xs">
              {land.category ? land.category.toUpperCase() : "No Category"}
              {land.x && land.y && `[${land.x}, ${land.y}]`}
            </Box>
            <Box my={2} fontSize="xl" fontWeight="bold">
              {land.name && land.name.length > 1 ? land.name : "No Name"}
            </Box>
            <Box fontSize="sm">
              <Text noOfLines={3}>
                {land.description && land.description.length > 1
                  ? land.description
                  : "No Description"}
              </Text>
            </Box>
          </Box>
          <Box m="2">
            <>
              {parcelData?.result.length > 0 && (
                <>
                  <Divider
                    my="2"
                    color={useColorModeValue("gray.800", "gray.800")}
                  />
                  <Box mb="4">
                    <Text mb="2" fontSize="xs" fontWeight="semibold">
                      Past scene on this parcel
                    </Text>
                  </Box>
                </>
              )}
              {parcelData &&
                parcelData.result.map((item) => {
                  return (
                    <>
                      <Link
                        href={`/scenes/${mutateStringToURL(item.name)}/${
                          item.uuid
                        }`}
                        target="_blank"
                        key={item.uuid}
                      >
                        <Button
                          mr="2"
                          mb="2"
                          borderRadius="xl"
                          shadow="md"
                          colorScheme="gray"
                          size="xs"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    </>
                  )
                })}
            </>
          </Box>
        </Box>
      </>
    )
  }

  return <>{LandCardContent}</>
}

export default LandCard
