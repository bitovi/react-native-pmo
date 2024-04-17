module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "\\.(jpg)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "./node_modules/@react-native-google-signin/google-signin/jest/build/setup.js",
    "<rootDir>/jest-setup.ts",
  ],
  transform: {},
}
