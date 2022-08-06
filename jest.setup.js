import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);

module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
};
