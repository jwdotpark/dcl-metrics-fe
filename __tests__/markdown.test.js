import fs from "fs"
import path from "path"
import { getPosts, getPost, getApiLists } from "../markdown/helpers/post"
import {
  blogMockFiles,
  blogMockPostSlug,
  blogMockPostData,
} from "./utils/mocks"

jest.mock("fs")

describe("getPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return all post data", () => {
    fs.readdirSync.mockReturnValue(blogMockFiles)
    fs.readFileSync.mockImplementation((filePath) => {
      const slug = filePath.split("/").pop().replace(".mdx", "")
      const postData = blogMockPostData.find((post) => post.slug === slug)
      return `---\n${JSON.stringify(postData.data)}\n---\n${postData.content}`
    })

    const result = getPosts()

    expect(result).toEqual(blogMockPostData)
  })

  it("should return an empty array if there are no posts", () => {
    fs.readdirSync.mockReturnValue([])
    const result = getPosts()
    expect(result).toEqual([])
  })
})

describe("getPost", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return the post data for a given slug", () => {
    const mockPostSlug = "post1"
    const mockPostData = {
      data: {
        title: "Post 1",
        date: "2022-01-01",
      },
      content: "This is the content of post 1.",
    }
    const mockFileContents = `---\n${JSON.stringify(mockPostData.data)}\n---\n${
      mockPostData.content
    }`

    fs.readFileSync.mockReturnValue(mockFileContents)

    const result = getPost(mockPostSlug)

    expect(fs.readFileSync).toHaveBeenCalledWith(
      `markdown/posts/${mockPostSlug}.mdx`,
      "utf8"
    )
    expect(result).toEqual(mockPostData)
  })

  it("should throw an error if the post file does not exist", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error("File not found")
    })

    expect(() => {
      getPost(blogMockPostSlug)
    }).toThrow("File not found")
  })
})

describe("getApiLists", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return an array of all the API list data objects", () => {
    const mockFileNames = ["api-list1.mdx", "api-list2.mdx", "api-list3.mdx"]
    const mockFileContents = [
      `---\n${JSON.stringify({
        title: "API List 1",
        description: "This is API List 1.",
      })}\n---\nAPI List 1 contents`,
      `---\n${JSON.stringify({
        title: "API List 2",
        description: "This is API List 2.",
      })}\n---\nAPI List 2 contents`,
      `---\n${JSON.stringify({
        title: "API List 3",
        description: "This is API List 3.",
      })}\n---\nAPI List 3 contents`,
    ]

    fs.readdirSync.mockReturnValue(mockFileNames)
    fs.readFileSync.mockImplementation((filePath) => {
      const fileName = path.basename(filePath, ".mdx")
      const index = mockFileNames.indexOf(`${fileName}.mdx`)
      return mockFileContents[index]
    })
    getApiLists()

    expect(fs.readdirSync).toHaveBeenCalledWith("markdown/api-list/")
    expect(fs.readFileSync).toHaveBeenCalledWith(
      "markdown/api-list/api-list1.mdx",
      "utf8"
    )
    expect(fs.readFileSync).toHaveBeenCalledWith(
      "markdown/api-list/api-list2.mdx",
      "utf8"
    )
    expect(fs.readFileSync).toHaveBeenCalledWith(
      "markdown/api-list/api-list3.mdx",
      "utf8"
    )
  })

  it("should return an empty array if there are no API lists", () => {
    fs.readdirSync.mockReturnValue([])
    const result = getApiLists()

    expect(fs.readdirSync).toHaveBeenCalledWith("markdown/api-list/")
    expect(result).toEqual([])
  })

  it("should throw an error if there is an error reading the API list files", () => {
    fs.readdirSync.mockImplementation(() => {
      throw new Error("Error reading directory")
    })

    expect(() => {
      getApiLists()
    }).toThrow("Error reading directory")
  })
})
