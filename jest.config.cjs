module.exports = {
  preset: "react-native",
  clearMocks: true,
  setupFilesAfterEnv: [
    "./node_modules/@react-native-google-signin/google-signin/jest/build/setup.js",
    "<rootDir>/jest-setup.ts",
  ],
  moduleNameMapper: {
    "\\.(jpg)$": "identity-obj-proxy",
  },
}
