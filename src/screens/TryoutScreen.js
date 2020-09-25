import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Stars from 'react-native-stars';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'react-native-axios';
import Accordion from 'react-native-collapsible/Accordion';
import { Overlay } from 'react-native-elements';

//Styles
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

//Importing images
import diamond from '../assets/icons/diamond-currency.png'
import notFoundImage from '../assets/images/image-not-found-bg-terang.png'
import saintekSingleImage from '../assets/images/saintek-single.png'
import soshumSingleImage from '../assets/images/soshum-single.png'
import purchaseToImage from '../assets/images/purchase-to-bg-gelap.png'
import buySuccessImage from '../assets/images/pembelian-sukses-bg-terang.png'

const items = [
  {
    subject: "Matematika",
    name: "TPS Matematika Grade A",
    paid: false,
    price: '115',
    finished: false,
    time: '120 menit',
  },
  {
    subject: "Matematika",
    name: "TPS Matematika Grade B",
    paid: true,
    price: '125',
    finished: false,
    time: '120 menit',
  },
  {
    subject: "Ilmu Pengetahuan Alam",
    name: "TPS IPA Grade C",
    paid: false,
    price: '15',
    finished: false,
    time: '120 menit',
  },
  {
    subject: "Geografi",
    name: "TPS SosHum Grade A",
    paid: true,
    price: '1150',
    finished: true,

time: '120 menit',  },
]

