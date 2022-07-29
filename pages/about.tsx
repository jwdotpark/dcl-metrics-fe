import {
  Center,
  Image,
  Text,
  Box,
  VStack,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import background from "../public/images/background.png"
import background2 from "../public/images/background2.png"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const About = () => {
  const box = {
    h: "100%",
    w: "100%",
    m: "5rem",
  }

  const widthVariant = useBreakpointValue({ base: ".2rem", md: "1rem" })
  const boxVariant = useBreakpointValue({ base: "18rem", md: "450px" })
  const degVariant = useBreakpointValue({ base: "0deg", md: "1" })

  const bp = {
    sm: "320px",
    md: "1200px",
    lg: "1200px",
    xl: "1200px",
    "2xl": "1536px",
  }

  return (
    <Layout>
      <Box px={widthVariant}>
        <Box w="100%" h="100%" p="4" mb="4">
          <Text fontSize="5xl" fontWeight="extrabold">
            Read the statistics,
          </Text>
          <Text fontSize="5xl" fontWeight="extrabold" color="gray.400">
            behind the most recent data.
          </Text>
        </Box>
        <Stack
          direction={["column", "column", "column", "row"]}
          overflow="clip"
        >
          <Box
            w={box.w}
            h={box.h}
            // minW="500px"
            bg="blue.50"
            borderRadius="20px"
            css={{ transform: `rotate(${degVariant}deg) scale(0.8)` }}
            boxShadow="xl"
            zIndex="1"
          >
            <LeftCard widthVariant={widthVariant} boxVariant={boxVariant} />
          </Box>
          <Box
            w={box.w}
            h={box.h}
            // minW="500px"
            bg="gray.200"
            borderRadius="20px"
            css={{
              transform: `rotate(${Number(degVariant) * -1}deg) scale(0.8)`,
            }}
            boxShadow="xl"
            zIndex="1"
          >
            <RightCard widthVariant={widthVariant} boxVariant={boxVariant} />
          </Box>
        </Stack>
      </Box>
    </Layout>
  )
}

export default About

const LeftCard = ({ widthVariant, boxVariant }) => {
  const [pic, setPic] = useState("")
  useEffect(() => {
    setPic(background.src)
  }, [])

  return (
    <Box h="100%" w="100%" px={widthVariant} py="6">
      <Center my="4">
        <VStack>
          <Text fontSize="4xl" fontWeight="extrabold">
            Early data.
          </Text>

          <Text fontSize="2xl" fontWeight="extrabold" color="gray.400">
            How it all started.
          </Text>
        </VStack>
      </Center>
      <Center p="4" my="4">
        <motion.div
          transition={{
            repeat: Infinity,
            duration: 100,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          animate={{
            scale: [1, 1.05, 0.95, 1.05, 1],
            rotate: [1, -1, 1, -1, 0],
          }}
          // whileHover={{
          //   scale: 1.05,
          //   transition: { duration: 0.25, ease: "easeInOut" },
          // }}
          whileTap={{
            scale: 0.99,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
        >
          <Image
            src={pic}
            alt="background image"
            boxSize={boxVariant}
            borderRadius="xl"
            boxShadow="xl"
          />
        </motion.div>
      </Center>
      <Text fontSize="lg" color="gray.600" mx="10" my="4" mb="8" h="100%">
        In the past year Decentraland has seen wild growth: casinos, P2E games,
        event venues, real estate companies, ad agencies and more are
        terraforming the metaverse, changing it from an endless expanse of
        auto-generated shrubs to a living, breathing world.
      </Text>
      <Text fontSize="lg" color="gray.600" mx="10" my="4" mb="8" h="100%">
        On top of that, there is the foundation, tasked with building the tools
        to keep it running and the DAO which, as a community, makes choices
        which affect Decentraland&apos;s future.
      </Text>
    </Box>
  )
}

const RightCard = ({ widthVariant, boxVariant }) => {
  const [pic, setPic] = useState("")
  useEffect(() => {
    setPic(background2.src)
  }, [])

  return (
    <Box h="100%" w="100%" px={widthVariant} py="6">
      <Center my="4">
        <VStack>
          <Text fontSize="4xl" fontWeight="extrabold">
            Long term vision.
          </Text>

          <Text fontSize="2xl" fontWeight="extrabold" color="gray.400">
            Our mission progress.
          </Text>
        </VStack>
      </Center>
      <Center p="4" my="4">
        <motion.div
          transition={{
            repeat: Infinity,
            duration: 100,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          animate={{
            scale: [1, 1.05, 0.95, 1.05, 1],
            rotate: [1, -1, 1, -1, 0],
          }}
          // whileHover={{
          //   scale: 1.05,
          //   transition: { duration: 0.25, ease: "easeInOut" },
          // }}
          whileTap={{
            scale: 0.99,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
        >
          <Image
            src={pic}
            alt="background image"
            boxSize={boxVariant}
            borderRadius="xl"
            boxShadow="xl"
          />
        </motion.div>
      </Center>
      <Text fontSize="lg" color="gray.600" mx="10" my="4" mb="8" h="100%">
        It is critically important for each of these groups to understand their
        audience in order to make the best possible decisions - and we have the
        means to do that! The web3 world is literally made of data, but
        it&apos;s difficult to understand and access without building your own
        solution to acquire and interpret it.
      </Text>
      <Text fontSize="lg" color="gray.600" mx="10" my="4" mb="8" h="100%">
        DCL-Metrics aims to make that data accessible so it can be used by the
        community to build a better metaverse.
      </Text>
    </Box>
  )
}
