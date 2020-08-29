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
  TouchableOpacity
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

  return (
    <ScrollView onScroll={(e) => handleScroll(e)} contentContainerStyle={{ flexGrow: 1}}>
      <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 180}}>
        <Text style={styles.titleText}>Akademis Inspiration</Text>
        <Icon name="bell-circle" style={{position: 'absolute', right: 20, top: 20,}} color={theme.PRIMARY_ACCENT_COLOR} size={35} />
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

      <TouchableOpacity onPress={() => navigation.navigate('Tryout')}>
        <View style={styles.largeCardWithDesc}>
          <View style={{backgroundColor: theme.SECONDARY_DARK_COLOR, height: 9/16*360}}>
            {/* Ini harusnya isinya image */}
          </View>
          <View style={{backgroundColor: 'white', height:300-9/16*300}}>
            <Text style={{marginLeft: 15, marginTop: 10, fontSize: 20}}>
              Ikut Tryout gak pake ribet
            </Text>
            <Text style={{marginLeft: 15, fontSize: 15}}>
              Kamu bisa mengerjakan soal Try Out kapanpun dan dimanapun. Yuk daftar sekarang!
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Virtual Class')}>
        <View style={styles.largeCardWithDesc}>
          <View style={{backgroundColor: theme.SECONDARY_DARK_COLOR, height: 9/16*360}}>
            {/* Ini harusnya isinya image */}
          </View>
          <View style={{backgroundColor: 'white', height:300-9/16*300}}>
            <Text style={{marginLeft: 15, marginTop: 10, fontSize: 20}}>
              Virtual Class mantabs
            </Text>
            <Text style={{marginLeft: 15, fontSize: 15}}>
              Ya kali gak join kelas kece yang bikin auto paham materi. Gaskeun!
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{height: 150}}/>

    </ScrollView>
  )
};