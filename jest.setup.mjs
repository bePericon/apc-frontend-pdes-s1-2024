import "@testing-library/jest-dom";
import { setConfig } from "next/config";
import config from "./next.config";

// This line sure we can use "publicRuntimeConfig" within tests.
setConfig(config);

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  preload: jest.fn(),
}));

jest.mock("next/router", () => require("next-router-mock"));
