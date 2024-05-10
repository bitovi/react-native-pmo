import { render, screen } from "@testing-library/react-native"
import DataMigration from "./DataMigration"
import Typography from "../../design/Typography"
import * as storage from "../storage/storage"

const mockStorageGetData: jest.SpyInstance<ReturnType<typeof storage.getData>> =
  jest.spyOn(storage, "getData")
const mockStorageGetKeys: jest.SpyInstance<
  ReturnType<typeof storage.getAllKeys>
> = jest.spyOn(storage, "getAllKeys")
const mockStorageStoreData: jest.SpyInstance<
  ReturnType<typeof storage.storeData>
> = jest.spyOn(storage, "storeData")
const mockStorageClear: jest.SpyInstance<
  ReturnType<typeof storage.clearStorage>
> = jest.spyOn(storage, "clearStorage")

mockStorageGetData.mockResolvedValue(undefined)
mockStorageGetKeys.mockResolvedValue([
  "apiRequest-numberone",
  "otherkey-numbertwo",
  "apiRequest-numberthree",
])

describe("DataMigration component", () => {
  it("renders", async () => {
    mockStorageGetData.mockResolvedValueOnce(2)

    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )

    expect(screen.getByText(/Loading…/)).toBeOnTheScreen()
  })

  it("renders children after loading", async () => {
    mockStorageGetData.mockResolvedValueOnce(2)

    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )

    expect(await screen.findByText(/Hello!/)).toBeOnTheScreen()
  })

  it("updates localStorage if storage version is less than 2", async () => {
    mockStorageGetData
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce({
        data: { text: "Not Important" },
        dateTime: new Date(),
      })
      .mockResolvedValueOnce({
        data: { text: "Still Not Important" },
        dateTime: new Date(),
      })

    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )

    expect(await screen.findByText(/Hello!/)).toBeOnTheScreen()

    expect(mockStorageGetKeys).toHaveReturnedTimes(1)
    expect(mockStorageGetData).toHaveReturnedTimes(3)
    expect(mockStorageStoreData).toHaveReturnedTimes(3)
    expect(mockStorageClear).toHaveReturnedTimes(0)
  })

  it("ignores local storage if version is 2 or more", async () => {
    mockStorageGetData.mockResolvedValueOnce(5)

    render(
      <DataMigration>
        <Typography>Hello!</Typography>
      </DataMigration>,
    )

    expect(await screen.findByText(/Hello!/)).toBeOnTheScreen()

    expect(mockStorageGetKeys).toHaveReturnedTimes(0)
    expect(mockStorageGetData).toHaveReturnedTimes(1)
    expect(mockStorageStoreData).toHaveReturnedTimes(0)
    expect(mockStorageClear).toHaveReturnedTimes(0)
  })
})
