module.exports = {
    preset: 'jest-preset-angular',
    roots: ['src'],
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
      '@env/(.*)': '<rootDir>/src/environments/$1'
    },
    setupFilesAfterEnv: ['./testSetup.js'],
  };