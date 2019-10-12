module.exports = {
    verbose: true,
    coverageDirectory: '<rootDir>/coverage/',
    coveragePathIgnorePatterns: [
        '<rootDir>/test'
    ],
    moduleNameMapper: {
      'src/(.*)': '<rootDir>/../src/$1'
    },
    transform: {
      "^.+\\.js$": "<rootDir>/jest-transformer.js"
    },
    transformIgnorePatterns: ['node_modules'],
    testMatch: ['<rootDir>/spec/**/@(*.)@(spec.js)'],
    testURL: "http://localhost/",
    coverageReporters: ["json", "html"]
};
