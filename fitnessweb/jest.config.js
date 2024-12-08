module.exports = {
    // Use Babel to transform files (JSX and modern JavaScript)
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // Handle .js and .jsx files
    },
  
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,
  
    // Enable coverage collection
    collectCoverage: true,
  
    // Output coverage information in the "coverage" directory
    coverageDirectory: "coverage",
  
    // Specify the test environment
    testEnvironment: "jsdom",
  
    // Add any custom transformations to avoid issues with packages like axios
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/", // Transform axios or any other needed packages
    ],
  };
  