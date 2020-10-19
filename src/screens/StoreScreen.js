import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from "react-native-responsive-fontsize";
import { AuthContext } from '../components/Context.js'
import { Overlay } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';
import axios from 'react-native-axios';
import RNFetchBlob from 'rn-fetch-blob'
import { WebView } from 'react-native-webview';

//Importing style
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

//Importing images
import diamond from '../assets/icons/diamond-currency.png'
import diamond2 from '../assets/icons/diamond-2-revised.png'
import diamond3 from '../assets/icons/diamond-3-revised.png'
import diamond5 from '../assets/icons/diamond-5-revised.png'
import diamond8 from '../assets/icons/diamond-8-revised.png'
import diamond10 from '../assets/icons/diamond-10-revised.png'
import diamond20 from '../assets/icons/diamond-20-revised.png'
import diamond30 from '../assets/icons/diamond-30-revised.png'
import diamond40 from '../assets/icons/diamond-40-revised.png'
import diamond80 from '../assets/icons/diamond-80-revised.png'
import diamond100 from '../assets/icons/diamond-100-revised.png'

export default ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [posY, setPosY] = React.useState(0)
  const [storeId, setStoreId] = React.useState(0)
  // const [diamondBuy, setDiamondBuy] = React.useState(0)
  // const [diamondPrice, setDiamondPrice] = React.useState(0)
  // const [modal, setModal] = React.useState(false)
  // const [paymentMethod, setPaymentMethod] = React.useState('')
  // const [buktiBayar, setBuktiBayar] = React.useState(null)
  const [isWebView, setIsWebView] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const { authState } = React.useContext(AuthContext)

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    })
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getMyDiamond()
    wait(1000).then(() => setRefreshing(false))
  }, [])

  const openCamera = () =>{
    const options = {
      title: 'Select photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.6
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // setBuktiBayar(source.uri)
        // console.log(response.uri)
        setBuktiBayar(response)
    }
  })}

  const items = [
    {
      id: 1,
      value: 2,
      name: "Paket Biasa",
      harga: "Rp10.000",
      image: diamond2,
    },
    {
      id: 2,
      value: 3,
      name: "Paket Biasa+",
      harga: "Rp12.000",
      image: diamond3,
    },
    {
      id: 3,
      value: 5,
      name: "Paket Belajar",
      harga: "Rp22.000",
      image: diamond5,
    },
    {
      id: 4,
      value: 8,
      name: "Paket Belajar+",
      harga: "Rp35.000",
      image: diamond8,
    },
    {
      id: 5,
      value: 10,
      name: "Paket Latihan",
      harga: "Rp45.000",
      image: diamond10,
    },
    {
      id: 6,
      value: 20,
      name: "Paket Latihan+",
      harga: "Rp90.000",
      image: diamond20,
    },
    {
      id: 7,
      value: 30,
      name: "Paket IMBA",
      harga: "Rp135.000",
      image: diamond30,
    },
    {
      id: 8,
      value: 40,
      name: "Paket IMBA+",
      harga: "Rp185.000",
      image: diamond40,
    },
    {
      id: 9,
      value: 80,
      name: "Paket Luar Biasa",
      harga: "Rp375.000",
      image: diamond80,
    },
    {
      id: 10,
      value: 100,
      name: "Paket Istimewa",
      harga: "Rp450.000",
      image: diamond100,
    },
  ]

  const getMyDiamond = () => {
    setLoading(true)
    axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
      .then( res => {
        _setDiamond(res.data.data.diamond)
          .then( () => setLoading(false) )
          .catch( e => {console.log(e), setLoading(false) })
      })
      .catch( e => {console.log(e), setLoading(false) })
  }

  const buyDiamond = (id) => {
    // setLoading(true)

    // const formData = new FormData()

    // formData.append('store_id', id)
    // formData.append('user_id', authState?.userToken)
    // formData.append('method', paymentMethod)
    // formData.append('status', "not verified")
    // formData.append('payment', buktiBayar.data)

    // // RNFetchBlob.fetch('POST', 'https://dev.akademis.id/api/checkout', {
    // //     // dropbox upload headers
    // //     'Content-Type': 'multipart/form-data'
    // //     // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
    // //     // Or simply wrap the file path with RNFetchBlob.wrap().
    // // }, [
    // //     // element with property `filename` will be transformed into `file` in form data
    // //     // custom content type
    // //   { name: 'payment', type: 'image/jpeg', filename: 'image.jpg', data: RNFetchBlob.wrap(buktiBayar.uri) },
    // //   { name: 'store_id', data: id }, 
    // //   { name: 'user_id', data: authState?.userToken }, 
    // //   { name: 'status', data: "not verified" }, 
    // //   { name: 'method', data: paymentMethod }, 
    // // ]).then((res) => {
    // //   console.log("BERHASIL")
    // //   console.log(res)

    // //   setBuktiBayar(null)
    // //   setPaymentMethod(null)
    // //   Alert.alert("Berhasil", "Pembelian berhasil, tunggu verifikasi dari tim kami ya")
    // //   setModal(false)
    // //   setLoading(false)
    // // })
    // // .catch((err) => {
    // //   // error handling ..
    // //   console.log("FORM DATA ERROR")
    // //   console.log(error)

    // //   setLoading(false)
    // // })

    // fetch('https://dev.akademis.id/api/checkout',{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     body: formData
    //   })
    //   .then((response) => {
    //     console.log("BERHASIL") 
    //     console.log(response)

    //     setBuktiBayar(null)
    //     setPaymentMethod(null)
    //     Alert.alert("Berhasil", "Pembelian berhasil, tunggu verifikasi dari tim kami ya")
    //     setModal(false)
    //     setLoading(false)
    //   })
    //   .catch((error) => {
    //     console.log("FORM DATA ERROR")
    //     console.log(error.response)

    //     setLoading(false)
    //   })

    // // axios.post(`https://dev.akademis.id/api/checkout`,{
    // //   "store_id": id,
    // //   "user_id": authState?.userToken,
    // //   "method": paymentMethod,
    // //   "status": "not verified",
    // //   "payment": buktiBayar
    // // })
    // //   .then(res => {
    // //     console.log(res) 

    // //     setBuktiBayar(null)
    // //     setPaymentMethod(null)
    // //     Alert.alert("Berhasil", "Pembelian berhasil, tunggu verifikasi dari tim kami ya")
    // //     setModal(false)
    // //     setLoading(false)
    // //   })
    // //   .catch(e => {console.log("ERROR DI BELI DIAMOND"), console.log(e.response.data), setLoading(false)})
  }

  const _renderItem = ({item}) => (
      <TouchableOpacity 
        onPress={() => {
          setStoreId(item.id)
          setIsWebView(true)
          }}>
          <View style={styles.squareCard}>
            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={item.image} style={{width: RFValue(90), height: RFValue(90), marginTop: RFValue(15)}}/>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Text style={{fontSize: 15, color: 'gray'}}>{item.value}</Text>
                <Image source={diamond} style={{width: 18, height: 18}}/>
              </View>
            </View>
            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: RFValue(14)}}>{item.name}</Text>
              <Text style={{fontSize: RFValue(14), color: 'gray'}}>{item.harga}</Text>
            </View>
          </View>
      </TouchableOpacity>
  )

  const handleScroll = (e) => {
    const THRESHOLD = 64
    const moveY = posY - e.nativeEvent.contentOffset.y
    setPosY(e.nativeEvent.contentOffset.y)
    // console.log(moveY)
    
    if (moveY < -THRESHOLD) {
      navigation.setOptions({
        tabBarVisible: false
      })
    } else if (moveY > THRESHOLD){
      navigation.setOptions({
        tabBarVisible: true
      })
    }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect( () => {
    getMyDiamond()
    requestCameraPermission()
  }, [])

  if (loading === true) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  ) 
  else if (isWebView) return (
    <View style={{flex: 1}}>
      <WebView source={{ uri: `https://akademis.id/payment/index.php?user_id=${authState?.userToken}&store_id=${storeId}` }}/>
      <View style={{position: 'absolute', top: 10, right: 10, elevation: 5, height: 30, width: 30,}}>
        <TouchableOpacity 
          onPress={() => {
            setIsWebView(false)
            setStoreId(null) }} 
          style={{height: 30, width: 30}}>
          <FontAwesomeIcon name='close' size={35} color='white'/>
        </TouchableOpacity>
      </View>
    </View>
  )
  else return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={(e) => handleScroll(e)} 
      style={styles.bgAll}>
      {/* Modal pembelian diamond */}
      {/* <Overlay
        animationType="fade"
        fullscreen={false}
        isVisible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
        overlayStyle={styles.overlay}>
        <View style={styles.centeredView}>
          <TouchableOpacity 
            onPress={() => {
              setBuktiBayar(null)
              setPaymentMethod(null)
              setModal(false)}} 
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
              <Text style={[styles.bigWhiteText, {margin: 10, left: 15}]}>Konfirmasi Pembayaran</Text>
            </View>
            <View style={{height: '100%', width: '100%', padding: 20}}>

              <Text style={{fontSize: RFValue(18)}}>Jumlah diamond yg dibeli: </Text>
              <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 15}}>
                <Image source={diamond} style={{width: 17, height: 17}}/>
                <Text style={{fontSize: 16, color: 'gray'}}>{" "}{diamondBuy}</Text>
              </View>

              <Text style={{fontSize: RFValue(18)}}>Harga total: </Text>
              <Text style={{fontSize: 16, color: 'gray', marginBottom: 15}}>{diamondPrice}</Text>

              <Text style={{fontSize: RFValue(18)}}>Metode Pembayaran: </Text>
              <View style={[styles.pickerContainerStyle, {width: Dimensions.get('window').width*0.7, marginTop: 5, marginBottom: 15}]}>
                <Picker
                  selectedValue={paymentMethod}
                  style={[styles.pickerStyle, {width: Dimensions.get('window').width*0.7}]}
                  onValueChange={ (itemValue) => setPaymentMethod(itemValue) }>
                  <Picker.Item label="Choose" value={null}/>
                  <Picker.Item label="Go Pay" value={"gopay"}/>
                  <Picker.Item label="Ovo" value={"ovo"}/>
                  <Picker.Item label="BCA" value={"bca"}/>
                </Picker>
              </View>

              <Text style={{fontSize: RFValue(18), marginBottom: 10}}>Unggah Bukti Pembayaran: </Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderColor: theme.SECONDARY_DARK_COLOR, borderWidth: 1, padding: RFValue(12), width: '65%', borderRadius: 20}} onPress={() => openCamera()}>
                  <Text style={{fontSize: RFValue(15), alignSelf: 'center'}}>Unggah Foto</Text>
                </TouchableOpacity>
                {buktiBayar && <FontAwesomeIcon name={"check-square-o"} size={30} color={theme.SECONDARY_DARK_COLOR} style={{marginLeft: RFValue(15)}}/>}
              </View>
              <TouchableOpacity 
                style={(buktiBayar && paymentMethod) ? [styles.button, {width: '90%', marginTop: RFValue(30)}] : [styles.disabledButton, {width: '90%', marginTop: RFValue(30)}]} 
                onPress={ () => buyDiamond(storeId)} 
                disabled={(buktiBayar && paymentMethod) ? false : true}>
                <Text style={styles.buttonText}>Beli diamond!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay> */}
      
      <View style={{
        height: 125, 
        backgroundColor: theme.PRIMARY_DARK_COLOR, 
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        }}>
        <Text style={styles.titleText}>Beli Diamond</Text>
        <View style={{flexDirection: 'row', alignItems:'center', position: 'absolute', top: 20, right: 20}}>
          <Image source={diamond} style={{width: 30, height: 30}}/>
          <Text style={{fontSize: 22, color: 'white'}}>{" "}{authState?.diamond}</Text>
        </View>
      </View>
      <FlatList
        style={{marginTop: -70, marginHorizontal: 20}}
        data={items}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={_renderItem}
        keyExtractor={ (item) => item.id}
        showsHorizontalScrollIndicator={false}/>

    </ScrollView>
  )
};