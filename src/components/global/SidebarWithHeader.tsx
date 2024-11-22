import React, { useEffect, useState } from "react"
import {
  useToast,
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react"
import TopBar from "./sidebar/TopBar"
import SidebarContent from "./sidebar/SidebarContent"

export default function SidebarWithHeader({
  //psa,
  children,
}: any) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  //const [sidebarOpen, setSidebarOpen] = useState(false)
  //const sidebarStatus = sidebarOpen ? "180px" : "60px"

  useEffect(() => {
    if (
      window.innerWidth < 768 &&
      sessionStorage.getItem("toast-desktop-status") !== "closed"
    ) {
      toast({
        title: "Desktop is recommended. ☹️",
        description: " For a better experience, please use desktop!",
        status: "info",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          sessionStorage.setItem("toast-desktop-status", "closed")
        },
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "blackAlpha.900")}>
      {/*<SidebarContent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarStatus={sidebarStatus}
        handleSidebar={handleSidebar}
        isOpen={isOpen}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        id="sidebar-content"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />*/}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={onClose}
        placement="left"
        returnFocusOnClose={false}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <TopBar onOpen={onOpen} />
      <Flex
        align="center"
        justify="center"
        //w={["100%", "100%", `calc(100% - 60px)`]}
        w="100%"
        //ml={{ base: 0, md: "60px" }}
      >
        <Box w="100%" maxW="1920px" m="4" py="2" data-testid="sidebar">
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
