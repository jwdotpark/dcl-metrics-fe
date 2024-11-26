/* eslint-disable react-hooks/rules-of-hooks */
import {
  Image,
  Box,
  useColorModeValue,
  Center,
  Container,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import BoxWrapper from "../layout/local/BoxWrapper"

const AboutList = () => {
  return (
    <>
      <Box
        overflow="clip"
        h="100vh"
        m="-4"
        bg={useColorModeValue(
          "linear-gradient(322deg, rgba(250,146,248,1) 0%, rgba(145,198,252,1) 49%, rgba(241,246,252,1) 100%)",
          "linear-gradient(322deg, rgba(70,20,69,1) 0%, rgba(38,80,124,1) 49%, rgba(69,71,73,1) 100%)"
        )}
        bgSize="cover"
      >
        <Center>
          <Container maxW={"8xl"} borderRadius="xl">
            <Box
              maxW="64rem"
              px={{ base: "1rem", md: "0" }}
              py={{ base: "3rem", md: "4rem" }}
              marginX="auto"
            >
              <Heading
                as="h3"
                mb={{ base: "4", md: "2" }}
                pb={4}
                fontSize="1.5rem"
                fontWeight="bold"
                textAlign="left"
                borderColor={useColorModeValue("gray.600", "gray.400")}
                borderBottom="1px solid"
              >
                DCL-Metrics
              </Heading>
              <Flex
                as="section"
                zIndex="2"
                align="start"
                justify="between"
                direction={{ base: "column", md: "row" }}
                my={{ base: "1.5rem", md: "2.5rem" }}
                pb={8}
                borderColor={useColorModeValue("gray.600", "gray.400")}
                borderBottom="1px solid"
              >
                {featuresList.map((feature) => {
                  return (
                    <Box
                      key={feature.id}
                      w={{ base: "100%", md: 1 / 3 }}
                      mb={{ base: "6", md: "0" }}
                      px={{ md: "0.5rem" }}
                    >
                      {feature.icon}
                      <Text
                        mt={3}
                        mb={1}
                        color={useColorModeValue("gray.700", "gray.100")}
                        fontWeight="700"
                        textAlign="left"
                      >
                        {feature.title}
                      </Text>
                      <Text
                        mt={3}
                        mb={1}
                        color={useColorModeValue("gray.700", "gray.100")}
                        fontSize="0.875rem"
                        textAlign="left"
                      >
                        {feature.desc}
                      </Text>
                    </Box>
                  )
                })}
              </Flex>
              <Flex
                as="section"
                zIndex="2"
                align="start"
                justify="between"
                direction={{ base: "column", md: "row" }}
                my={{ base: "1.5rem", md: "2.5rem" }}
                pb={8}
                borderColor={useColorModeValue("gray.600", "gray.400")}
                borderBottom="1px solid"
              >
                {linkList.map((link) => {
                  return (
                    <Box
                      key={link.id}
                      w={{ base: "100%", md: 1 / 3 }}
                      mb={{ base: "6", md: "0" }}
                      px={{ md: "0.5rem" }}
                    >
                      {link.icon}
                      <Text
                        mt={3}
                        mb={1}
                        color={useColorModeValue("gray.700", "gray.100")}
                        fontWeight="700"
                        textAlign="left"
                      >
                        {link.title}
                      </Text>
                      <Text
                        mt={3}
                        mb={1}
                        color={useColorModeValue("gray.700", "gray.100")}
                        fontSize="0.875rem"
                        textAlign="left"
                      >
                        {link.desc}
                      </Text>
                    </Box>
                  )
                })}
              </Flex>
            </Box>
          </Container>
        </Center>
      </Box>
    </>
  )
}

export default AboutList

export const linkList = [
  {
    id: 1,
    title: (
      <Link href="https://github.com/DCL-Metrics" target="_blank">
        Github
      </Link>
    ),
    desc: "Our repository, housing both Frontend and Backend code, is publicly accessible and open for contributions.",
    icon: (
      <Box w="50px">
        <Image alt="github logo" src="/github-logo.png" />
      </Box>
    ),
  },
  {
    id: 2,
    title: (
      <Link href="https://decentraland.org/dao/" target="_blank">
        Decentraland DAO
      </Link>
    ),
    desc: "Our organization receives support from Decentraland DAO; plase refer to their page for comprehensive information.",
    icon: (
      <Box
        sx={{ filter: "grayscale(100%)", transform: "translateY(-5px)" }}
        w="60px"
        h="50px"
      >
        <Image alt="github logo" src="/decentraland_bw.png" />
      </Box>
    ),
  },
]

export const featuresList = [
  {
    id: 1,
    title: "Value",
    desc: "In the past year Decentraland has seen wild growth: casinos, P2E games, event venues, real estate companies, ad agencies and more are terraforming the metaverse, changing it from an endless expanse of auto-generated shrubs to a living, breathing world.",
    icon: (
      <svg
        style={{ width: "2.75rem", height: "2.75rem" }}
        width="64px"
        height="64px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 92 92"
      >
        <path
          id="XMLID_1666_"
          d="M46,0C20.6,0,0,20.6,0,46s20.6,46,46,46s46-20.6,46-46S71.4,0,46,0z M49.7,83.8c-0.2,0-0.4,0-0.7,0.1V62.2
     c5.2-0.1,9.9-0.2,14.2-0.5C59.4,73.4,52.3,81.2,49.7,83.8z M42.3,83.8c-2.7-2.7-9.7-10.5-13.5-22.1c4.2,0.3,9,0.5,14.2,0.5v21.7
     C42.8,83.9,42.6,83.8,42.3,83.8z M8,46c0-2.5,0.3-5,0.7-7.4c2.2-0.4,6.4-1,12.3-1.6c-0.5,2.9-0.8,5.9-0.8,9.1c0,3.2,0.3,6.2,0.7,9
     c-5.8-0.6-10.1-1.2-12.3-1.6C8.3,51,8,48.5,8,46z M26.3,46c0-3.4,0.4-6.6,1-9.6c4.6-0.3,9.8-0.6,15.7-0.6v20.4
     c-5.8-0.1-11.1-0.3-15.8-0.7C26.7,52.6,26.3,49.4,26.3,46z M49.6,8.2c2.7,2.7,9.6,10.7,13.5,22.1c-4.2-0.3-8.9-0.5-14.1-0.5V8.1
     C49.2,8.1,49.4,8.2,49.6,8.2z M43,8.1v21.7c-5.2,0.1-9.9,0.2-14.1,0.5c3.8-11.4,10.8-19.4,13.4-22.1C42.6,8.2,42.8,8.1,43,8.1z
      M49,56.2V35.8c5.8,0.1,11.1,0.3,15.7,0.6c0.6,3,1,6.2,1,9.6c0,3.4-0.3,6.6-0.9,9.6C60.2,55.9,54.9,56.1,49,56.2z M70.9,37
     c5.9,0.6,10.1,1.2,12.3,1.6C83.7,41,84,43.5,84,46c0,2.5-0.3,5-0.7,7.4c-2.2,0.4-6.4,1-12.3,1.6c0.5-2.9,0.7-5.9,0.7-9.1
     C71.7,42.9,71.4,39.8,70.9,37z M81.4,32.2c-2.8-0.4-6.8-0.9-11.9-1.4c-2.4-8.6-6.6-15.5-10.1-20.4C69.5,14.2,77.5,22.2,81.4,32.2z
      M32.6,10.4c-3.6,4.8-7.7,11.7-10.1,20.3c-5,0.4-9,1-11.9,1.4C14.5,22.2,22.6,14.2,32.6,10.4z M10.6,59.8c2.8,0.4,6.8,0.9,11.8,1.4
     c2.4,8.6,6.4,15.5,10,20.3C22.4,77.6,14.5,69.7,10.6,59.8z M59.6,81.5c3.6-4.8,7.6-11.6,10-20.2c5-0.4,9-1,11.8-1.4
     C77.5,69.7,69.6,77.6,59.6,81.5z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Integration",
    desc: "On top of that, there is the foundation, tasked with building the tools to keep it running and the DAO which, as a community, makes choices which affect Decentraland's future.",
    icon: (
      <svg
        style={{ width: "2.75rem", height: "2.75rem", transform: "scale(1.1)" }}
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
      >
        <path d="M12.2407 2.96432C12.0063 2.96432 11.797 3.07184 11.6595 3.24024L11.6024 3.28346C9.45801 2.63339 7.03194 3.15091 5.33598 4.83602C3.82743 6.33492 3.24863 8.40778 3.59957 10.3471L3.58455 10.3619L2.6274 11.3129C1.7951 12.1399 1.7951 13.4807 2.6274 14.3077C3.11636 14.7935 3.78381 14.9939 4.42002 14.9089C4.51377 15.2552 4.6974 15.5824 4.9709 15.8542C5.34265 16.2235 5.81755 16.4279 6.30347 16.4673C6.34307 16.9503 6.54878 17.4223 6.92061 17.7917C7.30952 18.1781 7.81134 18.384 8.32054 18.4093C8.34607 18.9151 8.55325 19.4136 8.94208 19.7999C9.70236 20.5554 10.8942 20.6207 11.7291 19.996L12.1156 20.3801C12.952 21.2111 14.3079 21.2111 15.1443 20.3801C15.5147 20.012 15.721 19.5428 15.7633 19.0621C16.2462 19.021 16.7177 18.8168 17.0874 18.4495C17.4581 18.0812 17.6636 17.6114 17.7043 17.1303C18.1809 17.0858 18.6453 16.8821 19.0104 16.5193C19.2966 16.235 19.4844 15.89 19.5738 15.526C20.2005 15.6003 20.854 15.3986 21.3349 14.9208C22.1672 14.0938 22.1672 12.753 21.3349 11.926L20.5014 11.0979L20.6727 10.4313C21.045 8.98208 20.8578 7.44693 20.1482 6.12848C19.1007 4.182 17.0615 2.96933 14.8448 2.96933L13.2381 2.96933C13.1696 2.96601 13.1008 2.96432 13.0316 2.96432H12.2407ZM15.1649 7.90945L18.6286 11.351L18.6325 11.3551L18.6458 11.3687L20.2708 12.9833C20.5155 13.2264 20.5155 13.6205 20.2708 13.8635C20.0262 14.1066 19.6296 14.1066 19.3849 13.8635L17.7599 12.2489C17.4661 11.9569 16.9897 11.9569 16.6959 12.2489L16.6796 12.2651C16.3857 12.557 16.3857 13.0304 16.6796 13.3223L17.9464 14.581C18.1912 14.8243 18.1912 15.2188 17.9464 15.4621C17.7232 15.6838 17.3724 15.7037 17.1274 15.5206C16.8267 15.2958 16.4051 15.3263 16.1403 15.592C15.8756 15.8577 15.8491 16.2769 16.0784 16.5734C16.2668 16.8171 16.2481 17.1689 16.0234 17.3922C15.7968 17.6173 15.4389 17.6344 15.1934 17.4424C14.8947 17.2087 14.4674 17.2332 14.1977 17.4995C13.9279 17.7658 13.9006 18.1902 14.1339 18.4885C14.3276 18.7361 14.3093 19.0952 14.0802 19.3228C13.8315 19.5699 13.4284 19.5699 13.1797 19.3228L12.808 18.9535L12.9132 18.8489C13.7455 18.0219 13.7455 16.6811 12.9132 15.8542C12.5243 15.4677 12.0225 15.2619 11.5133 15.2366C11.4878 14.7308 11.2806 14.2323 10.8918 13.8459C10.52 13.4766 10.0451 13.2722 9.55922 13.2328C9.51962 12.7499 9.3139 12.2779 8.94208 11.9084C8.45311 11.4226 7.78567 11.2222 7.14945 11.3072C7.0557 10.9609 6.87208 10.6337 6.59857 10.3619C6.16723 9.93332 5.597 9.72685 5.03184 9.7425C4.88504 8.36976 5.34111 6.94543 6.40004 5.89327C7.38426 4.91535 8.69207 4.45489 9.98101 4.5119L8.48356 5.64643C7.45969 6.42216 7.26245 7.87941 8.04327 8.89941C8.82232 9.91708 10.2805 10.1144 11.302 9.34048L13.1908 7.90945H15.1649ZM9.3894 6.84203L12.5277 4.46432H13.0316C13.0811 4.46432 13.1302 4.46565 13.1789 4.46826C13.1922 4.46898 13.2056 4.46933 13.219 4.46933H14.8448C16.513 4.46933 18.043 5.38193 18.8274 6.83933C19.3221 7.7586 19.4773 8.8178 19.2712 9.83451L16.0591 6.63806C15.9178 6.49195 15.7232 6.40945 15.52 6.40945L12.9388 6.40945C12.7752 6.40945 12.6162 6.4629 12.4858 6.56165L10.3962 8.14487C10.0326 8.42032 9.5116 8.3498 9.23434 7.98762C8.95886 7.62776 9.02817 7.11571 9.3894 6.84203ZM6.03496 14.7969C5.86706 14.6301 5.81439 14.3921 5.87697 14.1807C5.90557 14.084 5.95823 13.9929 6.03496 13.9167L6.99212 12.9657C7.23675 12.7226 7.63338 12.7226 7.87802 12.9657C8.11986 13.2059 8.12262 13.5938 7.8863 13.8375L7.87776 13.8459L6.92061 14.797L6.91236 14.8052C6.8374 14.877 6.74888 14.9265 6.65519 14.9539C6.44237 15.0161 6.20287 14.9637 6.03496 14.7969ZM5.54368 11.4285C5.61917 11.5066 5.67014 11.5995 5.69659 11.6976C5.75261 11.9054 5.6986 12.1364 5.53451 12.2994L4.57736 13.2504C4.33272 13.4935 3.93609 13.4935 3.69146 13.2504C3.44682 13.0073 3.44682 12.6133 3.69146 12.3702L4.64861 11.4192C4.89325 11.1761 5.28988 11.1761 5.53451 11.4192L5.54368 11.4285ZM10.892 18.7427C10.8152 18.8191 10.7233 18.8714 10.6258 18.8998C10.4132 18.9618 10.1739 18.9094 10.0061 18.7427C9.83837 18.576 9.78565 18.3383 9.84799 18.1269C9.87655 18.0301 9.92926 17.9388 10.0061 17.8625L10.9633 16.9114C11.2079 16.6683 11.6046 16.6683 11.8492 16.9114C12.0938 17.1545 12.0938 17.5486 11.8492 17.7917L10.892 18.7427ZM8.87057 16.7345C8.7939 16.8106 8.7023 16.8629 8.60513 16.8914C8.39225 16.9537 8.15263 16.9013 7.98467 16.7345C7.8167 16.5676 7.76406 16.3295 7.82675 16.118C7.85432 16.0249 7.9042 15.937 7.97639 15.8626L7.98492 15.8542L8.94208 14.9031L8.95032 14.8949C9.19556 14.6602 9.5859 14.6629 9.82772 14.9032C10.0724 15.1463 10.0724 15.5404 9.82772 15.7834L8.87057 16.7345Z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Data",
    desc: "It is critically important for each of these groups to understand their audience in order to make the best possible decisions - and we have the means to do that! The web3 world is literally made of data, but it's difficult to understand and access without building your own solution to acquire and interpret it.",
    icon: (
      <svg
        style={{ width: "2.75rem", height: "2.75rem", transform: "scale(1.1)" }}
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        // fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 8.88916C13.6569 8.88916 15 10.2323 15 11.8892C15 13.1954 14.1652 14.3066 13 14.7185V19.8892H11V14.7185C9.83481 14.3066 9 13.1954 9 11.8892C9 10.2323 10.3431 8.88916 12 8.88916ZM12 10.8892C12.5523 10.8892 13 11.3369 13 11.8892C13 12.4414 12.5523 12.8892 12 12.8892C11.4477 12.8892 11 12.4414 11 11.8892C11 11.3369 11.4477 10.8892 12 10.8892Z"
          // fill="currentColor"
        />
        <path
          d="M7.05019 6.93938C5.78348 8.20612 5 9.9561 5 11.8891C5 14.0666 5.99426 16.0119 7.55355 17.2957L8.97712 15.8721C7.7757 14.9589 7 13.5146 7 11.8891C7 10.5084 7.55962 9.25841 8.46441 8.35359L7.05019 6.93938Z"
          // fill="currentColor"
        />
        <path
          d="M15.5355 8.35348C16.4403 9.25831 17 10.5083 17 11.8891C17 13.5146 16.2243 14.959 15.0228 15.8722L16.4463 17.2958C18.0057 16.012 19 14.0666 19 11.8891C19 9.95604 18.2165 8.20602 16.9497 6.93927L15.5355 8.35348Z"
          // fill="currentColor"
        />
        <path
          d="M1 11.8891C1 8.85152 2.23119 6.10155 4.22176 4.11095L5.63598 5.52516C4.00733 7.15383 3 9.40381 3 11.8891C3 14.3743 4.00733 16.6243 5.63597 18.2529L4.22175 19.6672C2.23119 17.6766 1 14.9266 1 11.8891Z"
          // fill="currentColor"
        />
        <path
          d="M19.7781 19.6673C21.7688 17.6767 23 14.9266 23 11.8891C23 8.85147 21.7688 6.10145 19.7781 4.11084L18.3639 5.52505C19.9926 7.15374 21 9.40376 21 11.8891C21 14.3744 19.9926 16.6244 18.3639 18.2531L19.7781 19.6673Z"
          // fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Community",
    desc: "DCL-Metrics aims to make that data accessible so it can be used by the community to build a better metaverse.",
    icon: (
      <svg
        style={{ width: "2.75rem", height: "2.75rem", transform: "scale(1.1)" }}
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        version="1.1"
      >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g id="导航图标" transform="translate(-327.000000, -207.000000)">
            <g id="数据" transform="translate(327.000000, 207.000000)">
              <g id="编组" transform="translate(1.000000, 1.000000)">
                <rect
                  fill="#FFFFFF"
                  fillOpacity="0.01"
                  fillRule="nonzero"
                  height="22"
                  id="矩形"
                  width="22"
                  x="0"
                  y="0"
                />
                <polygon
                  id="路径"
                  points="20.1666667 2.29166667 1.83333333 2.29166667 1.83333333 7.79166667 20.1666667 7.79166667"
                  stroke="#000"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <polyline
                  id="路径"
                  points="1.83333333 18.8054625 7.41381667 13.1675958 10.4293292 16.0554625 14.1158417 12.375 16.1694042 14.377"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <line
                  id="路径"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  x1="20.1666667"
                  x2="20.1666667"
                  y1="7.41212083"
                  y2="19.3287875"
                />
                <line
                  id="路径"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  x1="1.83333333"
                  x2="1.83333333"
                  y1="7.41212083"
                  y2="13.8287875"
                />
                <line
                  id="路径"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  x1="5.96548333"
                  x2="20.1667125"
                  y1="19.7083333"
                  y2="19.7083333"
                />
                <line
                  id="路径"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  x1="7.79166667"
                  x2="17.4166667"
                  y1="5.04166667"
                  y2="5.04166667"
                />
                <line
                  id="路径"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  x1="4.58333333"
                  x2="5.04166667"
                  y1="5.04010833"
                  y2="5.04010833"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
  },
]
