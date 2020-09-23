/**
 * @format
 */

import {AppRegistry, Text, ScrollView} from 'react-native';
import App from './src/components/App.js';
import {name as appName} from './app.json';
import {
  setCustomView,
  setCustomScrollView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'Rubik-Regular'
  }
};

console.disableYellowBox = true;

setCustomText(customTextProps);
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);