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
  ActivityIndicator
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
import { useIsFocused } from '@react-navigation/native'

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
import purchaseToImage from '../assets/images/purchase-to-bg-gelap.png'
import buySuccessImage from '../assets/images/pembelian-sukses-bg-terang.png'

export default [
  //Catalogue
  ({navigation}) => {
    const { authState } = React.useContext(AuthContext)

    const [subjectPicker, setSubject] = React.useState("")
    const [availTryouts, setAvailTryouts] = React.useState([])
    const isFocused = useIsFocused()

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
              var arr = res.data.data.data
              setAvailTryouts(arr.filter( ({ id }) => (!arrChecker.some( (element) => (element == id) ) ) ) )

              console.log("TRYOUT RESPONSE: ")
              console.log(res.data.data.data)
            })
        })
        .catch(e => console.log(e) )
    }

    React.useEffect( () => {
      getTryouts()
    }, [isFocused])

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
      { (availableTryouts.find( ({ subject }) => (subjectPicker === "") ? true : (subject === subjectPicker) ) ) ?
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
    const isFocused = useIsFocused()
    const [subjectPicker, setSubject] = React.useState("")
    const [availTryouts, setAvailTryouts] = React.useState([])
    const { authState } = React.useContext(AuthContext)

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
      <ScrollView contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>
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
              <TouchableOpacity onPress={() => navigation.navigate('Details Unfinished Tryout', {...value.tryout})} key={index}>
                <View style={styles.smallCard}>
                  <View style={{flex: 0.25, backgroundColor: theme.PRIMARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    {/* Belum tau mo isi apa */}
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center'}}>
                    <Text style={styles.leftSmallMediumText}>{value.tryout.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
        })
      }
      { (unfinishedTryouts.find( ({ tryout }) => (subjectPicker === "") ? true : (tryout.name.toLowerCase().includes(subjectPicker) ) ) ) ?
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
              <TouchableOpacity onPress={() => navigation.navigate('Details Finished Tryout', {...value})} key={index}>
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
      { (finishedTryouts.find( ({ tryout }) => (subjectPicker === "") ? true : (tryout.name.toLowerCase().includes(subjectPicker) ) ) ) ?
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

    const [tests, setTests] = React.useState([])
    const [subTests, setSubTests] = React.useState([[], []])
    const [activeSections, setActiveSections] = React.useState([])
    const [buySuccessModal, setBuySuccessModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [buktiFollow, setFollow] = React.useState(null)
    const [buktiTag, setTag] = React.useState(null)
    const [buktiShare, setShare] = React.useState(null)
    const [shareModal, setShareModal] = React.useState(false)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const openGallery = () =>{
      const options = {
        title: 'Select photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
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

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        return source.uri
      }
    })}

    const shareTryout = () => {
      axios.post(`https://dev.akademis.id/api/share`, {
        "user_id": authState?.userToken,
        "follow": buktiFollow,
        "tag": buktiTag,
        "share": buktiShare,
        "status": "not verified"
      })
        .then(res => {
          console.log(res)

          setShareModal(false)
          setFollow(null)
          setTag(null)
          setShare(null)
          Alert.alert("Berhasil", "Pembelian dengan metode share berhasil, tunggu verifikasi dari tim kami ya")
        })
        .catch(e => console.log(e))
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
        .catch(e => {console.log(e.response), setLoading(false) } )
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

          setLoading(false)
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
      <ScrollView contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>
        {/* Modal share method */}
        <Overlay
          animationType="fade"
          fullscreen={false}
          isVisible={modal}
          onRequestClose={() => {
            setModal(false)
          }}
          overlayStyle={styles.overlay}
        >
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
            <View style={{
              width: Dimensions.get('window').width*0.8, 
              backgroundColor: 'white',
              elevation: 5,
              alignSelf: 'center',
              alignItems: 'center',
              margin: 20,
              borderRadius: 25,
              overflow: 'hidden',
              flex: 0.75
              }}
            >
              <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%'}}>
                <Text style={[styles.bigWhiteText, {margin: 10, left: 15}]}>Konfirmasi Sharing</Text>
              </View>
              <View style={{height: '100%', width: '100%', padding: 20}}>

                <Text style={{fontSize: RFValue(18)}}>Tryout yg ingin dibeli: </Text>
                <Text style={{fontSize: 16, color: 'gray', marginBottom: 15}}>{name}</Text>

                <Text style={{fontSize: RFValue(18), marginBottom: 10}}>Unggah Bukti Follow: </Text>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 15}}>
                  <TouchableOpacity style={{backgroundColor: 'white', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 1, padding: RFValue(12), width: '65%', borderRadius: 20}} 
                    onPress={() => {setFollow(openGallery() )}}>
                    <Text style={{fontSize: RFValue(15), alignSelf: 'center'}}>Unggah Foto</Text>
                  </TouchableOpacity>
                  {buktiFollow && <FontAwesomeIcon name={"check-square-o"} size={30} color={theme.SECONDARY_DARK_COLOR} style={{marginLeft: RFValue(15)}}/>}
                </View>

                <Text style={{fontSize: RFValue(18), marginBottom: 10}}>Unggah Bukti Tag: </Text>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 15}}>
                  <TouchableOpacity style={{backgroundColor: 'white', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 1, padding: RFValue(12), width: '65%', borderRadius: 20}} 
                    onPress={() => {setTag(openGallery() )}}>
                    <Text style={{fontSize: RFValue(15), alignSelf: 'center'}}>Unggah Foto</Text>
                  </TouchableOpacity>
                  {buktiTag && <FontAwesomeIcon name={"check-square-o"} size={30} color={theme.SECONDARY_DARK_COLOR} style={{marginLeft: RFValue(15)}}/>}
                </View>

                <Text style={{fontSize: RFValue(18), marginBottom: 10}}>Unggah Bukti Share: </Text>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 15}}>
                  <TouchableOpacity style={{backgroundColor: 'white', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 1, padding: RFValue(12), width: '65%', borderRadius: 20}} 
                    onPress={() => {setShare(openGallery() )}}>
                    <Text style={{fontSize: RFValue(15), alignSelf: 'center'}}>Unggah Foto</Text>
                  </TouchableOpacity>
                  {buktiShare && <FontAwesomeIcon name={"check-square-o"} size={30} color={theme.SECONDARY_DARK_COLOR} style={{marginLeft: RFValue(15)}}/>}
                </View>

                <TouchableOpacity 
                  style={(buktiFollow && buktiShare && buktiTag) ? [styles.button, {width: '90%', marginTop: RFValue(30)}] : [styles.disabledButton, {width: '90%', marginTop: RFValue(30)}]} 
                  onPress={ () => shareTryout()} 
                  disabled={(buktiFollow && buktiShare && buktiTag) ? false : true}>
                  <Text style={styles.buttonText}>Beli Tryout!</Text>
                </TouchableOpacity>
              </View>
            </View>
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
          <TouchableOpacity style={styles.button} onPress={ () => {
              setBuySuccessModal(true)
          }}>
            <Text style={styles.buttonText}>Beli via share ke media sosial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  },
  //Details Unfinished Tryout
  ({route, navigation}) => {
    const { id, name, price, start_at, end_at } = route.params
    const { authState } = React.useContext(AuthContext)
    
    const [loading, setLoading] = React.useState(false)

    const [tests, setTests] = React.useState([])
    const [subTests, setSubTests] = React.useState([[], []])
    const [isFinished, setIsFinished] = React.useState([{id: 0, finished: true}])
    const [activeSections, setActiveSections] = React.useState([])
    const [buySuccessModal, setBuySuccessModal] = React.useState(false)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const getData = () => {
      setLoading(true)
      axios.get(`https://dev.akademis.id/api/tryout/${id}`)
        .then(res => {
          var arr = res.data.data.test
          var newArr = []

          arr.forEach( (element) => {
            newArr.push(element.subtest)
          })

          var arrIsFinished = [{id: 0, finished: true}]

          newArr.forEach(element => {
            element.map( (value) => {
              axios.get(`https://dev.akademis.id/api/answer?user_id=${authState?.userToken}&soal_id=${value.id}`)
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
                })
                .catch(e => console.log(e) )
            })
          })
            
          setTests(arr)
          setSubTests(newArr)

          console.log(arrIsFinished)
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

    const _renderContent = (sections, index) => (
        subTests[index].map( (value) => (
          <View style={{marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderColor: theme.SECONDARY_DARK_COLOR, borderRadius: 15, borderWidth: 0.5, padding: 5}}>
            <Text style={{fontSize: RFValue(15) }}>{value.name}</Text>
            <Text style={{fontSize: RFValue(14), color: 'gray' }}>Waktu : {value.time} menit</Text>

            { (isFinished.find( ( { id, finished } ) => (value.id == id && !finished) ) ) ?
              <TouchableOpacity 
                style={[styles.button, {marginTop: 20}]} 
                onPress={() => { navigation.navigate('Conduct Tryout', {...value})}} >
                  <Text style={styles.buttonText}>Mulai Subtest</Text>
              </TouchableOpacity>
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
      getData()
    }, [])

    if (loading === true) return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="black"/>
      </View>
    )
    else return (
      <ScrollView contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>

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
          containerStyle={{width: RFValue(320), alignSelf: 'center', borderRadius: 20, overflow: 'hidden', marginTop: RFValue(10), marginBottom: RFValue(30) }}
        />

      </ScrollView>
    )
  },
  //Details Finished Tryout
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
            <TouchableOpacity 
              style={[styles.button, {marginTop: 20}]} 
              onPress={() => { navigation.navigate('Conduct Tryout', {...value})}} >
                <Text style={styles.buttonText}>Lihat Pembahasan</Text>
            </TouchableOpacity>
          </View>
        ) )
    )

    React.useEffect(() => {
      getData()
    }, [])

    return (
      <ScrollView contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>

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
          containerStyle={{width: RFValue(320), alignSelf: 'center', borderRadius: 20, overflow: 'hidden', marginTop: RFValue(10), marginBottom: RFValue(30) }}
        />

      </ScrollView>
    )
  }
]