import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'react-native-axios';
import { Thumbnail } from 'react-native-thumbnail-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Images
import landscape from '../images/landscape-vector.jpg'

//Styles
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

export default ({navigation}) => {
  const [posY, setPosY] = React.useState(0)
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0)
  const [carouselItems, setCarouselItems] = React.useState([])

  const listItems = [
    {
      id: 1,
      name: 'Tryout',
      image: null,
      header: 'Ikut Tryout gak pake ribet',
      subHeader: 'Kamu bisa mengerjakan soal Try Out kapanpun dan dimanapun. Yuk daftar sekarang!',
    },
    {
      id: 2,
      name: 'Virtual Class',
      image: null,
      header: 'Virtual Class mantabs',
      subHeader: 'Ya kali gak join kelas kece yang bikin auto paham materi. Gaskeun!',
    }
  ]

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
    axios.get('https://dev.akademis.id/api/blog')
      .then( res => {
        var a = res.data.data.data
        a.push({'youtube': 'https://www.youtube.com/watch?v=UEqZUFmSZKk'})

        setCarouselItems(a)

        console.log("WOI: ")
        console.log(carouselItems)
      })
      .catch( err => {
        console.log(err)
      })
  }, [] )

  const _renderItem = ({item,index}) => {
    return (
      <View style={{
          backgroundColor:'white',
          borderRadius: 25,
          height: (Dimensions.get('window').width*0.8)*9/16,
          elevation: 5,
          marginBottom: 3.5,
          }}>
        { (item.youtube === undefined) ?
            <ImageBackground source={item.image} style={styles.backgroundImage}>
              <Text style={{fontSize: 30, marginLeft: 25, marginTop: 25}}>{item.title}</Text>
              <Text style={{marginLeft: 25}}>{item.author}</Text>
            </ImageBackground>
            :
            <Thumbnail 
              url={item.youtube} 
              containerStyle={[styles.backgroundImage, styles.centeredView]} 
              imageHeight={(Dimensions.get('window').width*0.8)*9/16} 
              imageWidth={Dimensions.get('window').width*0.8}
            />    
        }
      </View>
    )
  }

  const _renderList = ({item}) => 
    <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
      <View style={styles.largeCardWithDesc}>
        <View style={{backgroundColor: theme.SECONDARY_DARK_COLOR, height: 9/16*Dimensions.get('window').width*0.9}}>
          {/* Ini harusnya isinya image */}
        </View>
        <View style={{backgroundColor: 'white', height:300-9/16*Dimensions.get('window').width*0.9}}>
          <Text style={{marginLeft: 15, marginTop: 10, fontSize: 20}}>
            {item.header}
          </Text>
          <Text style={{marginLeft: 15, fontSize: 15}}>
            {item.subHeader}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  return (
    <ScrollView onScroll={(e) => handleScroll(e)} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 180, borderBottomLeftRadius: 50, borderBottomRightRadius: 50,}}>
        <Text style={styles.titleText}>Akademis Inspiration</Text>
      </View>

      <View style={{marginTop: -100}}>
        <Carousel
          layout={"default"}
          data={carouselItems}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width*0.8}
          renderItem={_renderItem}
          activeSlideOffset={35}
          onSnapToItem={ (index) => setActiveSlideIndex(index) }
        />
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeSlideIndex}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 5,
            marginHorizontal: 3,
            backgroundColor: 'rgba(200, 200, 200, 1)'
          }}
          inactiveDotStyle={{
            backgroundColor: 'rgba(200, 200, 200, 1)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>

      <FlatList
        data={listItems}
        renderItem={_renderList}
        keyExtractor={ (item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <View style={{height: 150}}/>

    </ScrollView>
  )
};