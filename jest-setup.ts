import "@testing-library/react-native/extend-expect"

// import "react-native-gesture-handler/jestSetup"
import "@react-native-google-signin/google-signin/jest/build/jest/setup"
// import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock"
// import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

// jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo)
// jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)

jest.mock("expo-router", () => {
  const mockLink = jest.fn()
  const mockScreen = jest.fn()

  return {
    Link: (props: Record<string, unknown>) => {
      mockLink(props)
      return props.children
    },
    Stack: {
      Screen: (props: Record<string, unknown>) => {
        mockScreen(props)
        return props.children
      },
    },
    mockLink,
    mockScreen,
  }
})

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
