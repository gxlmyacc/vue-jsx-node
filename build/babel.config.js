module.exports = function (options) {
  const browsers = require('./browsers.config')(options);
  return {
    // cacheDirectory: true,
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 2, targets: { browsers }, modules: 'commonjs' }],
    ],
    plugins: [
      '@vue/babel-plugin-transform-vue-jsx',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings',
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-proposal-object-rest-spread'
    ],
    ignore: [
    ]
  };
};
