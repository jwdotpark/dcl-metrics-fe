import type { NextPage } from "next"
import Head from "next/head"
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Layout from "../src/components/layout/layout"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DCL Stats</title>
        <meta name="DCL Stats" content="DCL Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout />
      </main>

      {/* <footer>footer</footer> */}
    </div>
  )
}

export default Home
