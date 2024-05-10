module.exports = {
  preset: "react-native",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleNameMapper: {
    "\\.(jpg)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*)",
  ],
}
