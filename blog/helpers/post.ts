import fs from "fs"
import path from "path"
import matter from "gray-matter"

export const getPosts = () => {
  const files = fs.readdirSync(path.join("./blog/posts"))
  const allPostsData = files.map((fileName) => {
    const slug = fileName.replace(".mdx", "")
    const fileContents = fs.readFileSync(
      path.join(`./blog/posts/${slug}.mdx`),
      "utf8"
    )
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
  const fileContents = fs.readFileSync(
    path.join(`./blog/posts/${slug}.mdx`),
    "utf8"
  )
  const { data, content } = matter(fileContents)
  return {
    data,
    content,
  }
}
