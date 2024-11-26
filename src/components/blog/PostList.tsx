import {
  useColorModeValue,
  Box,
  Image,
  Flex,
  Spacer,
  Text,
  SimpleGrid,
  Center,
} from "@chakra-ui/react"
import Link from "next/link"

const PostList = ({ posts }) => {
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.300", "gray.600")
  const hoverShadow = useColorModeValue(
    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
  )
  return (
    <Box w={["100%", "100%", "100%", 1080]}>
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {posts.map((post) => (
          <Box
            key={post.slug}
            display={post.data.published === false && "none"}
            w="100%"
            h="100%"
            mb="4"
            bg={bg}
            border="1px"
            borderColor={borderColor}
            borderRadius="xl"
            shadow="md"
            _hover={{
              shadow: hoverShadow,
              transition: "outline 0.1s ease-in-out",
            }}
            transition="box-shadow 0.5s ease-in-out"
          >
            <Link href={`/blog/` + post.slug}>
              <Box>
                <Flex direction="column" m="4">
                  <Flex direction={["column", "row"]}>
                    <Box w={["100%", "100%"]} pr="4">
                      <Text
                        align="center"
                        mb="2"
                        ml="4"
                        fontSize="lg"
                        fontWeight="bold"
                      >
                        {post.data.title}
                      </Text>
                    </Box>
                    <Spacer />
                  </Flex>
                  <Center w="100%" h="100%">
                    {post.data.previewImage.length > 0 && (
                      <Image
                        pos="relative"
                        overflow="clip"
                        h="150px"
                        mx="4"
                        borderRadius="xl"
                        objectFit="cover"
                        alt={`${post.data.title} preview picture`}
                        src={post.data.previewImage}
                      />
                    )}
                  </Center>
                  <Spacer />
                </Flex>
                <Box mx="8">
                  <Text align="center" fontSize="xs">
                    {post.data.description}
                  </Text>
                </Box>
              </Box>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default PostList
