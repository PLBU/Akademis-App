import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
  Image,
  ImageBackground,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Stars from 'react-native-stars';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'react-native-axios';
import { Table, Row, Rows } from 'react-native-table-component';
import { Overlay } from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";
import { useIsFocused } from '@react-navigation/native'

//Context
import { AuthContext } from '../components/Context.js'

//Styles
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

//Importing images
import diamond from '../assets/icons/diamond-currency.png'
import vcImage from '../assets/images/virtual-class-bg-gelap.png'
import vcPurchaseImage from '../assets/images/purchase-virtual-class-bg-gelap.png'
import notFoundImage from '../assets/images/image-not-found-bg-terang.png'
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
    const isFocused = useIsFocused()

    const [refreshing, setRefreshing] = React.useState(false)
    const [subjectPicker, setSubject] = React.useState("")
    const [availableClasses, setAvailableClasses] = React.useState([])

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getClasses()
      wait(1000).then(() => setRefreshing(false))
    }, [])

    const getClasses = () => {
      axios.get('https://dev.akademis.id/api/class')
        .then( res => {
          var arr = res.data.data
          axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
            .then ( res1 => {
              axios.get(`https://dev.akademis.id/api/myclass?user_email=${res1.data.data.email}`)
                .then( res2 => {
                  var arrChecker = []
                  res2.data.data.forEach( ({ event_id }) => arrChecker.push(event_id) )

                  var newArr = arr.filter( ({ id }) => !arrChecker.some( (element) => (element == id) ) ) 
                  // console.log("INI DARI GET CLASS YANG KATALOG")
                  // console.log(arr)
                  // console.log(newArr)
                  setAvailableClasses(newArr)
                })
          })
        })
        .catch( e => console.log(e) )
    }

    React.useEffect( () => {
      getClasses()
    }, [isFocused])

    return (
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{flexGrow: 1}} style={styles.bgAll}>
        <Text style={{top: 10, left: 20, fontSize: 22, marginBottom: 15}}>Pilih Kategori</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10, marginBottom: 10}]}>
          <Picker
            selectedValue={subjectPicker}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) => setSubject(itemValue)}>
            <Picker.Item label={"All"} value={""}/>
            <Picker.Item label={"UTBK"} value={"utbk"}/>
            <Picker.Item label={"Kelas 11 Semester 1"} value={"kelas 11 semester 1"}/>
            <Picker.Item label={"SBMPTN"} value={"sbmptn"}/>
          </Picker>
        </View>

        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Virtual Class</Text>

        {availableClasses.filter( ({ kategori }) => (subjectPicker === "") ? true : (kategori.toLowerCase() === subjectPicker))
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details VC', {...value})} key={index}>
                <View style={styles.mediumCardWithDesc}>
                  <View style={{height: 50, flexDirection: 'row', backgroundColor: theme.PRIMARY_DARK_COLOR}}>
                    <Text style={{fontSize: 18, color: 'white', alignSelf: 'center', left: 15}}>
                    { (value.judul.length > 30) ? 
                      shorten(value.judul, 30, ' ') + " ..."
                      :
                      value.judul
                    }
                    </Text>
                    <View style={{flexDirection: 'row', alignItems:'center', alignSelf: 'center', position: 'absolute', right: 15}}>
                      <Image source={diamond} style={{width: 22, height: 22}}/>
                      <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.harga}</Text>
                    </View>
                  </View>
                  <Text style={styles.leftSmallText}>Kategori : {value.kategori}</Text>                
                  <Text style={styles.leftSmallText}>Pelajaran : {value.pelajaran}</Text>                
                  <Text style={styles.leftSmallText}>Kapasitas : {value.kapasitas}</Text>
                  <Text style={styles.leftSmallText}>Tanggal : {dateFormat(value.date_start)} hingga {dateFormat(value.date_end)}</Text>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (availableClasses.some( ({ kategori }) => (subjectPicker === "") ? true : (kategori.toLowerCase() === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20}}>Maaf, tidak ada kelas yang tersedia</Text>
          </View>
      }
      </ScrollView>
    )
  },
  //My Class
  ({navigation}) => {
    const { authState } = React.useContext(AuthContext)
    const isFocused = useIsFocused()

    const [refreshing, setRefreshing] = React.useState(false)
    const [subjectPicker, setSubject] = React.useState("")
    const [availableClasses, setAvailableClasses] = React.useState([])

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getMyClasses()
      wait(1000).then(() => setRefreshing(false))
    }, [])

    const getMyClasses = () => {
      axios.get('https://dev.akademis.id/api/class')
        .then( res => {
          var arr = res.data.data
          axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
            .then ( res1 => {
              axios.get(`https://dev.akademis.id/api/myclass?user_email=${res1.data.data.email}`)
                .then( res2 => {
                  var arrChecker = []
                  res2.data.data.forEach( ({ event_id }) => arrChecker.push(event_id) )

                  var newArr = arr.filter( ({ id }) => arrChecker.some( (element) => (element == id) ) ) 
                  // console.log("INI DARI GET MY CLASS")
                  // console.log(arr)
                  // console.log(newArr)
                  setAvailableClasses(newArr)
                })
          })
        })
        .catch( e => console.log(e) )
    }

    React.useEffect( () => {
      getMyClasses()
    }, [isFocused])

    return (
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{flexGrow: 1}} style={styles.bgAll}>
        <Text style={{top: 10, left: 20, fontSize: 22, marginBottom: 15}}>Pilih Kategori</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10, marginBottom: 10}]}>
          <Picker
            selectedValue={subjectPicker}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) => setSubject(itemValue)}>
            <Picker.Item label={"All"} value={""}/>
            <Picker.Item label={"UTBK"} value={"utbk"}/>
            <Picker.Item label={"Kelas 11 Semester 1"} value={"kelas 11 semester 1"}/>
            <Picker.Item label={"SBMPTN"} value={"sbmptn"}/>
          </Picker>
        </View>

        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Virtual Class</Text>

        {availableClasses.filter( ({ kategori }) => (subjectPicker === "") ? true : (kategori.toLowerCase() === subjectPicker))
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details Paid VC', {...value})} key={index}>
                <View style={styles.mediumCardWithDesc}>
                  <View style={{height: 50, flexDirection: 'row', backgroundColor: theme.PRIMARY_DARK_COLOR}}>
                    <Text style={{fontSize: 18, color: 'white', alignSelf: 'center', left: 15}}>
                    { (value.judul.length > 30) ? 
                      shorten(value.judul, 30, ' ') + " ..."
                      :
                      value.judul
                    }
                    </Text>
                  </View>
                  <Text style={styles.leftSmallText}>Kategori : {value.kategori}</Text>                
                  <Text style={styles.leftSmallText}>Pelajaran : {value.pelajaran}</Text>                
                  <Text style={styles.leftSmallText}>Kapasitas : {value.kapasitas}</Text>
                  <Text style={styles.leftSmallText}>Tanggal : {dateFormat(value.date_start)} hingga {dateFormat(value.date_end)}</Text>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (availableClasses.some( ({ kategori }) => (subjectPicker === "") ? true : (kategori.toLowerCase() === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Image source={notFoundImage} style={{width: RFValue(300), height: RFValue(225)}}/>
            <Text style={{fontSize: 20}}>Maaf, tidak ada kelas yang tersedia</Text>
          </View>
      }
      </ScrollView>
    )
  },
  //Details
  ({ route, navigation }) => {
    const { id } = route.params
    const { authState, _setDiamond } = React.useContext(AuthContext)

    const [refreshing, setRefreshing] = React.useState(false)
    const [myRating, setMyRating] = React.useState(0)
    const [data, setData] = React.useState({})
    const [teacher, setTeacher] = React.useState({})
    const [session, setSession] = React.useState([])
    const [rating, setRating] = React.useState(null)
    const [buySuccessModal, setBuySuccessModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getClass()
      wait(1000).then(() => setRefreshing(false))
    }, [])

    const buyClass = () => {
      setLoading(true)
      axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
        .then ( res1 => {
          axios.post(`https://dev.akademis.id/api/myclass?user_id=${authState?.userToken}`, {
            "email": res1.data.data.email,
            "event_id": id
          })
            .then(res => {
              console.log("FROM BUYING CLASS")
              console.log(res.data)
              setBuySuccessModal(true)
              setLoading(false)
              _setDiamond(res.data.message.user_diamond)
            })
            .catch(e => {
              Alert.alert("Error", e.response)
              console.log("FAILED from buying Class"), console.log(e.response), setLoading(false)})
        })
        .catch(e => { 
          Alert.alert("Error", e.response)
          console.log("FAILED from getting User API"), console.log(e.response), setLoading(false)})
    }

    const getClass = () => {
      setLoading(true)
      axios.get(`https://dev.akademis.id/api/class/${id}`)
        .then( res => {
          const reviews = res.data.data.reviews
          var sumRating = 0;

          reviews.forEach( el => sumRating += parseFloat(el.kualitas) )

          setData(res.data.data)
          setTeacher(res.data.data.teacher)
          setSession(res.data.data.sesi)
          if (reviews.length > 0) setRating(sumRating/reviews.length)
          setLoading(false)
        })
        .catch( e => {console.log(e), setLoading(false) } )
    }

    React.useEffect( () => {
      getClass()
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
        contentContainerStyle={{flexGrow: 1}} style={styles.bgAll}>
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
          overflow: 'hidden',
          borderRadius: 25,
          }}>
          <ImageBackground source={vcPurchaseImage} style={styles.backgroundImage} />
        </View>

        <Text style={{left: 20, fontSize: 22, marginTop: 10}}>Informasi Kelas</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
          <Text style={styles.leftMediumText}>Nama Kelas : {"\n"}
            <Text style={styles.leftSmallText}>{data.judul}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Kategori : {"\n"}
            <Text style={styles.leftSmallText}>{data.kategori}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Pelajaran : {"\n"}
            <Text style={styles.leftSmallText}>{data.pelajaran}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Kapasistas : {"\n"}
            <Text style={styles.leftSmallText}>{data.kapasitas} murid</Text>
          </Text>
          <Text style={styles.leftMediumText}>Tanggal : {"\n"}
            <Text style={styles.leftSmallText}>{dateFormat(data.date_start)} hingga {dateFormat(data.date_end)}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Deskripsi : {"\n"}
            <Text style={styles.leftSmallText}>{data.deskripsi}</Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={styles.leftMediumText}>Harga : {data.harga}{"   "}</Text>
            <Image source={diamond} style={{width: 22, height: 22}}/>
          </View>
        </View>

        <Text style={styles.sectionText}>Sesi Live Teaching</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
          <Table style={{marginHorizontal: 10}}>
            <Row data={['Tanggal', 'Waktu', 'Link']} textStyle={{fontSize: 17, margin: 2.5}}/>
            {session.map( (value, index) =>
              <Row data={[dateFormat(value.tanggal), String(value.time_start) + " - " + String(value.time_end), 'Locked']} key={index} textStyle={{fontSize: 15, margin: 2.5, color:'grey'}}/>
            )}
          </Table>
        </View>

        <Text style={styles.sectionText}>Tentang Gurumu</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
          <Text style={styles.leftMediumText}>Nama Guru : {"\n"}
            <Text style={styles.leftSmallText}>{teacher.nama}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Rating Guru : {"\n"}
            <Text style={styles.leftSmallText}>{(rating) ? rating.toFixed(1) : "Masih belum ada rating"}</Text>
          </Text>
          <Text style={styles.leftMediumText}>About me : {"\n"}
            <Text style={styles.leftSmallText}>{teacher.deskripsi}</Text>
          </Text>
        </View>

        <Text style={styles.sectionText}>Metode Pembayaran</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{margin: 20, alignItems: 'center'}}>
          <TouchableOpacity 
            style={(authState?.diamond >= (data.harga)) ? styles.button : styles.disabledButton} 
            onPress={ () => buyClass()} 
            disabled={(authState?.diamond >= (data.harga)) ? false : true}>
            <Text style={styles.buttonText} >
              { (authState?.diamond >= (data.harga)) ? "Beli dengan diamond" : "Diamond anda tidak cukup"}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  },
  //Details Paid Class
  ({ route, navigation }) => {
    const { id } = route.params
    const { authState } = React.useContext(AuthContext)

    const [refreshing, setRefreshing] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [myRating, setMyRating] = React.useState(null)
    const [kritik, setKritik] = React.useState(null)
    const [data, setData] = React.useState({})
    const [teacher, setTeacher] = React.useState({})
    const [session, setSession] = React.useState([])
    const [rating, setRating] = React.useState(null)
    const [notifList, setNotifList] = React.useState([])
    const [notifVisible, setNotifVisible] = React.useState(false);
    const [questionVisible, setQuestionVisible] = React.useState(false);
    const [questionText, setQuestionText] = React.useState(null)
    const [isReviewable, setIsReviewable] = React.useState(false)

    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      getClass()
      getNotif()
      navigation.setParams({notif: () => setNotifVisible(true) })
      wait(1000).then(() => setRefreshing(false))
    }, [])

    const getClass = () => {
      setLoading(true)
      axios.get(`https://dev.akademis.id/api/class/${id}`)
        .then( res => {
          const reviews = res.data.data.reviews
          const dateEnd = new Date(res.data.data.date_end)
          const today = new Date()
          var sumRating = 0;

          reviews.forEach( el => sumRating += parseFloat(el.kualitas) )


          setData(res.data.data)
          setTeacher(res.data.data.teacher)
          setSession(res.data.data.sesi)          
          if (reviews.length > 0) setRating(sumRating/reviews.length)
          if (dateEnd - today <= 0) setIsReviewable(true)

          getReview()
            .then(() => setLoading(false) )
            .catche( e => console.log(e) )
        })
        .catch( e => {console.log(e), setLoading(false) })
    }

    const getReview = () => {
      return new Promise( (resolve, reject) => {
        axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
        .then( res => {
          axios.get(`https://dev.akademis.id/api/review?event_id=${id}`)
            .then( res1 => {
              console.log(res1.data.data)
              if (res1.data.data.some( ({user_email}) => (res.data.data.email == user_email) ) ) setIsReviewable(false)
              resolve()
            })
            .catch(e => {
              console.log(e)
              reject() 
            })
        })
        .catch(e => {
          console.log(e)
          reject()
        })
      })
    }

    const getNotif = () => {
      axios.get(`https://dev.akademis.id/api/notif?event_id=${id}`)
        .then( res => {
          console.log(res.data.data.data)
          let arr = []

          res.data.data.data.forEach( element => arr.push(element.notif) )
          setNotifList(arr)
        })
        .catch( e => consol.log(e) )
    }

    const postQuestion = () => {
      axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
        .then( res => {
          axios.post('https://dev.akademis.id/api/tanya',{
            "user_email": res.data.data.email,
            "event_id": id,
            "pertanyaan": questionText
          })
            .then( res1 => {
              console.log(res1)
              Alert.alert("Sukses", "Pertanyaan berhasil diunggah")
              setQuestionVisible(false)
            })
        })
        .catch(e => {
          console.log(e)
          Alert.alert("Gagal", "Pertanyaan gagal diunggah")
          setQuestionVisible(false)
        })
    }

    const postReview = () => {
      axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
        .then( res => {
          axios.post('https://dev.akademis.id/api/review',{
            "user_email": res.data.data.email,
            "event_id": id,
            "teacher_id": teacher.id,
            "kualitas": myRating,
            "kritik": kritik
          })
            .then( res1 => {
              console.log(res1)
              Alert.alert("Sukses", "Penilaian berhasil diunggah")
              navigation.goBack()
            })
            .catch(e => console.log(e) )
        })
        .catch(e => {
          console.log(e)
          Alert.alert("Gagal", "Penilaian gagal diunggah, silakan coba lagi")
        })
    }

    React.useEffect( () => {
      getClass()
      getNotif()
      navigation.setParams({notif: () => setNotifVisible(true) })
    }, [])

    if (loading === true) return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
        <ActivityIndicator size="large" color="black"/>
      </View>
    )
    else return (
      <View style={[{flex: 1}, styles.bgAll]}>
        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{flexGrow: 1,}}>

          {/* Notif */}
          <Overlay
            animationType="fade"
            fullscreen={false}
            isVisible={notifVisible}
            onRequestClose={() => {
              setNotifVisible(false)
            }}
            overlayStyle={styles.overlay}>
            <View style={styles.centeredView}>
              <TouchableOpacity onPress={() => setNotifVisible(false)} style={{position: 'absolute', top: 10, right: 10}}>
                <FontAwesomeIcon name='close' size={35} color='white'/>
              </TouchableOpacity>
              <View style={{
                width: Dimensions.get('window').width*0.8, 
                backgroundColor: 'white',
                elevation: 5,
                alignSelf: 'center',
                alignItems: 'center',
                margin: 20,
                borderRadius: 25,
                overflow: 'hidden',
                flex: 0.4
                }}
              >
                <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%'}}>
                  <Text style={[styles.bigWhiteText, {margin: 10, left: 15}]}>Notifications</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: Dimensions.get('window').width*0.8, alignItems: 'center', padding: 20}}>
                  {(notifList.length == 0) ? 
                    <Text style={{fontSize: 17}}> Belum ada notifikasi dari guru mu </Text> 
                    :
                    notifList.map( (value, index) => 
                      <View style={{borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 0.5, borderRadius: 25, width: RFValue(270), paddingVertical: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{fontSize: 17}} key={index}>{value}</Text>
                      </View>
                    )
                  } 
                </ScrollView>
              </View>
            </View>
          </Overlay>

          {/* Question to Teachers */}
          <Overlay
            animationType="fade"
            fullscreen={true}
            isVisible={questionVisible}
            onRequestClose={() => {
              setQuestionVisible(false)
            }}
            overlayStyle={styles.overlay}
          >
            <View style={{position: 'absolute', left: 0, right: 0, top: 0, justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <TouchableOpacity onPress={() => setQuestionVisible(false)} style={{position: 'absolute', top: 10, right: 10}}>
                <FontAwesomeIcon name='close' size={35} color='white'/>
              </TouchableOpacity>
              <View style={{
                width: Dimensions.get('window').width*0.8, 
                backgroundColor: 'white',
                elevation: 5,
                alignSelf: 'center',
                alignItems: 'center',
                margin: 20,
                borderRadius: 25,
                overflow: 'hidden',
                flex: 0.25,
                position: 'absolute',
                top: Dimensions.get('window').height*0.25
                }}
              >
                <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%', justifyContent: 'center'}}>
                  <Text style={[styles.mediumWhiteText, {fontSize: RFValue(16), alignSelf: 'center', }]}>Beri pertanyaan pada gurumu!</Text>
                </View>
                <View style={{ width: Dimensions.get('window').width*0.8, alignItems: 'center'}}>
                  <TextInput 
                    style={{fontSize: 16, padding: 20, height: 100, width: '90%', borderColor: 'lightgray', borderWidth: 1, borderRadius: 15, margin: 25}}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text) => setQuestionText(text)}
                    value={questionText}
                    placeholder="  Isi pertanyaanmu di sini"
                  />
                  <TouchableOpacity 
                    style={(questionText) ? [styles.button, {width: RFValue(270)}] : [styles.disabledButton, {width: RFValue(270)}]} 
                    disabled={(questionText) ? false : true} 
                    onPress={() => postQuestion() }>
                    <Text style={styles.buttonText}>Unggah Pertanyaan</Text>
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
            overflow: 'hidden',
            }}
          >
            <ImageBackground source={vcImage} style={styles.backgroundImage} />
          </View>

          <Text style={{left: 20, fontSize: 22, marginTop: 10}}>Informasi Kelas</Text>
          <View style={styles.horizontalRuler}/>

          <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
            <Text style={styles.leftMediumText}>Nama Kelas : {"\n"}
              <Text style={styles.leftSmallText}>{data.judul}</Text>
            </Text>
            <Text style={styles.leftMediumText}>Kategori : {"\n"}
              <Text style={styles.leftSmallText}>{data.kategori}</Text>
            </Text>
            <Text style={styles.leftMediumText}>Pelajaran : {"\n"}
              <Text style={styles.leftSmallText}>{data.pelajaran}</Text>
            </Text>
            <Text style={styles.leftMediumText}>Tanggal : {"\n"}
              <Text style={styles.leftSmallText}>{dateFormat(data.date_start)} hingga {dateFormat(data.date_end)}</Text>
            </Text>
            <Text style={styles.leftMediumText}>Deskripsi : {"\n"}
              <Text style={styles.leftSmallText}>{data.deskripsi}</Text>
            </Text>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <Text style={styles.leftMediumText}>Harga : {data.harga}{"   "}</Text>
              <Image source={diamond} style={{width: 22, height: 22}}/>
            </View>
          </View>

          <Text style={styles.sectionText}>Sesi Live Teaching</Text>
          <View style={styles.horizontalRuler}/>

          <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
            <Table style={{marginHorizontal: 10}}>
              <Row data={['Tanggal', 'Waktu', 'Link']} textStyle={{fontSize: 17, margin: 2.5}}/>
              {session.map( (value, index) =>
                <TouchableOpacity onPress={() => Linking.openURL(value.link)}>
                  <Row data={[dateFormat(value.tanggal), String(value.time_start) + " - " + String(value.time_end), value.link]} key={index} textStyle={{fontSize: 15, margin: 2.5, color:'grey'}}/>
                </TouchableOpacity>
              )}
            </Table>
          </View>

          <Text style={styles.sectionText}>Tentang Gurumu</Text>
          <View style={styles.horizontalRuler}/>

          <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
            <Text style={styles.leftMediumText}>Nama Guru : {"\n"}
              <Text style={styles.leftSmallText}>{teacher.nama}</Text>
            </Text>
            <Text style={styles.leftMediumText}>Rating Guru : {"\n"}
              <Text style={styles.leftSmallText}>{(rating) ? rating.toFixed(1) : "Masih belum ada rating"}</Text>
            </Text>
            <Text style={styles.leftMediumText}>About me : {"\n"}
              <Text style={styles.leftSmallText}>{teacher.deskripsi}</Text>
            </Text>
          </View>

          { (isReviewable) ?
            <View>
              <Text style={styles.sectionText}>Berikan penilaian mu!</Text>
              <View style={styles.horizontalRuler}/>

              <TextInput 
                style={{fontSize: 16, padding: 20, height: 100, width: '90%', borderColor: 'lightgray', borderWidth: 1, borderRadius: 15, margin: 20}}
                multiline={true}
                numberOfLines={2}
                onChangeText={(text) => setKritik(text)}
                value={kritik}
                placeholder="Isi saran dan kritikmu di sini"
              />
              <Stars
                default={0}
                count={5}
                starSize={50}
                update={ (value) => setMyRating(value) }
                fullStar={<MaterialIcon name={'star'} size={50} color={theme.PRIMARY_ACCENT_COLOR}/>}
                emptyStar={<MaterialIcon name={'star-border'} size={50} color={theme.PRIMARY_ACCENT_COLOR}/>}
                halfStar={<MaterialIcon name={'star-half'} size={50} color={theme.PRIMARY_ACCENT_COLOR}/>}
              />

              <View style={{margin: 20, alignItems: 'center'}}>
                <TouchableOpacity 
                  style={(kritik == null || myRating == null) ? styles.disabledButton : styles.button} 
                  disabled={ (kritik == null || myRating == null) ? true : false} 
                  onPress={() => postReview() }>
                  <Text style={styles.buttonText}>Unggah Penilaian</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <View style={{marginVertical: 20}} />
        }
        </ScrollView>
        <View style={{position: 'absolute', right: 25, bottom: 25, height: 65, width: 65, borderRadius: 75, overflow: 'hidden', elevation: 8}}>
          <TouchableHighlight 
              activeOpacity={0.5}
              underlayColor='white'
              onPress={() => setQuestionVisible(true) }
              style={{ height: 65, width: 65}}
            >
              <View style={{height: 65, width: 65, backgroundColor: theme.PRIMARY_DARK_COLOR, justifyContent: 'center', alignItems: 'center'}} >
                  <MaterialIcon name='question-answer' size={35} color='white'/>
              </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  },
]
          