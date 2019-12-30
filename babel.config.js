module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: [
          'Android >= 7',
          'IOS >= 11',
          'Safari >= 11',
          'Chrome >= 49',
          'Firefox >= 31',
          'Samsung >= 5',
        ],
      },
    }],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ["@babel/plugin-transform-runtime", {
      "corejs": false,
      "helpers": false,
      "regenerator": true,
      "useESModules": false
    }],
  ],
};
// To enable async/await with babel, install 'npm i @babel/plugin-transform-runtime --save-dev' and add parameters like above
