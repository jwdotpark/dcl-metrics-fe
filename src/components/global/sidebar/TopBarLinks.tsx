/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text, Center, useColorModeValue, Tooltip } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { topbarLinks } from "../../../lib/data/grid/topbarItems"
import { TopbarHoverCard } from "./TopbarHoverCard"
//import { topbarLinks } from "../../../lib/data/grid/topbarLinks"

export const TopbarLinks = () => {
  const router = useRouter()
  const activeColor = useColorModeValue("#6272A4", "#FFB86C")

  return (
    <Center gap={2} display={{ base: "none", md: "flex" }}>
      {topbarLinks.map((link) => {
        const isActive =
          link.path === "/"
            ? router.pathname === link.path
            : router.pathname.startsWith(link.path)
        const thumbnail = useColorModeValue(
          `/images/top/${link.name.toLowerCase()}_l.png`,
          `/images/top/${link.name.toLowerCase()}_d.png`
        )
        return (
          <Link key={link.path} href={link.path} passHref>
            <Tooltip
              sx={{
                padding: 0,
                bg: "transparent",
                boxShadow: "none",
              }}
              hasArrow
              label={
                <TopbarHoverCard
                  name={link.name}
                  image={thumbnail}
                  description={link.description}
                />
              }
            >
              <Box
                as="a"
                color={isActive ? activeColor : "inherit"}
                fontSize={isActive ? "lg" : "md"}
                fontWeight={isActive ? "black" : "semibold"}
                opacity={isActive ? 1 : 0.75}
                _hover={{ textDecoration: "underline" }}
              >
                <Text>{link.name}</Text>
              </Box>
            </Tooltip>
          </Link>
        )
      })}
    </Center>
  )
}
