import React, { ReactNode, useEffect, useState } from "react"
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
import { motion } from "framer-motion"

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode
}) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const sidebarCollapsed = localStorage.getItem("sidebar-collapsed")
  const [sidebarOpen, setSidebarOpen] = useState(
    sidebarCollapsed ? false : true
  )
  const sidebarStatus = sidebarOpen ? "180px" : "60px"

  const handleSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false)
      localStorage.setItem("sidebar-collapsed", "open")
    } else {
      setSidebarOpen(true)
      localStorage.removeItem("sidebar-collapsed")
    }
  }

  useEffect(() => {
    if (
      window.innerWidth < 768 &&
      sessionStorage.getItem("toast-desktop-status") !== "closed"
    ) {
      toast({
        title: "Desktop is recommended. ☹️",
        description: " For better experience, please use desktop!",
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
      <SidebarContent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarStatus={sidebarStatus}
        handleSidebar={handleSidebar}
        isOpen={isOpen}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
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
          {/* @ts-ignore */}
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <TopBar onOpen={onOpen} sidebarStatus={sidebarStatus} />
      <Flex
        align="center"
        justify="center"
        w={["100%", "100%", `calc(100% - ${sidebarStatus})`]}
        ml={{ base: 0, md: sidebarStatus }}
      >
        <Box w="100%" maxW="1920px" p="4" data-testid="sidebar">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </Box>
      </Flex>
    </Box>
  )
}
