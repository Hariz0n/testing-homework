module.exports = {
  sets: {
    all: {
      files: 'test/hermione'
    },
    desktop: {
      files: "test/hermione",
    },
  },
  system: {
    fileExtensions: ['.ts', '.js'],
  },
  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1280
      }
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
