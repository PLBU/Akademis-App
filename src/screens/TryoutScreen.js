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
  ImageBackground,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Stars from 'react-native-stars';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'react-native-axios';
import Accordion from 'react-native-collapsible/Accordion';
import { Overlay } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native'
import ImagePicker from 'react-native-image-picker';
import { Table, Row, Rows } from 'react-native-table-component';

//Styles
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

//Context
import { AuthContext } from '../components/Context.js'

//Importing images
import diamond from '../assets/icons/diamond-currency.png'
import notFoundImage from '../assets/images/image-not-found-bg-terang.png'
import saintekSingleImage from '../assets/images/saintek-single.png'
import soshumSingleImage from '../assets/images/soshum-single.png'
import saintekSingleImageBox from '../assets/images/saintek-single-kotak-transparan.png'
import soshumSingleImageBox from '../assets/images/soshum-single-kotak-transparan.png'
import purchaseToImage from '../assets/images/purchase-to-bg-gelap.png'
import buySuccessImage from '../assets/images/pembelian-sukses-bg-terang.png'

const moment = require('moment');

function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

function dateFormat(date){
  return moment(new Date(date) ).format('DD/MM/YYYY')
}

export default [
  //Catalogue
  ({navigation}) => {
    const { authState } = React.useContext(AuthContext)

    const [refreshing, setRefreshing] = React.useState(false)
    const [subjectPicker, setSubject] = React.useState("")
    const [availTryouts, setAvailTryouts] = React.useState([])
    const isFocused = useIsFocused()

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getTryouts()
      wait(2000).then(() => setRefreshing(false))
    }, [])

    const getTryouts = () => {
      axios.get('https://dev.akademis.id/api/tryout/')
        .then(res => {
          //Getting the class that is owned
          var arrChecker = []

          axios.get(`https://dev.akademis.id/api/my-tryout/?user_id=${authState?.userToken}`)
            .then(res1 => {
              res1.data.data.forEach( ({ tryout_id }) => arrChecker.push(tryout_id) )

              console.log("MY tryout RESPONSE: ")
              console.log(arrChecker)

              //Filtering the class that is not owned
              var arr = res.data.data
              setAvailTryouts(arr.filter( ({ id }) => (!arrChecker.some( (element) => (element == id) ) ) ) )

              console.log("TRYOUT RESPONSE: ")
              console.log(res.data.data)
            })
        })
        .catch(e => console.log(e) )
    }

    React.useEffect( () => {
      getTryouts()
    }, [isFocused])

    return (
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{flexGrow: 1}}
        style={styles.bgAll}>
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
                    <Text style={styles.leftSmallMediumText}>
                      { (value.name.length < 20) ?
                        value.name
                        :
                        shorten(value.name, 20, ' ')
                      }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (availTryouts.some( ({ name }) => (subjectPicker === "") ? true : (name.toLowerCase().includes(subjectPicker) ) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20, marginBottom: RFValue(15) }}>Maaf, tidak ada tryout yang tersedia</Text>
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
      { (availableTryouts.some( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20, marginBottom: RFValue(15) }}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      } */}
      </ScrollView>
    )
  },
  //My Tryout
  ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false)
    const isFocused = useIsFocused()
    const [subjectPicker, setSubject] = React.useState("")
    const [availTryouts, setAvailTryouts] = React.useState([])
    const { authState } = React.useContext(AuthContext)

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getTryouts()
      wait(2000).then(() => setRefreshing(false))
    }, [])

    const unfinishedTryouts = availTryouts.filter( ({is_finished}) => (is_finished === "not finished") )
    const finishedTryouts = availTryouts.filter( ({is_finished}) => (is_finished === "finished") )

    const getTryouts = () => {
        axios.get(`https://dev.akademis.id/api/my-tryout/?user_id=${authState?.userToken}`)
          .then(res => {
            var arr = res.data.data
            setAvailTryouts(arr)

            console.log("MY TRYOUT RESPONSE: ")
            console.log(arr)
          })
        .catch(e => console.log(e) )
    }

    React.useEffect( () => {
      getTryouts()
    }, [isFocused])

    return (
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>
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
        {/* Unfinished Tryouts */}
        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Tryout yang belum selesai</Text>
        {unfinishedTryouts.filter( ({ tryout }) => (subjectPicker === "") ? true : (tryout.name.toLowerCase().includes(subjectPicker) ) )
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details Unfinished Tryout', {...value.tryout, mytryout_id: value.id})} key={index}>
                <View style={styles.smallCard}>
                  <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center', overflow: 'hidden'}}>
                    {
                      (value.tryout.name.toLowerCase().includes('saintek') ) ?
                        <Image source={saintekSingleImageBox} style={{width: RFValue(90), height: RFValue(90)}}/>
                      : 
                        <Image source={soshumSingleImageBox} style={{width: RFValue(90), height: RFValue(90)}}/>  
                    }
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <Text style={styles.leftSmallMediumText}>
                      { (value.tryout.name.length < 20) ?
                        value.tryout.name
                        :
                        shorten(value.tryout.name, 20, ' ')
                      }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (unfinishedTryouts.some( ({ tryout }) => (subjectPicker === "") ? true : (tryout.name.toLowerCase().includes(subjectPicker) ) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20, marginBottom: RFValue(15) }}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      }
      {/* Finished Tryouts */}
      <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Tryout yang sudah selesai</Text>
        {finishedTryouts.filter( ({ tryout }) => (subjectPicker === "") ? true : (tryout.name.toLowerCase().includes(subjectPicker) ) )
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details Finished Tryout', {...value.tryout, mytryout_id: value.id})} key={index}>
                <View style={styles.smallCard}>
                  <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    {
                      (value.tryout.name.toLowerCase().includes('saintek') ) ?
                        <Image source={saintekSingleImageBox} style={{width: RFValue(90), height: RFValue(90)}}/>
                      : 
                        <Image source={soshumSingleImageBox} style={{width: RFValue(90), height: RFValue(90)}}/>  
                    }
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <Text style={styles.leftSmallMediumText}>
                      { (value.tryout.name.length < 20) ?
                        value.tryout.name
                        :
                        shorten(value.tryout.name, 20, ' ')
                      }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (finishedTryouts.some( ({ tryout }) => (subjectPicker === "") ? true : (tryout.name.toLowerCase().includes(subjectPicker) ) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20, marginBottom: RFValue(15) }}>Maaf, tidak ada tryout yang tersedia</Text>
          </View>
      }
      </ScrollView>
    )
  },
  //Details Tryout
  ({route, navigation}) => {
    const { id, name, price, start_at, end_at } = route.params
    const { authState, _setDiamond } = React.useContext(AuthContext)

    const [refreshing, setRefreshing] = React.useState(false)
    const [tests, setTests] = React.useState([])
    const [subTests, setSubTests] = React.useState([[], []])
    const [activeSections, setActiveSections] = React.useState([])
    const [buySuccessModal, setBuySuccessModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [buktiFollow, setFollow] = React.useState(null)
    const [buktiTag, setTag] = React.useState(null)
    const [buktiShare, setShare] = React.useState(null)
    const [telp, setTelp] = React.useState(null)
    const [sekolah, setSekolah] = React.useState(null)
    const [kota, setKota] = React.useState(null)
    const [provinsi, setProvinsi] = React.useState(null)
    const [shareModal, setShareModal] = React.useState(false)
    const [isShared, setIsShared] = React.useState(false)
    const [isVerified, setVerified] = React.useState(false)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getData()
      wait(2000).then(() => setRefreshing(false))
    }, [])


    today = dd + '/' + mm + '/' + yyyy;

    const openGallery = (section) =>{
      const options = {
        title: 'Select photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.25
      };
      
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };

          if (section == 'f') setFollow(source.uri)
          else if (section == 't') setTag(source.uri)
          else if (section == 's') setShare(source.uri)
      }
      })
    }

    const shareTryout = () => {
      axios.post(`https://dev.akademis.id/api/share`, {
        "user_id": authState?.userToken,
        "follow": buktiFollow,
        "tag": buktiTag,
        "share": buktiShare,
        "status": "not verified",
        "tryout_id": id
      })
        .then(res => {
          console.log(res)

          setShareModal(false)
          setFollow(null)
          setTag(null)
          setShare(null)
          getData()
          Alert.alert("Berhasil", "Pembelian dengan metode share berhasil, tunggu verifikasi dari tim kami ya")
        })
        .catch(e => {
          Alert.alert("Error", "Pembelian dengan metode share gagal diunggah ke server kami, silakan coba lagi")
          console.log(e)
        })
    }

    const buyTryout = () => {
      setLoading(true)
      axios.post('https://dev.akademis.id/api/my-tryout', {
        "tryout_id": id,
        "user_id": authState?.userToken,
        "is_verified": "not verified",
        "is_finished": "not finished",
        "is_premium": "premium"
      })
        .then(res => {
          console.log(res)
          _setDiamond(res.data.data.user_diamond)
          setBuySuccessModal(true)
          setLoading(false)
        })
        .catch(e => {
          Alert.alert("Error", e.response)
          console.log(e.response)
          setLoading(false) 
        })
    }

    const claimTryout = async () => {
      setLoading(true)
      await _setDiamond(price)
      await axios.post('https://dev.akademis.id/api/my-tryout', {
        "tryout_id": id,
        "user_id": authState?.userToken,
        "is_verified": "not verified",
        "is_finished": "not finished",
        "is_premium": "premium"
      })
        .then(res => {
          console.log(res)
          _setDiamond(res.data.data.user_diamond)
          setBuySuccessModal(true)
          setLoading(false)
        })
        .catch(e => {
          Alert.alert("Error", e.response)
          console.log("ERROR DI CLAIM TRYOUT")
          console.log(e.response), setLoading(false) 
        })
    }

    const getData = () => {
      setLoading(true)
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

          axios.get(`https://dev.akademis.id/api/share?tryout_id=${id}&user_id=${authState?.userToken}`)
            .then(res => {
              if (res.data.data.length > 0) setIsShared(true)
              if (res.data.data[0].status == "verified") setVerified(true)
              setLoading(false)
            })
            .catch(e => {
              setLoading(false)
              console.log(e) 
            })
        })
        .catch(e => {console.log(e), setLoading(false)} )
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
    

    if (loading === true) return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
        <ActivityIndicator size="large" color="black"/>
      </View>
    )
    else return (
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>
        {/* Modal share method */}
        <Overlay
          animationType="fade"
          fullscreen={false}
          isVisible={shareModal}
          onRequestClose={() => {
            setShareModal(false)
          }}
          overlayStyle={styles.overlay}>
          <View style={styles.centeredView}>
            <TouchableOpacity 
              onPress={() => {
                setFollow(null)
                setTag(null)
                setShare(null)
                setShareModal(false)}} 
              style={{position: 'absolute', top: 10, right: 10}}>
              <FontAwesomeIcon name='close' size={35} color='white'/>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={[{flexGrow: 1}]}
            style={{
              width: Dimensions.get('window').width*0.8,
              maxHeight: Dimensions.get('window').height*0.8,
              backgroundColor: 'white',
              elevation: 5,
              margin: 20,
              borderRadius: 25,
              flex: 0.78
              }}
            >

              <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                <Text style={[styles.bigWhiteText, {margin: 10, left: 15}]}>Konfirmasi Sharing</Text>
              </View>
              <View style={{height: '100%', width: '100%', padding: 20}}>

                <Text style={{fontSize: RFValue(18)}}>Tryout yg ingin dibeli: </Text>
                <Text style={{fontSize: 16, color: 'gray', marginBottom: 15}}>{name}</Text>

                <Text style={{fontSize: RFValue(18), marginBottom: 10, marginTop: 10}}>Isi Data Kamu: </Text>
                <TextInput 
                  style={styles.textInputModal}
                  label="Nomor Telepon"
                  onChangeText={val => setTelp(val)}
                  value={telp}
                  mode='flat'
                  theme={{
                    colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
                    roundness: 10,
                  }}
                />
                <TextInput 
                  style={styles.textInputModal}
                  label="Asal Sekolah"
                  onChangeText={val => setSekolah(val)}
                  value={sekolah}
                  mode='flat'
                  theme={{
                    colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
                    roundness: 10,
                  }}
                />
                <TextInput 
                  style={styles.textInputModal}
                  label="Asal Kota"
                  onChangeText={val => setKota(val)}
                  value={kota}
                  mode='flat'
                  theme={{
                    colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
                    roundness: 10,
                  }}
                />
                <TextInput 
                  style={styles.textInputModal}
                  label="Asal Provinsi"
                  onChangeText={val => setProvinsi(val)}
                  value={provinsi}
                  mode='flat'
                  theme={{
                    colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
                    roundness: 10,
                  }}
                />

                <Text style={{fontSize: RFValue(18), marginBottom: 10, marginTop: 10}}>Unggah Bukti Follow: </Text>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 15}}>
                  <TouchableOpacity style={{backgroundColor: 'white', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 1, padding: RFValue(12), width: '65%', borderRadius: 20}} 
                    onPress={() => openGallery('f')}>
                    <Text style={{fontSize: RFValue(15), alignSelf: 'center'}}>Unggah Foto</Text>
                  </TouchableOpacity>
                  {buktiFollow && <FontAwesomeIcon name={"check-square-o"} size={30} color={theme.SECONDARY_DARK_COLOR} style={{marginLeft: RFValue(15)}}/>}
                </View>

                <Text style={{fontSize: RFValue(18), marginBottom: 10}}>Unggah Bukti Tag: </Text>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 15}}>
                  <TouchableOpacity style={{backgroundColor: 'white', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 1, padding: RFValue(12), width: '65%', borderRadius: 20}} 
                    onPress={() => openGallery('t')}>
                    <Text style={{fontSize: RFValue(15), alignSelf: 'center'}}>Unggah Foto</Text>
                  </TouchableOpacity>
                  {buktiTag && <FontAwesomeIcon name={"check-square-o"} size={30} color={theme.SECONDARY_DARK_COLOR} style={{marginLeft: RFValue(15)}}/>}
                </View>

                <Text style={{fontSize: RFValue(18), marginBottom: 10}}>Unggah Bukti Share: </Text>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 15}}>
                  <TouchableOpacity style={{backgroundColor: 'white', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 1, padding: RFValue(12), width: '65%', borderRadius: 20}} 
                    onPress={() => openGallery('s')}>
                    <Text style={{fontSize: RFValue(15), alignSelf: 'center'}}>Unggah Foto</Text>
                  </TouchableOpacity>
                  {buktiShare && <FontAwesomeIcon name={"check-square-o"} size={30} color={theme.SECONDARY_DARK_COLOR} style={{marginLeft: RFValue(15)}}/>}
                </View>

                <TouchableOpacity
                  type="submit" 
                  style={(buktiFollow && buktiShare && buktiTag && telp && sekolah && kota && provinsi) ? [styles.button, {width: '90%', marginTop: RFValue(10)}] : [styles.disabledButton, {width: '90%', marginTop: RFValue(10)}]} 
                  onPress={ () => shareTryout()} 
                  disabled={(buktiFollow && buktiShare && buktiTag && telp && sekolah && kota && provinsi) ? false : true}>
                  <Text style={styles.buttonText}>Beli Tryout!</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Overlay>

        {/* Modal pembelian berhasil */}
        <Overlay
          animationType="fade"
          fullscreen={true}
          isVisible={buySuccessModal}
          onRequestClose={() => {
            setBuySuccessModal(false)
          }}
          overlayStyle={styles.overlay}>
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
          }}>
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
          <TouchableOpacity 
            style={(authState?.diamond >= price) ? styles.button : styles.disabledButton} 
            onPress={ () => buyTryout()} 
            disabled={(authState?.diamond >= price) ? false : true}>
            <Text style={styles.buttonText} >
              { (authState?.diamond >= price) ? "Beli dengan diamond" : "Diamond anda tidak cukup"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={(isVerified) ? styles.button : (isShared) ? styles.disabledButton : styles.button} 
            disabled={(isVerified) ? false : (isShared) ? true : false}
            onPress={ () => {
                (isVerified) ? claimTryout() : setShareModal(true)
            }}>
            <Text style={styles.buttonText}>
            { (isVerified)
              ? "Klaim Tryout"
              : (isShared) 
              ? "Menunggu verifikasi" 
              : "Beli via share medsos"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  },
  //Details Unfinished Tryout
  ({route, navigation}) => {
    const { id, name, start_at, end_at, mytryout_id } = route.params
    const { authState } = React.useContext(AuthContext)
    const isFocused = useIsFocused()
    
    const [refreshing, setRefreshing] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [status, setStatus] = React.useState("draft")
    const [role, setRole] = React.useState(null)
    const [tests, setTests] = React.useState([])
    const [subTests, setSubTests] = React.useState([[], []])
    const [isFinished, setIsFinished] = React.useState([{id: -1, finished: false}])
    const [activeSections, setActiveSections] = React.useState([])

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getData()
      wait(2000).then(() => setRefreshing(false))
    }, [])

    const finishTryout = () => {
      setLoading(true)
      axios.put(`https://dev.akademis.id/api/my-tryout/${mytryout_id}`, {
        "is_finished": "finished"
      })
        .then( res => {
          setLoading(false)
          console.log(res)
          navigation.goBack()
        })
        .catch(e => {
          Alert.alert("Error", e.response)
          console.log(e) 
          setLoading(false)
        })
    }

    const getData = () => {
      setLoading(true)
      axios.get(`https://dev.akademis.id/api/tryout/${id}`)
        .then(res => {
          var arr = res.data.data.test
          var newStatus = res.data.data.status
          var newArr = []

          console.log('Finished tryout or not?')
          console.log(arr)
          arr.forEach( (element) => {
            newArr.push(element.subtest)
          })

          var arrIsFinished = []
          var itemProcessed = 0
          var maxItems = 0

          newArr.forEach(element => {
            maxItems += element.length
          })

          newArr.forEach(element => {
            element.map( (value) => {
              axios.get(`https://dev.akademis.id/api/answer?user_id=${authState?.userToken}&subtest_id=${value.id}`)
                .then(res => {
                  var tempArr = res.data.data
                  console.log("Ansewrs: ")
                  console.log(tempArr)
                  console.log(value.id)

                  if (tempArr.length == 0) arrIsFinished.push({id: value.id, finished: false})
                  else arrIsFinished.push({id: value.id, finished: true})

                  console.log(arrIsFinished)

                  console.log(arrIsFinished.filter( ( { id } ) => (value.id == id) )[0].finished )

                  setIsFinished(arrIsFinished)
                  itemProcessed++

                  console.log("ITEM PROCESSED IN FOR EACH")
                  console.log(itemProcessed)
                  console.log(maxItems)

                  if (itemProcessed == maxItems) setLoading(false)
                })
                .catch(e => console.log(e) )
            })

          })
            
          setTests(arr)
          setSubTests(newArr)
          setStatus(newStatus)

          console.log(arrIsFinished)
          console.log("Data response: ")
          console.log(arr)
          console.log("Subtest response: ")
          console.log(newArr)
        })
        .catch(e => {console.log(e), setLoading(false) })
    }

    const getRole = () => {
      axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
        .then(res => {
          setRole(res.data.data.role)
        })
        .catch(e => console.log("ERROR DI GETROLE" + e) )
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

            { !(status == "published" || role == "admin") 
            ? <TouchableOpacity 
                style={[styles.disabledButton, {marginTop: 20}]} 
                disabled={true}>
                  <Text style={styles.buttonText}>Belum tersedia</Text>
              </TouchableOpacity>
            : (isFinished.some( ( { id, finished } ) => (value.id == id && !finished) ) ) ?
              <TouchableOpacity 
                style={[styles.button, {marginTop: 20}]} 
                onPress={() => { navigation.navigate('Conduct Tryout', {...value})}} >
                  <Text style={styles.buttonText}>Mulai Subtest</Text>
              </TouchableOpacity>
              // : (!isFinished.some( ( { id } ) => (value.id == id) ) ) ?
              // <TouchableOpacity 
              //   style={[styles.button, {marginTop: 20}]} 
              //   onPress={() => { navigation.navigate('Conduct Tryout', {...value})}} >
              //     <Text style={styles.buttonText}>Mulai Subtest</Text>
              // </TouchableOpacity>
              :
              <TouchableOpacity 
                style={[styles.disabledButton, {marginTop: 20}]} 
                disabled={true}>
                  <Text style={styles.buttonText}>Sudah dikerjakan</Text>
              </TouchableOpacity>
            }
          </View>
        ) )
    )

    React.useEffect(() => {
      console.log("FIRST TIME SHOWN IN DETAILS")
      console.log(isFinished)
      getData()
      getRole()
    }, [isFocused])

    if (loading === true) return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="black"/>
      </View>
    )
    else return (
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>

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
          <Text style={styles.leftMediumText}>Waktu Tryout : {"\n"}
            <Text style={styles.leftSmallText}>{start_at}{"\n"}hingga{"\n"}{end_at}</Text>
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
          containerStyle={{width: RFValue(320), alignSelf: 'center', borderRadius: 20, overflow: 'hidden', marginTop: RFValue(10), marginBottom: RFValue(30) }}
        />

        { (isFinished.some( ( { finished  } ) => {console.log("Ini dari SOME SIALAN: " + finished); return (finished == false)} ) ) 
          ?
          <TouchableOpacity 
            style={[styles.disabledButton, {marginTop: 20}]} 
            disabled={true}>
              <Text style={styles.buttonText}>Tryout belum selesai</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity 
            style={[styles.button, {marginTop: 20}]} 
            onPress={() => finishTryout()} >
              <Text style={styles.buttonText}>Selesaikan tryout</Text>
          </TouchableOpacity>
        }

      </ScrollView>
    )
  },
  //Details Finished Tryout
  ({route, navigation}) => {
    const { id, name, start_at, end_at, mytryout_id } = route.params
    const { authState } = React.useContext(AuthContext)
    const isFocused = useIsFocused()
    
    const [refreshing, setRefreshing] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [tests, setTests] = React.useState([])
    const [subTests, setSubTests] = React.useState([[], []])
    const [activeSections, setActiveSections] = React.useState([])
    const [ranks, setRanks] = React.useState([])
    const [myRank, setMyRank] = React.useState({rank: null, nilai: null})
    const [score, setScore] = React.useState({
      nilai_biologi: null, 
      nilai_ekonomi: null, 
      nilai_fisika: null, 
      nilai_geografi: null, 
      nilai_kimia: null, 
      nilai_mat_ipa: null, 
      nilai_mat_soshum: null, 
      nilai_pbm: null, 
      nilai_pk: null, 
      nilai_ppu: null, 
      nilai_pu: null, 
      nilai_sejarah: null, 
      nilai_sosiologi: null,
    })

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getData()
      getRanking()
      getScore()
      wait(2000).then(() => setRefreshing(false))
    }, [])

    const getRanking = () => {
      axios.get(`https://dev.akademis.id/api/ranking?tryout_id=${id}`)
        .then(res => {
          console.log('RANKING: ')
          console.log(res.data.data)
          setRanks(res.data.data)

          res.data.data.forEach( (value, index) => {
            if (value.user_id = authState?.userToken) {
              setMyRank({rank: index + 1, nilai: value.nilai})
            }
          })

        })
        .catch(e => {
          console.log(e)
        })
    }

    const getScore = () => {
      axios.get(`https://dev.akademis.id/api/my-tryout/?tryout_id=${id}&user_id=${authState?.userToken}`)
        .then(res => {
          // console.log('MY SCOREEE')
          // console.log(res.data.data[0].score[0] )
          (res.data.data[0].score[0] ) ? setScore(res.data.data[0].score[0] ) : setScore(0)
        })
        .catch(e => {
          // console.log('MY SCORE')
          console.log(e)
        })
    }

    const getData = () => {
      setLoading(true)
      axios.get(`https://dev.akademis.id/api/tryout/${id}`)
        .then(res => {
          var arr = res.data.data.test
          var newArr = []

          arr.forEach( (element) => {
            newArr.push(element.subtest)
          })
            
          setTests(arr)
          setSubTests(newArr)

          console.log("Data response: ")
          console.log(arr)
          console.log("Subtest response: ")
          console.log(newArr)

          setLoading(false)
        })
        .catch(e => {console.log(e), setLoading(false) })
    }

    const _renderHeader = sections => (
      <View style={{width: RFValue(320), padding: RFValue(10), backgroundColor: theme.PRIMARY_DARK_COLOR, justifyContent: 'center', alignItems: 'center', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 0.5}}>
        <Text style={{fontSize: RFValue(17), color: 'white'}}>{sections.name}</Text>
      </View>
    )

    const getNilai = (name) => {
      switch (name) {
        case "Biologi":
          return score.nilai_biologi
        case "Ekonomi":
          return score.nilai_ekonomi
        case "Fisika":
          return score.nilai_fisika
        case "Geografi":
          return score.nilai_geografi
        case "Kimia":
          return score.nilai_kimia
        case "Matematika Saintek":
          return score.nilai_mat_ipa
        case "Matematika Soshum":
          return score.nilai_mat_soshum
        case "Pemahaman Bacaan":
          return score.nilai_pbm
        case "Pengetahuan Kuantitatif":
          return score.nilai_pk
        case "Pemahaman Umum":
          return score.nilai_ppu
        case "Penalaran Umum":
          return score.nilai_pu
        case "Sejarah":
          return score.nilai_sejarah
        case "Sosiologi":
          return score.nilai_sosiologi
        default:
          return null
      }
    }

    const _renderContent = (sections, index) => (
        subTests[index].map( (value) => (
          <View style={{marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderColor: theme.SECONDARY_DARK_COLOR, borderRadius: 15, borderWidth: 0.5, padding: 5}}>
            <Text style={{fontSize: RFValue(15) }}>{value.name}</Text>
            <Text style={{fontSize: RFValue(14), color: 'gray' }}>Nilai : {(getNilai(value.name) ) ? getNilai(value.name) : "nilai anda tidak tercantum"}</Text>

            { (value.pdf) ?
              <TouchableOpacity 
                style={[styles.button, {marginTop: 20}]} 
                onPress={() => {Linking.openURL(value.pdf)}} >
                  <Text style={styles.buttonText}>Lihat pembahasan</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity 
                style={[styles.disabledButton, {marginTop: 20}]} 
                disabled={true}>
                  <Text style={styles.buttonText}>Belum ada pembahasan</Text>
              </TouchableOpacity>
            }
          </View>
        ) )
    )

    React.useEffect(() => {
      getData()
      getRanking()
      getScore()
    }, [isFocused])

    if (loading === true) return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="black"/>
      </View>
    )
    else return (
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>

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
          <Text style={styles.leftMediumText}>Waktu Tryout : {"\n"}
            <Text style={styles.leftSmallText}>{start_at}{"\n"}hingga{"\n"}{end_at}</Text>
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

        <Text style={{left: 20, fontSize: 22, marginTop: 30}}>Ranking</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center', marginBottom: 15}}>
          <Text style={styles.leftMediumText}>Ranking anda : {"\n"}
            { (myRank.rank === null) 
              ? <Text style={styles.leftSmallText}>Anda belum tercantum pada ranking</Text> 
              : <Text style={styles.leftSmallText}>{myRank.rank} dengan nilai: {myRank.nilai}</Text> }
          </Text>
          {ranks.length !==0 &&
          <Table style={{marginHorizontal: RFValue(10), marginVertical: 15}} borderStyle={{borderWidth: 0.5, borderColor: theme.SECONDARY_DARK_COLOR}}>
            <Row 
              data={['No', 'Nama', 'PTN', 'Jurusan', 'Nilai']} 
              textStyle={{fontSize: 17, margin: 2.5}}
              style={{backgroundColor: theme.SECONDARY_DARK_COLOR}}
              widthArr={[0.08 * (Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) )]}/>
            {ranks.map( (value, index) => (
              <Row 
                data={[index + 1, value.name, value.ptn, value.jurusan, value.nilai]} 
                key={index} 
                textStyle={{fontSize: 15, margin: 2.5, color: 'dark-gray'}} 
                widthArr={[0.08 * (Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) ), 0.23 *(Dimensions.get('window').width*0.95 - RFValue(20) )]}/>
            ))}
          </Table>}
        </View>

      </ScrollView>
    )
  },
]