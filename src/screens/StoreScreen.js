import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

//Importing style
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

//Importing images
import diamond from '../assets/icons/diamond-colored.png'
import diamond10 from '../assets/icons/diamond-10.png'

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
          <View style={styles.squareCard}>
            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={diamond10} style={{width: 50, height: 65, marginVertical: 20}}/>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Text style={{fontSize: 15, color: 'gray'}}>{item.value}</Text>
                <Image source={diamond} style={{width: 18, height: 18}}/>
              </View>
            </View>
            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 17}}>{item.name}</Text>
              <Text style={{fontSize: 15, color: 'gray'}}>{item.harga}</Text>
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
    <ScrollView onScroll={(e) => handleScroll(e)} style={styles.bgAll}>
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
          <Image source={diamond} style={{width: 30, height: 30}}/>
          <Text style={{fontSize: 22, color: 'white'}}>{" "}123</Text>
        </View>
      </View>
      <FlatList
        style={{marginTop: -70, marginHorizontal: 20}}
        data={items}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={_renderItem}
        keyExtractor={ (item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

    </ScrollView>
  )
};