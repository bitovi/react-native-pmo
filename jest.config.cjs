module.exports = {
  preset: "jest-expo",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy",
  },
}
