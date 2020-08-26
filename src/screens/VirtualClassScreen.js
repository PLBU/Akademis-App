import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
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
    teacher: "Robbinson",
    rating: 5,
    paid: false,
    price: '15',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum ligula nec eros finibus.'
  },
  {
    subject: "Geografi",
    teacher: "Michale",
    rating: 3,
    paid: true,
    price: '25',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum ligula nec eros finibus.'
  },
  {
    subject: "Bahasa Jepang",
    teacher: "Harumi",
    rating: 5,
    paid: true,
    price: '5',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum ligula nec eros finibus.'
  },
  {
    subject: "Matematika",
    teacher: "Jacson",
    rating: 4,
    paid: false,
    price: '175',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum ligula nec eros finibus.'
  },
  {
    subject: "Ilmu Pengetahuan Alam",
    teacher: "Oliver",
    rating: 3.5,
    paid: false,
    price: '225',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum ligula nec eros finibus.'
  },
]

export default [
  //Catalogue
  ({navigation}) => {
    const [subject, setSubject] = React.useState("")

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={{top: 10, left: 20, fontSize: 22, marginBottom: 15}}>Pilih Kategori</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10, marginBottom: 10}]}>
          <Picker
            selectedValue={subject}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) => setSubject(itemValue)}>
            <Picker.Item label={"All"} value={"All"}/>
            <Picker.Item label={"Matematika"} value={"Matematika"}/>
          </Picker>
        </View>
        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Virtual Class</Text>
        {items.map( (value, index) => {
          if (!value.paid) return (
            <TouchableOpacity onPress={() => navigation.navigate('Details', {...value})} key={index}>
              <View style={styles.mediumCardWithDesc}>
                <View style={{height: 50, flexDirection: 'row', backgroundColor: theme.PRIMARY_DARK_COLOR}}>
                  <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', left: 15}}>{value.subject}</Text>
                  <View style={{flexDirection: 'row', alignItems:'center', alignSelf: 'center', position: 'absolute', right: 15}}>
                    <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
                    <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.price}</Text>
                  </View>
                </View>
                <Text style={styles.leftSmallText}>Nama Guru : {value.teacher}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.leftSmallText}>
                    Rating : {"   "}
                  </Text>
                  <Stars
                    default={value.rating}
                    count={5}
                    half={true}
                    disabled={true}
                    fullStar={<MaterialIcon name={'star'} size={18} color={theme.PRIMARY_ACCENT_COLOR}/>}
                    emptyStar={<MaterialIcon name={'star-border'} size={18} color={theme.PRIMARY_ACCENT_COLOR}/>}
                    halfStar={<MaterialIcon name={'star-half'} size={18} color={theme.PRIMARY_ACCENT_COLOR}/>}
                  />
                </View>
                <Text style={styles.leftSmallText}>Deskripsi : {value.desc}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  },
  //My Class
  ({navigation}) => {
    const [subject, setSubject] = React.useState("")

    return (
       <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={{top: 10, left: 20, fontSize: 22, marginBottom: 15}}>Pilih Kategori</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10, marginBottom: 10}]}>
          <Picker
            selectedValue={subject}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) => setSubject(itemValue)}>
            <Picker.Item label={"All"} value={"All"}/>
            <Picker.Item label={"Matematika"} value={"Matematika"}/>
          </Picker>
        </View>
        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Virtual Class</Text>
        {items.map( (value, index) => {
          if (value.paid) return (
            <TouchableOpacity onPress={() => navigation.navigate('Details', {...value})} key={index}>
              <View style={styles.mediumCardWithDesc}>
                <View style={{height: 50, flexDirection: 'row', backgroundColor: theme.PRIMARY_DARK_COLOR}}>
                  <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', left: 15}}>{value.subject}</Text>
                  <View style={{flexDirection: 'row', alignItems:'center', alignSelf: 'center', position: 'absolute', right: 15}}>
                    <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
                    <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.price}</Text>
                  </View>
                </View>
                <Text style={styles.leftSmallText}>Nama Guru : {value.teacher}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.leftSmallText}>
                    Rating : {"   "}
                  </Text>
                  <Stars
                    default={value.rating}
                    count={5}
                    half={true}
                    disabled={true}
                    fullStar={<MaterialIcon name={'star'} size={18} color={theme.PRIMARY_ACCENT_COLOR}/>}
                    emptyStar={<MaterialIcon name={'star-border'} size={18} color={theme.PRIMARY_ACCENT_COLOR}/>}
                    halfStar={<MaterialIcon name={'star-half'} size={18} color={theme.PRIMARY_ACCENT_COLOR}/>}
                  />
                </View>
                <Text style={styles.leftSmallText}>Deskripsi : {value.desc}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  },
  //Details
  ({route, navigation}) => {
    const { subject, teacher, rating, price, paid, desc } = route.params
    const [myRating, setMyRating] = React.useState(0)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{
          width: Dimensions.get('window').width*0.7, 
          height: Dimensions.get('window').width*0.7*0.75,
          backgroundColor: theme.SECONDARY_DARK_COLOR,
          alignSelf: 'center',
          margin: 20,
          borderRadius: 25,
          }}
        >
          {/* Ini isinya image */}
        </View>

        <Text style={{left: 20, fontSize: 22, marginTop: 10}}>Informasi Kelas</Text>
        <View style={styles.horizontalRuler}/>

        <Text style={styles.leftMediumText}>Nama Guru : {"\n"}
          <Text style={styles.leftSmallText}>{teacher}</Text>
        </Text>
        <Text style={styles.leftMediumText}>Subjek : {"\n"}
          <Text style={styles.leftSmallText}>{subject}</Text>
        </Text>
        <Text style={styles.leftMediumText}>Deskripsi : {"\n"}
          <Text style={styles.leftSmallText}>{desc}</Text>
        </Text>
        { (paid) ?
            <View>
              <Text style={{left: 20, fontSize: 22, marginTop: 30}}>Berikan penilaian mu!</Text>
              <View style={styles.horizontalRuler}/>

              <Text style={styles.leftSmallText}>Rating mu: {myRating}</Text>
              <Stars
                default={0}
                count={5}
                half={true}
                starSize={50}
                update={ (value) => setMyRating(value) }
                fullStar={<MaterialIcon name={'star'} size={50} color={theme.PRIMARY_ACCENT_COLOR}/>}
                emptyStar={<MaterialIcon name={'star-border'} size={50} color={theme.PRIMARY_ACCENT_COLOR}/>}
                halfStar={<MaterialIcon name={'star-half'} size={50} color={theme.PRIMARY_ACCENT_COLOR}/>}
              />
              <View style={{margin: 20, alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}>Unggah Penilaian</Text>
                </TouchableOpacity>
              </View>
            </View>
          :
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.leftMediumText}>
                  Rating : {"   "}
                </Text>
                <Stars
                  default={rating}
                  count={5}
                  half={true}
                  disabled={true}
                  fullStar={<MaterialIcon name={'star'} size={24} color={theme.PRIMARY_ACCENT_COLOR}/>}
                  emptyStar={<MaterialIcon name={'star-border'} size={24} color={theme.PRIMARY_ACCENT_COLOR}/>}
                  halfStar={<MaterialIcon name={'star-half'} size={24} color={theme.PRIMARY_ACCENT_COLOR}/>}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Text style={styles.leftMediumText}>Harga : {price}{"   "}</Text>
                <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
              </View>
              <Text style={styles.leftMediumText}>Tanggal Pembelian : {"\n"}
                <Text style={styles.leftSmallText}>{today}</Text>
              </Text>

              <Text style={{left: 20, fontSize: 22, marginTop: 30}}>Metode Pembayaran</Text>
              <View style={styles.horizontalRuler}/>

              <View style={{margin: 20, alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={ () => navigation.goBack()}>
                  <Text style={styles.buttonText}>Beli dengan diamond</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ () => navigation.goBack()}>
                  <Text style={styles.buttonText}>Beli via share ke media sosial</Text>
                </TouchableOpacity>
              </View>
            </View>
        }
      </ScrollView>
    )
  }
]