export default [
  //Catalogue
  ({navigation}) => {
    const [subjectPicker, setSubject] = React.useState("")
    const [availTryouts, setAvailTryouts] = React.useState([])
    const availableTryouts = items.filter( ({paid}) => (paid === false))

    const getTryouts = () => {
      axios.get('https://dev.akademis.id/api/tryout/')
        .then(res => {
          var arr = res.data.data.data
          setAvailTryouts(arr)

          console.log("TRYOUT RESPONSE: ")
          console.log(arr)
        })
        .catch(e => console.log(e) )
    }

    React.useEffect( () => {
      getTryouts()
    }, [])

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.bgAll}>
        <Text style={{top: 10, left: 20, fontSize: 22, marginBottom: 15}}>Pilih Kategori</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10, marginBottom: 10}]}>
          <Picker
            selectedValue={subjectPicker}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) => setSubject(itemValue)}>
            <Picker.Item label={"All"} value={""}/>
            <Picker.Item label={"TPS"} value={"tps"}/>
            <Picker.Item label={"SAINTEK"} value={"saintek"}/>
            <Picker.Item label={"SOSHUM"} value={"soshum"}/>
          </Picker>
        </View>
        {/* Tryout Events */}
        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Tryout</Text>
        {availTryouts.filter( ({ name }) => (subjectPicker === "") ? true : (name.toLowerCase().includes(subjectPicker) ) )
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details Tryout', {...value})} key={index}>
                <View style={styles.smallCard}>
                  <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    <Image source={diamond} style={{width: 22, height: 22}}/>
                    <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.price}</Text>
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <Text style={styles.leftSmallMediumText}>{value.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (availTryouts.find( ({ name }) => (subjectPicker === "") ? true : (name.toLowerCase().includes(subjectPicker) ) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20}}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      }
      {/* Tryout Package */}
      {/* <View style={styles.horizontalRuler}/>
      <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Tryout Package</Text>
      {availableTryouts.filter( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker))
        .map( (value, index) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Details Tryout', {...value})} key={index}>
              <View style={styles.smallCard}>
                <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                  <Image source={diamond} style={{width: 22, height: 22}}/>
                  <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.price}</Text>
                </View>
                <View style={{flex: 0.75, justifyContent: 'center'}}>
                  <Text style={styles.leftSmallMediumText}>{value.name}</Text>
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
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20}}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      } */}
      </ScrollView>
    )
  },
  //My Tryout
  ({navigation}) => {
    const [subjectPicker, setSubject] = React.useState("")
    const unfinishedTryouts = items.filter( ({paid, finished}) => (paid === true && finished === false) )
    const finishedTryouts = items.filter( ({paid, finished}) => (paid === true && finished === true) )

    return (
      <ScrollView contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>
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
        {/* Unfinished Tryouts */}
        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Tryout yang belum selesai</Text>
        {unfinishedTryouts.filter( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker))
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details Tryout', {...value})} key={index}>
                <View style={styles.smallCard}>
                  <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    {/* Belum tau mo isi apa */}
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <Text style={styles.leftSmallMediumText}>{value.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (unfinishedTryouts.find( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20}}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      }
      {/* Finished Tryouts */}
      <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Tryout yang sudah selesai</Text>
        {finishedTryouts.filter( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker))
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details Tryout', {...value})} key={index}>
                <View style={styles.smallCard}>
                  <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    {/* Belum tau mo isi */}
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <Text style={styles.leftSmallMediumText}>{value.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (finishedTryouts.find( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20}}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      }
      </ScrollView>
    )
  },
  //Details Tryout
  ({route, navigation}) => {
    const { id, name, price, start_at, end_at } = route.params
    const [tests, setTests] = React.useState([])
    const [subTests, setSubTests] = React.useState([[], []])
    const [activeSections, setActiveSections] = React.useState([])
    const [buySuccessModal, setBuySuccessModal] = React.useState(false)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const getData = () => {
      axios.get(`https://dev.akademis.id/api/tryout/${id}`)
        .then(res => {
          var arr = res.data.data.test
          var newArr = []

          arr.forEach(element => {
            newArr.push(element.subtest)
          })

          setTests(arr)
          setSubTests(newArr)

          console.log("Data response: ")
          console.log(arr)
          console.log("Subtest response: ")
          console.log(newArr)
        })
        .catch(e => console.log(e) )
    }

    const _renderHeader = sections => (
      <View style={{width: RFValue(320), padding: RFValue(10), backgroundColor: theme.PRIMARY_DARK_COLOR, justifyContent: 'center', alignItems: 'center', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 0.5}}>
        <Text style={{fontSize: RFValue(17), color: 'white'}}>{sections.name}</Text>
      </View>
    )

    const _renderContent = (sections, index) => (
        subTests[index].map( (value) => (
          <View style={{marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderColor: theme.SECONDARY_DARK_COLOR, borderRadius: 15, borderWidth: 0.5, padding: 5}}>
            <Text style={{fontSize: RFValue(15) }}>{value.name}</Text>
            <Text style={{fontSize: RFValue(14), color: 'gray' }}>Waktu : {value.time} menit</Text>
          </View>
        ) )
    )

    React.useEffect(() => {
      getData()
    }, [])

    return (
      <ScrollView contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>
        {/* Modal pembelian berhasil */}
        <Overlay
          animationType="fade"
          fullscreen={true}
          isVisible={buySuccessModal}
          onRequestClose={() => {
            setBuySuccessModal(false)
          }}
          overlayStyle={styles.overlay}
        >
          <View style={styles.centeredView}>
            <View style={{
              width: Dimensions.get('window').width*0.8, 
              backgroundColor: 'white',
              elevation: 5,
              alignItems: 'center',
              margin: 20,
              borderRadius: 25,
              overflow: 'hidden',
              }}
            >
              <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%'}}>
                <Text style={[styles.mediumWhiteText, {margin: 10, left: 15}]}>Pembelian berhasil!</Text>
              </View>
              <View style={{ width: Dimensions.get('window').width*0.8, alignItems: 'center'}}>
                <Image source={buySuccessImage} style={{width: RFValue(200), height: RFValue(150) }}/>
                <TouchableOpacity 
                  style={[styles.button, {width: RFValue(270) } ]} 
                  onPress={() => {setBuySuccessModal(false), navigation.goBack() } }
                >
                  <Text style={styles.buttonText}>Oke mantap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Overlay>

        <View style={{
          width: Dimensions.get('window').width*0.7, 
          height: Dimensions.get('window').width*0.7*0.75,
          backgroundColor: theme.SECONDARY_DARK_COLOR,
          alignSelf: 'center',
          margin: 20,
          borderRadius: 25,
          overflow: 'hidden'
          }}
        >
          {
            (name.toLowerCase().includes('saintek') ) ?
              <ImageBackground source={saintekSingleImage} style={styles.backgroundImage}/>
            : (name.toLowerCase().includes('soshum') ) ?
              <ImageBackground source={soshumSingleImage} style={styles.backgroundImage}/>
            : 
              <ImageBackground source={purchaseToImage} style={styles.backgroundImage}/>
          }
        </View>

        <Text style={{left: 20, fontSize: 22, marginTop: 10}}>Informasi Tryout</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
          <Text style={styles.leftMediumText}>Nama Tryout : {"\n"}
            <Text style={styles.leftSmallText}>{name}</Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={styles.leftMediumText}>Harga : {price}{"   "}</Text>
            <Image source={diamond} style={{width: 22, height: 22}}/>
          </View>
          <Text style={styles.leftMediumText}>Waktu Tryout : {"\n"}
            <Text style={styles.leftSmallText}>{start_at}{"\n"}hingga{"\n"}{end_at}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Tanggal Pembelian : {"\n"}
            <Text style={styles.leftSmallText}>{today}</Text>
          </Text>
        </View>

        <Text style={{left: 20, fontSize: 22, marginTop: 30}}>Konten Tryout</Text>
        <View style={styles.horizontalRuler}/>

        <Accordion
          sections={tests}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={ active => setActiveSections(active) }
          underlayColor={theme.PRIMARY_ACCENT_COLOR}
          containerStyle={{width: RFValue(320), alignSelf: 'center', borderRadius: 20, overflow: 'hidden', marginTop: RFValue(10)}}
        />

        <Text style={{left: 20, fontSize: 22, marginTop: 30}}>Metode Pembayaran</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{margin: 20, alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={ () => {
              setBuySuccessModal(true)
          }}>
            <Text style={styles.buttonText}>Beli dengan diamond</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={ () => {
              setBuySuccessModal(true)
          }}>
            <Text style={styles.buttonText}>Beli via share ke media sosial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
]

{/* <View>
  <TouchableOpacity style={[styles.button, {marginTop: 30}]} onPress={() => {
      navigation.navigate('Conduct Tryout', {name: name})
  }}>
    { (finished) ? 
    <Text style={styles.buttonText}>Lihat Pembahasan</Text> : 
    <Text style={styles.buttonText}>Mulai Tryout</Text>
    }
  </TouchableOpacity>
</View> */}