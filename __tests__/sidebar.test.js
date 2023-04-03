import { render, screen } from "@testing-library/react"
import SidebarWithHeader from "../src/components/global/SidebarWithHeader"
import "@testing-library/jest-dom"
import { act } from "react-dom/test-utils"

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    }
  },
}))

describe("Sidebar", () => {
  it("renders title", () => {
    render(<SidebarWithHeader />)
    const title = screen.getByTestId("title")
    expect(title).toBeInTheDocument()
  })

  it("renders buttons", () => {
    render(<SidebarWithHeader />)

    const global = screen.getByText(/global/i)
    const roadmap = screen.getByText(/roadmap/i)
    const about = screen.getByText(/about/i)
    const collapse = screen.getByText(/collapse/i)

    expect(global).toBeInTheDocument()
    expect(roadmap).toBeInTheDocument()
    expect(about).toBeInTheDocument()
    expect(collapse).toBeInTheDocument()
  })

  it("collapses when collapse button is clicked", async () => {
    render(<SidebarWithHeader />)
    const title = screen.getByTestId("sidebar-title")
    const collapseBtn = screen.getByText(/collapse/i)

    await act(async () => {
      collapseBtn.click()
    })

    expect(title.classList.contains("collapsed")).toBe(false)
  })
})
