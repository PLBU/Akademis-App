import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome'

//Importing context
import { AuthContext } from '../components/Context.js'

//Importing images
import tutorialImage1 from '../assets/images/tutorial-rating-gelap.png'
import tutorialImage2 from '../assets/images/tutorial-virtual-class-gelap.png'
import tutorialImage3 from '../assets/images/tutorial-soal-to-gelap.png'

//Importing theme
import theme from '../styles/theme.js'

export default () => {
  const { _introDone } = React.useContext(AuthContext)

  const slides = [
    {
      key: '1',
      title: 'Tutorial Fitur Utama 1',
      text: 'Berikan gambaran umum mengenai kelebihan, keunikan, atau manfaat yang akan dirasakan user ketika menggunakan fitur ini',
      image: tutorialImage1
    },
    {
      key: '2',
      title: 'Tutorial Fitur Utama 2',
      text: 'Berikan gambaran umum mengenai kelebihan, keunikan, atau manfaat yang akan dirasakan user ketika menggunakan fitur ini',
      image: tutorialImage2
    },
    {
      key: '3',
      title: 'Tutorial Fitur Utama 3',
      text: 'Berikan gambaran umum mengenai kelebihan, keunikan, atau manfaat yang akan dirasakan user ketika menggunakan fitur ini',
      image: tutorialImage3
    }
  ]

  const _renderItem = ({ item }) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={item.image} style={{width: '100%', height: '90%'}}/>
        </View>
        <View style={{
                flex: 0.5, 
                backgroundColor: theme.PRIMARY_DARK_COLOR, //Primary Dark
                justifyContent: 'center',
                alignItems: 'center',
                }}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.descriptions}>{item.text}</Text>
        </View>
      </View>
    )
  }

  const _renderNextButton = () => (
    <Icon name="arrow-circle-right" color={theme.PRIMARY_ACCENT_COLOR} size={40} style={{marginRight: 10}}/> //Primary Accent
  )
  
  const _renderDoneButton = () => (
    <Icon name="check-circle" color={theme.PRIMARY_ACCENT_COLOR} size={40} style={{marginRight: 10}}/>
  )

  return (
    <AppIntroSlider 
      renderItem={_renderItem} 
      renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
      data={slides}
      activeDotStyle={{width: 20, backgroundColor: 'white'}}
      onDone={_introDone} 
      showSkipButton={true} 
      skipLabel="Lewati"
      />
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 27,
    color: 'white',
    position: 'absolute',
    top: 25,
  },
  descriptions: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    margin: 25
  }
})