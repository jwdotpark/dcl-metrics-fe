import {
  Text,
  useBreakpointValue,
  Grid,
  useColorModeValue,
  Box,
  Switch,
  Button,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import GridBox from "../src/components/local/GridBox"
import MinorChange from "../src/components/local/changelog/MinorChange"
import MajorChange from "../src/components/local/changelog/MajorChange"
import { majorchangeTemplate } from "../src/components/local/changelog/majorchange"
import { useState } from "react"

const ChangeLog = () => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <GridBox box={box}>
          <MajorChange milestones={majorchangeTemplate} />
        </GridBox>
        <GridBox box={box}>
          <MinorChange />
        </GridBox>
      </Grid>
    </Layout>
  )
}

export default ChangeLog
