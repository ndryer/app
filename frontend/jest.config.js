module.exports = {
    displayName: "frontend",
    rootDir: ".",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
    ],
    moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/index.tsx",
        "!src/setupTests.ts"
    ],
    coverageReporters: ["text", "lcov", "html"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", {
            presets: [
                ["@babel/preset-env", { targets: { node: "current" } }],
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript"
            ]
        }]
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
    transformIgnorePatterns: [
        "node_modules/(?!(framer-motion|react-scroll-parallax)/)"
    ],

    // Explicitly ignore playwright tests and related directories
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/tests/",
        "<rootDir>/test-results/",
        "<rootDir>/playwright-report/",
        ".*\\.spec\\.ts$",
        ".*\\.e2e\\.ts$",
        ".*playwright.*"
    ],

    // Ignore these patterns when collecting coverage
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
        "/test-results/",
        "/playwright-report/"
    ]
};
