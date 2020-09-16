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

export default () => {
  const _renderItem = ({item}) => (
      <TouchableOpacity onPress={() => console.log(item.value)}>
          <View style={styles.squareCard}>
            <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
            <Text style={{fontSize: 17, color: 'black'}}>{" "}{item.value}</Text>
          </View>
      </TouchableOpacity>
  )
  return (
    <ScrollView>
      <View style={{
        height: 125, 
        backgroundColor: theme.PRIMARY_DARK_COLOR, 
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        }}
      >
        <Text style={[styles.sectionText, {color: 'white', position: 'absolute', top: 15, marginTop: 0}]}>Beli Diamond</Text>
        <View style={{flexDirection: 'row', alignItems:'center', position: 'absolute', top: 20, right: 20}}>
          <FontAwesomeIcon name="diamond" color={theme.PRIMARY_ACCENT_COLOR} size={18}/>
          <Text style={{fontSize: 17, color: 'white'}}>{" "}123</Text>
        </View>
      </View>
      <FlatList
        style={{marginTop: -65,}}
        horizontal={true}
        data={[
          {
            id: 1,
            value: 50,
          },
          {
            id: 2,
            value: 100,
          },
          {
            id: 3,
            value: 150,
          },
          {
            id: 4,
            value: 200,
          },
          {
            id: 5,
            value: 250,
          },
        ]}
        renderItem={_renderItem}
        keyExtractor={ (item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionText}>Yang lagi Trending!</Text>
      <View style={styles.horizontalRuler}/>

    </ScrollView>
  )
};