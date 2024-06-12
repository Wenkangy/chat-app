module.exports = {
    testEnvironment: 'jsdom',
    transform: {
    '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js'
    },
    };
    