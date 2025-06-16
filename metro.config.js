// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Ensure the resolver extensions include .js, .jsx, .ts, .tsx
defaultConfig.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json'];

// Ensure the resolver assetExts include common asset extensions
defaultConfig.resolver.assetExts = [
  'bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'svg', 'webp',
  'ttf', 'otf', 'woff', 'woff2',
  'mp3', 'mp4', 'wav', 'webm',
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'
];

module.exports = defaultConfig;
