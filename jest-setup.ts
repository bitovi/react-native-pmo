import "@testing-library/react-native/extend-expect"
import "react-native-gesture-handler/jestSetup"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)
