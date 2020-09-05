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
  Modal,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Stars from 'react-native-stars';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'react-native-axios';
import { Table, Row, Rows } from 'react-native-table-component';

//Context
import { AuthContext } from '../components/Context.js'

//Styles
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

var items = [
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
    const { authState } = React.useContext(AuthContext)
    const [subjectPicker, setSubject] = React.useState("")
    const [availableClasses, setAvailableClasses] = React.useState([])

    const getClasses = () => {
      axios.get('https://dev.akademis.id/api/class')
        .then( res => {
          var arr = res.data.data.data
          axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
            .then ( res1 => {
              axios.get(`https://dev.akademis.id/api/myclass?user_email=${res1.data.data.email}`)
                .then( res2 => {
                  let arrChecker = []
                  res2.data.data.data.forEach( ({ id_event }) => arrChecker.push(id_event) )

                  setAvailableClasses(arr.filter( ({ id }) => (!arrChecker.some( (element) => (element == id) ) ) ) )
                })
          })
        })
        .catch( e => console.log(e) )
    }

    React.useEffect( () => {
      getClasses()
    }, [])

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
            <Picker.Item label={"sbmptn"} value={"sbmptn"}/>
          </Picker>
        </View>

        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Virtual Class</Text>

        {availableClasses.filter( ({ kategori }) => (subjectPicker === "") ? true : (kategori === subjectPicker))
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details VC', {...value})} key={index}>
                <View style={styles.mediumCardWithDesc}>
                  <View style={{height: 50, flexDirection: 'row', backgroundColor: theme.PRIMARY_DARK_COLOR}}>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', left: 15}}>{value.judul}</Text>
                    <View style={{flexDirection: 'row', alignItems:'center', alignSelf: 'center', position: 'absolute', right: 15}}>
                      <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
                      <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.harga}</Text>
                    </View>
                  </View>
                  <Text style={styles.leftSmallText}>Kategori : {value.kategori}</Text>                
                  <Text style={styles.leftSmallText}>Pelajaran : {value.pelajaran}</Text>                
                  <Text style={styles.leftSmallText}>Kapasistas : {value.kapasitas}</Text>
                  <Text style={styles.leftSmallText}>Tanggal : {value.date_start} hingga {value.date_end}</Text>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (availableClasses.find( ({ kategori }) => (subjectPicker === "") ? true : (kategori === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Text style={{fontSize: 20}}>Maaf, tidak ada kelas yang tersedia</Text>
          </View>
      }
      </ScrollView>
    )
  },
  //My Class
  ({navigation}) => {
    const { authState } = React.useContext(AuthContext)
    const [subjectPicker, setSubject] = React.useState("")
    const [availableClasses, setAvailableClasses] = React.useState([])

    const getMyClasses = () => {
      axios.get('https://dev.akademis.id/api/class')
        .then( res => {
          var arr = res.data.data.data
          axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
            .then ( res1 => {
              axios.get(`https://dev.akademis.id/api/myclass?user_email=test1@gmail.com`)
                .then( res2 => {
                  let arrChecker = []
                  res2.data.data.data.forEach( ({ id_event }) => arrChecker.push(id_event) )

                  setAvailableClasses(arr.filter( ({ id }) => arrChecker.some( (element) => (element == id) ) ) )
                })
          })
        })
        .catch( e => console.log(e) )
    }

    React.useEffect( () => {
      getMyClasses()
    }, [])

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
            <Picker.Item label={"sbmptn"} value={"sbmptn"}/>
          </Picker>
        </View>

        <View style={styles.horizontalRuler}/>
        <Text style={{left: 20, fontSize: 22, marginBottom: 20}}>Pilih Virtual Class</Text>

        {availableClasses.filter( ({ kategori }) => (subjectPicker === "") ? true : (kategori === subjectPicker))
          .map( (value, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details Paid VC', {...value})} key={index}>
                <View style={styles.mediumCardWithDesc}>
                  <View style={{height: 50, flexDirection: 'row', backgroundColor: theme.PRIMARY_DARK_COLOR}}>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', left: 15}}>{value.judul}</Text>
                    <View style={{flexDirection: 'row', alignItems:'center', alignSelf: 'center', position: 'absolute', right: 15}}>
                      <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
                      <Text style={{fontSize: 17, color: 'white'}}>{" "}{value.harga}</Text>
                    </View>
                  </View>
                  <Text style={styles.leftSmallText}>Kategori : {value.kategori}</Text>                
                  <Text style={styles.leftSmallText}>Pelajaran : {value.pelajaran}</Text>                
                  <Text style={styles.leftSmallText}>Kapasistas : {value.kapasitas}</Text>
                  <Text style={styles.leftSmallText}>Tanggal : {value.date_start} hingga {value.date_end}</Text>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (availableClasses.find( ({ kategori }) => (subjectPicker === "") ? true : (kategori === subjectPicker) ) ) ?
          null 
        :
          <View style={styles.centeredView}>
            <Text style={{fontSize: 20}}>Maaf, tidak ada kelas yang tersedia</Text>
          </View>
      }
      </ScrollView>
    )
  },
  //Details
  ({ route, navigation }) => {
    const { id } = route.params
    const [myRating, setMyRating] = React.useState(0)
    const [data, setData] = React.useState({})
    const [teacher, setTeacher] = React.useState({})
    const [session, setSession] = React.useState([])
    const [rating, setRating] = React.useState(null)

    const getClass = () => {
      axios.get(`https://dev.akademis.id/api/class/${id}`)
        .then( res => {
          const reviews = res.data.data.reviews
          var sumRating = 0;

          reviews.forEach( el => sumRating += parseFloat(el.kualitas) )

          setData(res.data.data)
          setTeacher(res.data.data.teacher)
          setSession(res.data.data.sesi)
          if (reviews.length > 0) setRating(sumRating/reviews.length)
        })
        .catch( e => console.log(e) )
    }

    React.useEffect( () => {
      getClass();
    }, [])

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

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
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
            <Text style={styles.leftSmallText}>{data.date_start} hingga {data.date_end}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Deskripsi : {"\n"}
            <Text style={styles.leftSmallText}>{data.deskripsi}</Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={styles.leftMediumText}>Harga : {data.harga}{"   "}</Text>
            <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
          </View>
        </View>

        <Text style={styles.sectionText}>Sesi Live Teaching</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
          <Table style={{marginHorizontal: 10}}>
            <Row data={['Tanggal', 'Waktu', 'Link']} textStyle={{fontSize: 17, margin: 2.5}}/>
            {session.map( (value, index) =>
              <Row data={[value.tanggal, String(value.time_start) + " - " + String(value.time_end), 'Locked']} key={index} textStyle={{fontSize: 15, margin: 2.5, color:'grey'}}/>
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
            <Text style={styles.leftSmallText}>{(rating) ? rating : "Masih belum ada rating"}</Text>
          </Text>
          <Text style={styles.leftMediumText}>About me : {"\n"}
            <Text style={styles.leftSmallText}>{teacher.deskripsi}</Text>
          </Text>
        </View>

        <Text style={styles.sectionText}>Metode Pembayaran</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{margin: 20, alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={ () => {
              Alert.alert("Sukses", "Pembayaran berhasil")
              navigation.goBack()
          }}>
            <Text style={styles.buttonText}>Beli dengan diamond</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={ () => {
              Alert.alert("Sukses", "Pembayaran berhasil")
              navigation.goBack()
          }}>
            <Text style={styles.buttonText}>Beli via share ke media sosial</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  },
  //Details Paid Class
  ({ route, navigation }) => {
    const { id } = route.params
    const [myRating, setMyRating] = React.useState(0)
    const [data, setData] = React.useState({})
    const [teacher, setTeacher] = React.useState({})
    const [session, setSession] = React.useState([])
    const [rating, setRating] = React.useState(null)
    const [notifVisible, setNotifVisible] = React.useState(false);

    const getClass = () => {
      axios.get(`https://dev.akademis.id/api/class/${id}`)
        .then( res => {
          const reviews = res.data.data.reviews
          var sumRating = 0;

          reviews.forEach( el => sumRating += parseFloat(el.kualitas) )

          setData(res.data.data)
          setTeacher(res.data.data.teacher)
          setSession(res.data.data.sesi)
          if (reviews.length > 0) setRating(sumRating/reviews.length)
        })
        .catch( e => console.log(e) )
    }

    const _notif = () => setNotifVisible(true)

    React.useEffect( () => {
      getClass()
      navigation.setParams({notif: _notif})
    }, [])

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1,}}>

        <Modal
          animationType="fade"
          transparent={true}
          visible={notifVisible}
          onRequestClose={() => {
            setNotifVisible(false)
          }}
        >
          <View style={styles.centeredView}>
            <View style={{
              width: Dimensions.get('window').width*0.8, 
              backgroundColor: 'white',
              elevation: 5,
              alignSelf: 'center',
              alignItems: 'center',
              margin: 20,
              borderRadius: 25,
              overflow: 'hidden'
              }}
            >
              <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%'}}>
                <Text style={[styles.bigWhiteText, {margin: 10}]}>Notifications</Text>
              </View>
              <View style={{height: 100}} />
            </View>
          </View>
        </Modal>

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

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
          <Text style={styles.leftMediumText}>Kategori : {"\n"}
            <Text style={styles.leftSmallText}>{data.kategori}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Pelajaran : {"\n"}
            <Text style={styles.leftSmallText}>{data.pelajaran}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Tanggal : {"\n"}
            <Text style={styles.leftSmallText}>{data.date_start} hingga {data.date_end}</Text>
          </Text>
          <Text style={styles.leftMediumText}>Deskripsi : {"\n"}
            <Text style={styles.leftSmallText}>{data.deskripsi}</Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Text style={styles.leftMediumText}>Harga : {data.harga}{"   "}</Text>
            <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
          </View>
        </View>

        <Text style={styles.sectionText}>Sesi Live Teaching</Text>
        <View style={styles.horizontalRuler}/>

        <View style={{width: Dimensions.get('window').width*0.95, alignSelf: 'center'}}>
          <Table style={{marginHorizontal: 10}}>
            <Row data={['Tanggal', 'Waktu', 'Link']} textStyle={{fontSize: 17, margin: 2.5}}/>
            {session.map( (value, index) =>
              <Row data={[value.tanggal, String(value.time_start) + " - " + String(value.time_end), value.link]} key={index} textStyle={{fontSize: 15, margin: 2.5, color:'grey'}}/>
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
            <Text style={styles.leftSmallText}>{(rating) ? rating : "Masih belum ada rating"}</Text>
          </Text>
          <Text style={styles.leftMediumText}>About me : {"\n"}
            <Text style={styles.leftSmallText}>{teacher.deskripsi}</Text>
          </Text>
        </View>

        <Text style={styles.sectionText}>Berikan penilaian mu!</Text>
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
          <TouchableOpacity style={styles.button} onPress={() => {
              Alert.alert("Sukses", "Penilaian berasil diunggah")
              navigation.goBack()
          }}>
            <Text style={styles.buttonText}>Unggah Penilaian</Text>
          </TouchableOpacity>
        </View>

        {(notifVisible) ? <View style={styles.overlay}/> : null}

      </ScrollView>
    )
  },
]
          