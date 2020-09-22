import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

//Importing style
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

export default ({navigation}) => {
  const [posY, setPosY] = React.useState(0)

  const items = [
    {
      id: 1,
      value: 2,
      name: "Paket Biasa",
      harga: "Rp10.000"
    },
    {
      id: 2,
      value: 3,
      name: "Paket Biasa+",
      harga: "Rp12.000"
    },
    {
      id: 3,
      value: 5,
      name: "Paket Belajar",
      harga: "Rp22.000"
    },
    {
      id: 4,
      value: 8,
      name: "Paket Belajar+",
      harga: "Rp35.000"
    },
    {
      id: 5,
      value: 10,
      name: "Paket Latihan",
      harga: "Rp45.000"
    },
    {
      id: 6,
      value: 20,
      name: "Paket Latihan+",
      harga: "Rp90.000"
    },
    {
      id: 7,
      value: 30,
      name: "Paket IMBA",
      harga: "Rp135.000"
    },
    {
      id: 8,
      value: 40,
      name: "Paket IMBA+",
      harga: "Rp185.000"
    },
    {
      id: 9,
      value: 80,
      name: "Paket Luar Biasa",
      harga: "Rp375.000"
    },
    {
      id: 10,
      value: 100,
      name: "Paket Istimewa",
      harga: "Rp450.000"
    },
  ]

  const _renderItem = ({item}) => (
      <TouchableOpacity onPress={() => console.log(item.value)}>
          <View style={styles.smallCard}>
            <View style={{flex: 0.75, justifyContent: 'center'}}>
              <Text style={{fontSize: 19, left: 20}}>{item.name}</Text>
              <Text style={{fontSize: 17, left: 20, color: 'gray'}}>{item.harga}</Text>
            </View>
            <View style={{flex: 0.25, backgroundColor: theme.SECONDARY_DARK_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
              <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={20}/>
              <Text style={{fontSize: 18, color: 'white'}}>{" "}{item.value}</Text>
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

  return (
    <ScrollView onScroll={(e) => handleScroll(e)}>
      <View style={{
        height: 125, 
        backgroundColor: theme.PRIMARY_DARK_COLOR, 
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        }}
      >
        <Text style={styles.titleText}>Beli Diamond</Text>
        <View style={{flexDirection: 'row', alignItems:'center', position: 'absolute', top: 20, right: 20}}>
          <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={22}/>
          <Text style={{fontSize: 22, color: 'white'}}>{" "}123</Text>
        </View>
      </View>
      <FlatList
        style={{marginTop: -50,}}
        data={items}
        renderItem={_renderItem}
        keyExtractor={ (item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

    </ScrollView>
  )
};