import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {
  getPosts,
  getPost,
  getApiLists,
  getApi,
} from "../../markdown/helpers/post"

jest.mock("fs")
jest.mock("gray-matter")

describe("getPosts", () => {
  test("returns an array of post data objects", () => {
    const expectedFiles = ["post1.mdx", "post2.mdx", "post3.mdx"]
    fs.readdirSync.mockReturnValue(expectedFiles)

    const expectedData = { title: "Test Post", date: "2022-01-01" }
    matter.mockReturnValue({
      data: expectedData,
      content: "# Test Post Content",
    })

    const expectedPosts = [
      { slug: "post1", data: expectedData, content: "# Test Post Content" },
      { slug: "post2", data: expectedData, content: "# Test Post Content" },
      { slug: "post3", data: expectedData, content: "# Test Post Content" },
    ]

    const actualPosts = getPosts()

    expect(actualPosts).toEqual(expectedPosts)
    expect(fs.readdirSync).toHaveBeenCalledWith("markdown/posts")
  })
})

describe("getPost", () => {
  test("returns the post data object for a given slug", () => {
    const expectedSlug = "test-post"
    const expectedData = { title: "Test Post", date: "2022-01-01" }
    const expectedContent = "# Test Post Content"
    const fileContents = `---\ntitle: ${expectedData.title}\ndate: ${expectedData.date}\n---\n${expectedContent}`
    fs.readFileSync.mockReturnValue(fileContents)
    matter.mockReturnValue({ data: expectedData, content: expectedContent })

    const actualPost = getPost(expectedSlug)

    expect(actualPost).toEqual({ data: expectedData, content: expectedContent })
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(`./markdown/posts/${expectedSlug}.mdx`),
      "utf8"
    )
    expect(matter).toHaveBeenCalledWith(fileContents)
  })
})

describe("getApiLists", () => {
  test("returns an array of API list data objects", () => {
    const expectedFiles = ["list1.mdx", "list2.mdx", "list3.mdx"]
    fs.readdirSync.mockReturnValue(expectedFiles)

    const expectedData = {
      title: "Test List",
      description: "Test List Description",
    }
    matter.mockReturnValue({
      data: expectedData,
      content: "# Test List Content",
    })

    const expectedApiLists = [
      { data: expectedData, content: "# Test List Content" },
      { data: expectedData, content: "# Test List Content" },
      { data: expectedData, content: "# Test List Content" },
    ]

    const actualApiLists = getApiLists()

    expect(actualApiLists).toEqual(expectedApiLists)
    expect(fs.readdirSync).toHaveBeenCalledWith("markdown/api-list/")
  })
})

describe("getApi", () => {
  test("returns data and content from a specified API markdown file", () => {
    const expectedSlug = "example-api"
    const expectedFileContents = "API file contents"
    const expectedData = { title: "Example API", version: "1.0" }
    const expectedContent = "# Example API Content"

    fs.readFileSync.mockReturnValue(expectedFileContents)

    matter.mockReturnValue({ data: expectedData, content: expectedContent })

    const actualResult = getApi(expectedSlug)

    expect(actualResult).toEqual({
      data: expectedData,
      content: expectedContent,
    })
    expect(fs.readFileSync).toHaveBeenCalledWith(
      `markdown/api-list/${expectedSlug}.mdx`,
      "utf8"
    )
    expect(matter).toHaveBeenCalledWith(expectedFileContents)
  })
})
