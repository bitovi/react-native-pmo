import "@testing-library/react-native/extend-expect"

// import "react-native-gesture-handler/jestSetup"
// import "@react-native-google-signin/google-signin/jest/build/setup"
// import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock"
// import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"

// jest.mock("@react-native-async-storage/async-storage", () =>
//   require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
// )

// jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo)
// jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

// jest.mock("react-native", () => {
//   const rn = jest.requireActual("react-native")
//   const spy = jest.spyOn(rn.Animated, "createAnimatedComponent")
//   spy.mockImplementation(() => jest.fn((Component) => Component))
//   return rn
// })

const consoleError = console.error
console.error = (message, ...args) => {
  if (
    typeof message === "string" &&
    message.match(
      /Warning: An update to .+ inside a test was not wrapped in act\(\.\.\.\)\./,
    )
  ) {
    return
  }

  return consoleError(message, ...args)
}
