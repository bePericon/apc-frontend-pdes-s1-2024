import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],

  testEnvironment: "jest-environment-jsdom",

  collectCoverageFrom: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.styled.{tsx,ts}",
    "!src/**/*.mock.ts",
    "!src/pages/**",
    "!src/**/*.types.ts",
  ],

  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/e2e-tests/",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
