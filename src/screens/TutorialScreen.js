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
import { RFValue } from "react-native-responsive-fontsize";

//Importing context
import { AuthContext } from '../components/Context.js'

//Importing images
import tutorialImage1 from '../assets/images/tutorial-soal-to-gelap.png'
import tutorialImage2 from '../assets/images/tutorial-rating-gelap.png'
import tutorialImage3 from '../assets/images/tutorial-virtual-class-gelap.png'

//Importing theme
import theme from '../styles/theme.js'

export default () => {
  const { _introDone } = React.useContext(AuthContext)

  const slides = [
    {
      key: '1',
      title: 'Apa sih itu Akademis.id?',
      text: 'Akademis.id merupakan platform tryout online yang selalu memberikan soal-soal yang berkualitas, up to date, dan tentunya menantang untuk dikerjakan.',
      image: tutorialImage1
    },
    {
      key: '2',
      title: 'TERPERCAYA',
      text: 'Platform ini sudah dipercaya oleh lebih dari 200.000 siswa pejuang perguruan tinggi di Indonesia dan mendapat rating 9.2/10 berdasarkan survei yang diberikan kepada para pengguna tersebut.',
      image: tutorialImage2
    },
    {
      key: '3',
      title: 'INOVATIF',
      text: 'Akademis.id hadir dengan fitur baru Akademis Virtual Class yaitu media yang mempertemukan kamu dengan teacher-teacher terbaik dari seluruh Indonesia yang akan memberikan berbagai macam materi yang bisa kamu pilih sesuai dengan keinginanmu!',
      image: tutorialImage3
    }
  ]

  const _renderItem = ({ item }) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={item.image} style={{width: RFValue(400), height: RFValue(300)}}/>
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