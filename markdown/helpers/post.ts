import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "markdown", "posts")
const apiListDirectory = path.join(process.cwd(), "markdown", "api-list")

export const getPosts = () => {
  const files = fs.readdirSync(postsDirectory)
  const allPostsData = files.map((fileName) => {
    const slug = fileName.replace(".mdx", "")
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      slug,
      data,
      content,
    }
  })

  return allPostsData
}

export const getPost = (slug) => {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  return {
    data,
    content,
  }
}

export const getApiLists = () => {
  const files = fs.readdirSync(apiListDirectory)
  const allApiData = files.map((fileName) => {
    const slug = fileName.replace(".mdx", "")
    const filePath = path.join(apiListDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      slug,
      data,
      content,
    }
  })

  return allApiData
}

export const getApi = (slug) => {
  const filePath = path.join(apiListDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  return {
    data,
    content,
  }
}
