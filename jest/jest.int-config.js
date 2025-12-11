import defaultConfig from './jest.config.js';

const config = {
  ...defaultConfig,
  testRegex: '.*\\.int.test\\.js$',
  coverageDirectory: '../coverage/int',
  setupFiles: [...(defaultConfig.setupFiles || [])],
  setupFilesAfterEnv: ['<rootDir>/jest/setup-integration-tests.js'],
  globalSetup: '<rootDir>/jest/global-setup.js',
  globalTeardown: '<rootDir>/jest/global-teardown.js',
};

export default config;