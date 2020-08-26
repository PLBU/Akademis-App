import React from 'react';
import {
  StyleSheet,
} from 'react-native';

//Importing theme
import theme from '../styles/theme.js'

export default StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 30,
    color: 'white',
    position: 'absolute', 
    left: 15, 
    top: 15,
  },
  bigWhiteText: {
    fontSize: 22,
    color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.PRIMARY_ACCENT_COLOR,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    width: 300,
    marginBottom: 20
  },
  largeCardWithDesc: {
    width: 360,
    height: 300,
    elevation: 5,
    borderRadius: 25,
    alignSelf: 'center',
    flex: 1, 
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 50
  },
  mediumCardWithDesc: {
    width: 360,
    height: 180,
    elevation: 5,
    borderRadius: 25,
    alignSelf: 'center',
    flex: 1, 
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 35
  },
  leftSmallText: {fontSize: 16, left: 10, color: 'gray'},
  leftMediumText: {fontSize: 18, left: 10, marginTop: 5},
  sectionText: {
    left: 20,
    fontSize: 22,
    marginTop: 30,
  },
  horizontalRuler: {
    borderBottomColor: theme.SECONDARY_DARK_COLOR,
    borderBottomWidth: 2,
    margin: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    overflow: 'hidden',
    borderRadius: 25,
  },
});