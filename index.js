/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/components/App.js';
import {name as appName} from './app.json';
import {
  setCustomView,
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
AppRegistry.registerComponent(appName, () => App);
