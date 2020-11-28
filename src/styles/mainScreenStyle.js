import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

//Importing theme
import theme from '../styles/theme.js'

export default StyleSheet.create({
  textInput: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
  },
  textInputModal: {
    width: 250,
    height: 50,
    backgroundColor: 'white',
  },
  headerText:{
    color: 'white',
    fontSize: 24,
  },
  bgAll: {
    backgroundColor: 'white'
  },
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
  mediumWhiteText: {
    fontSize: 19,
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
    width: Dimensions.get('window').width*0.75,
    marginBottom: 20,
    opacity: 1
  },
  buttonText: {
    fontSize: RFValue(17)
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
    width: Dimensions.get('window').width*0.9,
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
    width: Dimensions.get('window').width*0.9,
    height: 150,
    elevation: 5,
    borderRadius: 25,
    alignSelf: 'center',
    flex: 1, 
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 35
  },
  smallCard:{
    width: Dimensions.get('window').width*0.9,
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
  squareCard:{
    width: Dimensions.get('window').width*0.36,
    height: Dimensions.get('window').width*0.45,
    elevation: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: RFValue(15)
  },
  bigCard: {
    elevation: 5,
    padding: 20,
    borderRadius: 15,
    margin: 15,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  leftSmallText: {fontSize: 16, left: 10, color: 'gray'},
  leftSmallText8: {fontSize: 16, left: 10, color: 'red'},
  leftSmallText11: {fontSize: 16, left: 10, color: '#bf9600'},
  leftSmallText15: {fontSize: 16, left: 10, color: '#b0cf00'},
  leftMediumText: {fontSize: 18, left: 10, marginTop: 5},
  leftSmallMediumText: {fontSize: 17, left: 10},
  mediumText: {fontSize: RFValue(17)},
  mediumLargeText: {fontSize: 19},
  sectionText: {
    left: 20,
    fontSize: 22,
    marginTop: 30,
  },
  multipleChoice: {
    flexDirection: 'row',
    alignItems: 'center', 
    left: 12,
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
   },
  disabledButton: {
    alignItems: "center",
    alignSelf: 'center',
    opacity: 0.3,
    backgroundColor: theme.PRIMARY_ACCENT_COLOR,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    width: Dimensions.get('window').width*0.75,
  },
});