/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const blacklist = require('metro-config/src/defaults/blacklist');

const resolve = require('path').resolve;
const fs = require('fs');

// Update the following line if the root folder of your app is somewhere else.
const ROOT_FOLDER = resolve(__dirname, '.');

const config = {
  transformer: {
    getTransformOptions: (_, {platform}) => {
      let modulePaths = [];
      const moduleMap = {};

      if (platform === 'android') {
        modulePaths = require('./packager/modules.android');
      } else if (platform === 'ios') {
        modulePaths = require('./packager/modules.ios');
      } else if (platform === 'macos') {
        modulePaths = require('./packager/modules.macos');
      } else {
        modulePaths = require('./packager/modules.windows');
      }

      modulePaths.forEach((path) => {
        if (fs.existsSync(path)) {
          moduleMap[resolve(path)] = true;
        }
      });

      return {
        preloadedModules: moduleMap,
        transform: {inlineRequires: {blacklist: moduleMap}},
      };
    },
  },
  resolver: {
    blacklistRE: blacklist([
      // This stops "react-native run-windows" from causing the metro server to crash if its already running
      new RegExp(`${resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`),
      // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip
      new RegExp(
        `${resolve(__dirname, 'msbuild.ProjectImports.zip').replace(
          /[/\\]/g,
          '/',
        )}.*`,
      ),
    ]),
  },
  projectRoot: ROOT_FOLDER,
};

module.exports = config;
