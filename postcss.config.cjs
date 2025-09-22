const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer(),
    // другие плагины, например:
    // require('postcss-nested')(),
  ],
};