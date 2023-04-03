import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getPosts } from "../markdown/helpers/post"

const mockFiles = ["post1.mdx", "post2.mdx", "post3.mdx"]

const mockPostData = [
  {
    slug: "post1",
    data: { title: "Post 1", date: "2022-01-01" },
    content: "This is the content of post 1.",
  },
  {
    slug: "post2",
    data: { title: "Post 2", date: "2022-01-02" },
    content: "This is the content of post 2.",
  },
  {
    slug: "post3",
    data: { title: "Post 3", date: "2022-01-03" },
    content: "This is the content of post 3.",
  },
]

jest.mock("fs")

describe("getPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return all post data", () => {
    fs.readdirSync.mockReturnValue(mockFiles)
    fs.readFileSync.mockImplementation((filePath) => {
      const slug = filePath.split("/").pop().replace(".mdx", "")
      const postData = mockPostData.find((post) => post.slug === slug)
      return `---\n${JSON.stringify(postData.data)}\n---\n${postData.content}`
    })

    const result = getPosts()

    expect(result).toEqual(mockPostData)
  })

  it("should return an empty array if there are no posts", () => {
    fs.readdirSync.mockReturnValue([])
    const result = getPosts()
    expect(result).toEqual([])
  })
})
