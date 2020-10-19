import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../components/Context.js'
import axios from 'react-native-axios';
import { RFValue } from "react-native-responsive-fontsize";

//Importing style
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

//Importing images
import diamond from '../assets/icons/diamond-currency.png'

const moment = require('moment')

function dateFormat(date){
  var match = date.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/)
  var realDate = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6])

  return moment(realDate).format('DD/MM/YYYY')
}

export default ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [posY, setPosY] = React.useState(0)
  const { authState } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)
  const [riwayat, setRiwayat] = React.useState([])

  const items = [
    {
      id: 1,
      value: 2,
      name: "Paket Biasa",
      harga: "Rp10.000",
    },
    {
      id: 2,
      value: 3,
      name: "Paket Biasa+",
      harga: "Rp12.000",
    },
    {
      id: 3,
      value: 5,
      name: "Paket Belajar",
      harga: "Rp22.000",
    },
    {
      id: 4,
      value: 8,
      name: "Paket Belajar+",
      harga: "Rp35.000",
    },
    {
      id: 5,
      value: 10,
      name: "Paket Latihan",
      harga: "Rp45.000",
    },
    {
      id: 6,
      value: 20,
      name: "Paket Latihan+",
      harga: "Rp90.000",
    },
    {
      id: 7,
      value: 30,
      name: "Paket IMBA",
      harga: "Rp135.000",
    },
    {
      id: 8,
      value: 40,
      name: "Paket IMBA+",
      harga: "Rp185.000",
    },
    {
      id: 9,
      value: 80,
      name: "Paket Luar Biasa",
      harga: "Rp375.000",
    },
    {
      id: 10,
      value: 100,
      name: "Paket Istimewa",
      harga: "Rp450.000",
    },
  ]

  const _renderItem = ({item}) => (
    <View style={styles.smallCard}>
      <View style={{flex: 0.75, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={{fontSize: RFValue(19), left: 20}}>Pembelian {items[items.findIndex( ( {id} ) => (id == item.store_id) )].value} {"    "}</Text>
          <Image source={diamond} style={{width: 30, height: 30}}/>
        </View>
        <Text style={{fontSize: RFValue(15.5), left: 20, color: 'gray'}}>Pada tanggal {dateFormat(item.created_at)}</Text>
        <Text style={{fontSize: RFValue(15.5), left: 20, color: 'gray'}}>Status: {(item.status == "verified") ? "Sudah terverifikasi" : "Belum terverifikasi"}</Text>
      </View>
    </View>
  )

  const getData = () => {
    setLoading(true)
    axios.get(`https://dev.akademis.id/api/checkout?user_id=${authState?.userToken}`)
      .then(res => {
        console.log("BERHASIL AMBIL DATA BUAT RIWAYAT")
        console.log(res.data.data)
        setRiwayat(res.data.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    })
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getData()
    wait(1000).then(() => setRefreshing(false))
  }, [])

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

  React.useEffect( () => {
    getData()
  }, [])

  if (loading === true) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  ) 
  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={(e) => handleScroll(e)} style={styles.bgAll}>
      <View style={{
        height: 125, 
        backgroundColor: theme.PRIMARY_DARK_COLOR, 
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        }}
      >
        <Text style={styles.titleText}>Riwayat Pembelian</Text>
      </View>

      { (riwayat.length != 0) ?
        <FlatList
          style={{marginTop: -50,}}
          data={riwayat}
          renderItem={_renderItem}
          keyExtractor={ (item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        :
        <View style={[styles.centeredView, {marginTop: 25}]}>
          <Text style={{fontSize: 20}}>Maaf, belum ada aktivitas</Text>
        </View>
      }
    </ScrollView>
  )
};