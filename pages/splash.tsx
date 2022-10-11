import { Center, Box, Text, Button, Image, VStack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { NextPage } from "next"
import Link from "next/link"
import image from "../public/images/image.png"
import background from "../public/images/background.png"
import { motion } from "framer-motion"

const Index: NextPage = () => {
  // initial hydration error..?
  const [page, setPage] = useState()
  useEffect(() => {
    // @ts-ignore
    setPage(<FrontPage />)
  }, [])
  return page
}

export default Index

const FrontPage = () => {
  return (
    <Box w="100vw" maxW="100%" h="100vh">
      <Center w="100vw" maxW="100%" h="100vh" css={{ overflow: "hidden" }}>
        <Box className="outer">
          <Background />
        </Box>
        <Card />
      </Center>
    </Box>
  )
}

const Background = () => {
  const [backgroundPic, setBackgroundPic] = useState("")
  useEffect(() => {
    setBackgroundPic(background.src)
  }, [])
  return (
    <Box
      pos="absolute"
      zIndex="-1"
      top="0"
      left="0"
      display="inline-block"
      overflow="hidden"
      w="100%"
      h="100%"
      css={{ filter: "brightness(0.25) " }}
    >
      <Image
        // src={background.src}
        display="block"
        w="100%"
        h="100%"
        transition="0.3s ease-in-out"
        objectFit="cover"
        alt="background image"
        css={{ transform: "scale(1.2)" }}
        src={backgroundPic}
      />
    </Box>
  )
}

const Card = () => {
  const [pic, setPic] = useState("")
  useEffect(() => {
    setPic(image.src)
  }, [])
  return (
    <VStack p="2" bg="gray.100" borderRadius="2rem" shadow="xl">
      <Box>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Image
            // src={image.src}
            boxSize="200px"
            mt="8"
            mx="8"
            border="2px solid"
            borderColor="gray.300"
            borderRadius="1rem"
            shadow="xl"
            alt="background image"
            src={pic}
          />
        </motion.div>
      </Box>
      <Box py="2">
        <Text
          fontSize="30px"
          fontWeight="extrabold"
          css={{
            textShadow: `0px 2px 2px rgba(0,0,0,0.2),
       0px 8px 13px rgba(0,0,0,0.1),
       0px 18px 23px rgba(0,0,0,0.1);`,
          }}
        >
          DCL Metrics
        </Text>
      </Box>
      <Box pt="0" pb="8">
        <ToHome />
      </Box>
    </VStack>
  )
}

const ToHome = () => {
  return (
    <Link href="/">
      <Button
        w="170px"
        fontWeight={"normal"}
        bg={"red.400"}
        shadow="md"
        _hover={{ bg: "red.500" }}
        colorScheme={"red"}
        rounded="xl"
        size={"lg"}
      >
        Get started
      </Button>
    </Link>
  )
}
