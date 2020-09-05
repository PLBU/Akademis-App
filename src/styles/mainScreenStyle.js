import React from 'react';
import {
  StyleSheet,
  Dimensions,
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
    alignSelf: 'center',
    backgroundColor: theme.PRIMARY_ACCENT_COLOR,
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    width: 300,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18
  },
  middleItemCard:{
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    overflow: 'hidden',
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
  smallCard:{
    width: 360,
    height: 90,
    elevation: 5,
    borderRadius: 15,
    alignSelf: 'center',
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 25,
    flexDirection: 'row',
  },
  bigCard: {
    elevation: 5,
    padding: 15,
    borderRadius: 15,
    margin: 15,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  leftSmallText: {fontSize: 16, left: 10, color: 'gray'},
  leftMediumText: {fontSize: 18, left: 10, marginTop: 5},
  leftSmallMediumText: {fontSize: 17, left: 10},
  mediumLargeText: {fontSize: 19},
  sectionText: {
    left: 20,
    fontSize: 22,
    marginTop: 30,
  },
  multipleChoice: {
    flexDirection: 'row',
    alignItems: 'center', 
    left: 15,
    margin: 5,
  },
  horizontalRuler: {
    borderBottomColor: theme.SECONDARY_DARK_COLOR,
    borderBottomWidth: 2,
    margin: 10
  },
  pickerStyle: {
    height: 50,
    width: Dimensions.get('window').width*0.8, 
  },
  pickerContainerStyle: {
    alignSelf: 'center',
    width: Dimensions.get('window').width*0.8, 
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.SECONDARY_DARK_COLOR
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    overflow: 'hidden',
    borderRadius: 25,
  },
  overlay: {
     ...StyleSheet.absoluteFillObject,
     backgroundColor: 'rgba(0,0,0,0.5)'
   }
});