import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import styles from '../styles/mainScreenStyle.js';

export default () => {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.sectionTitle}>Activity Screen</Text>
    </View>
  )
};