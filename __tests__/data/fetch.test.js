import staticGlobalDaily from "../../public/data/staticGlobalDaily.json"
import staticParcel from "../../public/data/cached_parcel.json"
import staticLandSales from "../../public/data/staticLandSales.json"
import staticTopLand from "../../public/data/staticTopLand.json"
import staticTopPick from "../../public/data/staticTopPick.json"
import { fetchGlobalData } from "../../src/lib/data/fetch"

jest.mock("../../src/lib/data/fetch")

describe("fetchGlobalData", () => {
  it("returns an object with the expected properties", async () => {
    const globalDailyRes = staticGlobalDaily
    const parcelRes = staticParcel
    const landSalesRes = staticLandSales
    const topLandRes = staticTopLand
    const topPickRes = staticTopPick

    const getDataWithProxyMock = jest.fn()
    getDataWithProxyMock
      .mockResolvedValueOnce(globalDailyRes)
      .mockResolvedValueOnce(parcelRes)
      .mockResolvedValueOnce(landSalesRes)
      .mockResolvedValueOnce(topLandRes)
      .mockResolvedValueOnce(topPickRes)

    fetchGlobalData.mockImplementation(async () => {
      const globalDaily = await getDataWithProxyMock(staticGlobalDaily)
      const parcel = await getDataWithProxyMock(staticParcel)
      const landSales = await getDataWithProxyMock(staticLandSales)
      const topLand = await getDataWithProxyMock(staticTopLand)
      const topPick = await getDataWithProxyMock(staticTopPick)

      return {
        globalDaily,
        parcel,
        landSales,
        topLand,
        topPick,
      }
    })

    const result = await fetchGlobalData()

    expect(result).toEqual({
      globalDaily: globalDailyRes,
      parcel: parcelRes,
      landSales: landSalesRes,
      topLand: topLandRes,
      topPick: topPickRes,
    })

    expect(getDataWithProxyMock).toHaveBeenCalledWith(staticGlobalDaily)
    expect(getDataWithProxyMock).toHaveBeenCalledWith(staticParcel)
    expect(getDataWithProxyMock).toHaveBeenCalledWith(staticLandSales)
    expect(getDataWithProxyMock).toHaveBeenCalledWith(staticTopLand)
    expect(getDataWithProxyMock).toHaveBeenCalledWith(staticTopPick)
  })
})
