module.exports = {
  preset: "react-native",
  moduleNameMapper: {
    "\\.(jpg)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "./node_modules/@react-native-google-signin/google-signin/jest/build/setup.js",
    "<rootDir>/jest-setup.ts",
  ],
  clearMocks: true,
}
