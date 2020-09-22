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
            name: "Belajar Biasa",
            waktu: "12 September 2020"
          },
          {
            id: 2,
            name: "Belajar Biasa+",
            waktu: "12 September 2020"
          },
          {
            id: 3,
            name: "Belajar Belajar",
            waktu: "12 September 2020"
          },
          {
            id: 4,
            name: "Belajar Belajar+",
            waktu: "12 September 2020"
          },
          {
            id: 5,
            name: "Belajar Latihan",
            waktu: "12 September 2020"
          },
          {
            id: 6,
            name: "Belajar Latihan+",
            waktu: "12 September 2020"
          },
          {
            id: 7,
            name: "Belajar IMBA",
            waktu: "12 September 2020"
          },
          {
            id: 8,
            name: "Belajar IMBA+",
            waktu: "12 September 2020"
          },
          {
            id: 9,
            name: "Belajar Luar Biasa",
            waktu: "12 September 2020"
          },
          {
            id: 10,
            name: "Belajar Istimewa",
            waktu: "12 September 2020"
          },
        ]

  const _renderItem = ({item}) => (
      <TouchableOpacity onPress={() => console.log(item.value)}>
          <View style={styles.smallCard}>
            <View style={{flex: 0.75, justifyContent: 'center'}}>
              <Text style={{fontSize: 19, left: 20}}>{item.name}</Text>
              <Text style={{fontSize: 17, left: 20, color: 'gray'}}>{item.waktu}</Text>
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
        <Text style={styles.titleText}>Aktivitasku</Text>
      </View>

      { (items.length != 0) ?
        <FlatList
          style={{marginTop: -50,}}
          data={items}
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