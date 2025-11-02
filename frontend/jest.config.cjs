module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@testing-library)"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};
