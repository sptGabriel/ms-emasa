module.exports = {
  presets: [
    ['@babel/plugin-syntax-top-level-await'],
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@entities': './src/models',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
