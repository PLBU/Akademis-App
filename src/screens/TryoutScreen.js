import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Stars from 'react-native-stars';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

//Styles
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

const items = [
  {
    subject: "Matematika",
    name: "TPS Matematika Grade A",
    paid: false,
    price: '115'
  },
  {
    subject: "Matematika",
    name: "TPS Matematika Grade B",
    paid: false,
    price: '125'
  },
  {
    subject: "Ilmu Pengetahuan Alam",
    name: "TPS IPA Grade C",
    paid: false,
    price: '15'
  },
  {
    subject: "Geografi",
    name: "TPS SosHum Grade A",
    paid: false,
    price: '1150'
  },
]

export default [
  //Catalogue
  ({navigation}) => {
    const [subjectPicker, setSubject] = React.useState("")
    const availableTryouts = items.filter( ({paid}) => (paid === false))

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={{top: 10, left: 20, fontSize: 22, marginBottom: 15}}>Pilih Kategori</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10, marginBottom: 10}]}>
          <Picker
            selectedValue={subjectPicker}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) => setSubject(itemValue)}>
            <Picker.Item label={"All"} value={""}/>
            <Picker.Item label={"Matematika"} value={"Matematika"}/>
            <Picker.Item label={"Geografi"} value={"Geografi"}/>
            <Picker.Item label={"Ilmu Pengetahuan Alam"} value={"Ilmu Pengetahuan Alam"}/>
            <Picker.Item label={"Bahasa Jepang"} value={"Bahasa Jepang"}/>
          </Picker>
        </View>
        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Virtual Class</Text>
        {availableTryouts.filter( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker))
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details', {...value})} key={index}>
                <View style={styles.smallCard}>
                  <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
                    <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.price}</Text>
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <Text style={styles.leftMediumText}>{value.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (availableTryouts.find( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Text style={{fontSize: 20}}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      }
      </ScrollView>
    )
  },
  //My Class
  ({navigation}) => null,
  //Details
  ({route, navigation}) => null
]