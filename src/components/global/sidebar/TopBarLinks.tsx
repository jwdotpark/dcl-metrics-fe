import { Box, Text, Center, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

export const TopbarLinks = () => {
  const router = useRouter()
  const activeColor = useColorModeValue("#6272A4", "#FFB86C")

  const links = [
    { name: "Home", path: "/" },
    { name: "User", path: "/users" },
    { name: "Scene", path: "/scenes" },
    { name: "Parcel", path: "/parcels" },
    { name: "Map", path: "/map" },
    { name: "World", path: "/worlds" },
    { name: "Event", path: "/events" },
    { name: "Status", path: "/status" },
    { name: "Blog", path: "/blog" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "About", path: "/about" },
  ]

  return (
    <Center gap={2} display={{ base: "none", md: "flex" }}>
      {links.map((link) => (
        <Link key={link.path} href={link.path} passHref>
          <Box
            as="a"
            color={router.pathname === link.path ? activeColor : "inherit"}
            fontWeight={router.pathname === link.path ? "black" : "normal"}
            opacity={router.pathname === link.path ? 1 : 0.75}
            _hover={{ textDecoration: "underline" }}
          >
            <Text>{link.name}</Text>
          </Box>
        </Link>
      ))}
    </Center>
  )
}
