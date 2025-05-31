module.exports = {
    // Only run Jest in the frontend workspace
    projects: ["<rootDir>/frontend"],
    
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
    
    // Don't collect tests from these directories
    collectCoverageFrom: [
        "frontend/src/**/*.{js,jsx,ts,tsx}",
        "!frontend/src/**/*.d.ts"
    ],
    
    // Ignore these patterns when collecting coverage
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
        "/test-results/",
        "/playwright-report/"
    ],
    
    // Root directory for Jest
    rootDir: ".",
    
    // Only look for tests in frontend
    testMatch: []
}; 