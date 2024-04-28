module.exports = function(api) {
  plugins: [
    ['react-native-worklets-core/plugin'],
  ],
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
