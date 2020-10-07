import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Picker } from '@react-native-community/picker';
import axios from 'react-native-axios';
import { BarChart } from "react-native-chart-kit";
import ImagePicker from 'react-native-image-picker';

//Context
import { AuthContext } from '../components/Context.js'

//Data
import { universities, majors } from '../data';

//Styling
import styles from '../styles/mainScreenStyle.js';

//Importing theme
import theme from '../styles/theme.js'

//Immporting images
import profile from '../assets/images/profile-icon.png'

export default ({navigation}) => {
  const { _setProfile, logOut, authState, _setDiamond } = React.useContext(AuthContext)

  const [posY, setPosY] = React.useState(0)
  const [avatar, setAvatar] = React.useState("null")
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [university, setUniversity] = React.useState(null)
  const [major, setMajor] = React.useState(null)
  const [changed, setChanged] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const items = {
      labels: ["SosHum", "Kimia", "B. Inggris", "B. Indonesia"],
      datasets: [
        {
          data: [
            95,
            100,
            60,
            55
          ]
        }
      ]
  }

  const openCamera = () =>{
    const options = {
      title: 'Select photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
      const source = { uri: 'data:image/jpeg;base64,' + response.data };

      setAvatar(source.uri)
      setChanged(true)
    }
  })}

  const getUserProfile = () => {
    setLoading(true)
    axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
      .then( res => {
        console.log("Ini dari getUserProfile")
        console.log(res)
        console.log(authState?.userToken)
        if (res.data.data.avatar) setAvatar(res.data.data.avatar)
        else setAvatar("null")
        setName(res.data.data.name)
        setUsername(res.data.data.username)
        setEmail(res.data.data.email)
        setUniversity(res.data.data.ptn)
        setMajor(res.data.data.jurusan)
        setLoading(false)
        _setDiamond(res.data.data.diamond)
      })
      .catch (e => {
        setLoading(false)
        console.log(e)
      })
  }

  const saveChanges = () => {
    setLoading(true)
    axios.put(`https://dev.akademis.id/api/user/${authState?.userToken}`, {
      "name": name,
      "username": username,
      "email": email,
      "password": authState?.password,
      "ptn": university,
      "jurusan": major,
      "avatar": avatar
    })
      .then( res => {
        console.log("Ini dari PUT profile")
        console.log(res)
        setAvatar(res.data.data.avatar)
        setName(res.data.data.name)
        setUsername(res.data.data.username)
        setEmail(res.data.data.email)
        setUniversity(res.data.data.ptn)
        setMajor(res.data.data.jurusan)

        setChanged(false)
        _setProfile()
        setLoading(false)
      })
      .catch (e => {
        console.log("Ini dari PUT profile")
        console.log(e.response) 
        setLoading(false)
      })
  }

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
    setChanged(false)
    getUserProfile()

    console.log(university)

    if (authState?.isProfileSet === false) 
      Alert.alert("Please set up your profile", "Please choose your university and major")
  }, [authState?.isProfileSet])


  if (loading === true) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  )
  else return (
    <ScrollView 
      // onScroll={(e) => handleScroll(e)} 
      contentContainerStyle={[{flexGrow: 1}, styles.bgAll]}>
      <View style={{
        height: 150, 
        backgroundColor: theme.PRIMARY_DARK_COLOR, 
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        }}>
        {(avatar != "null") ? 
          <TouchableOpacity onPress={openCamera}>
            <Image source={{uri: avatar}} style={{width: 100, height: 100, borderRadius: 50, overflow: 'hidden'}}/>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={openCamera}>
            <Image source={profile} style={{width: 100, height: 100, borderRadius: 50, overflow: 'hidden'}}/>
          </TouchableOpacity>
        }
        <Text style={styles.bigWhiteText}>Halo, {name}</Text>
      </View>

      <Text style={styles.sectionText}>Informasi General</Text>
      <View style={styles.horizontalRuler}/>

      <View style={{width: Dimensions.get('window').width*0.9, alignSelf: 'center', marginBottom: 20}}>
        <Text style={styles.leftMediumText}>Nama Lengkap : {"\n"}
          <Text style={styles.leftSmallText}>{name}</Text>
        </Text>
        <Text style={styles.leftMediumText}>Username : {"\n"}
          <Text style={styles.leftSmallText}>{username}</Text>
        </Text>
        <Text style={styles.leftMediumText}>Email : {"\n"}
          <Text style={styles.leftSmallText}>{email}</Text>
        </Text>

        <Text style={styles.leftMediumText}>Universitas :</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10}]}>
          <Picker
            selectedValue={university}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) =>
              {setUniversity(itemValue)
              setMajor(majors[itemValue][0])
              if (itemValue) setChanged(true)}
            }
            >
            <Picker.Item label="Choose" value={"null"}/>
            {universities.map( (item, index) => (
              <Picker.Item label={item} value={item} key={index}/>
            ))}
          </Picker>
        </View>

        <Text style={styles.leftMediumText}>Jurusan :</Text>
        <View style={[styles.pickerContainerStyle, {marginTop: 10}]}>
          <Picker
            selectedValue={major}
            style={styles.pickerStyle}
            onValueChange={ (itemValue) =>
              {setMajor(itemValue)
              setChanged(true)}
            }>
            {
              majors[String(university) ].map( (item, index) => (
                <Picker.Item label={item} value={item} key={index}/>
              ))
            }
          </Picker>
        </View>
      </View>

      {changed &&
      <TouchableOpacity style={[styles.button, {alignSelf: 'center'}]} onPress={() => saveChanges()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>}

      <Text style={styles.sectionText}>Statistik Nilaimu</Text>
      <View style={styles.horizontalRuler}/>

      <View style={[styles.centeredView, {marginVertical: 20}]}>
        <BarChart
          data={items}
          width={Dimensions.get("window").width*0.85} // from react-native
          height={250}
          fromZero
          showValuesOnTopOfBars	
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: theme.SECONDARY_DARK_COLOR,
            backgroundGradientTo: theme.SECONDARY_DARK_COLOR,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: () => 'white',
            labelColor: () => 'white',
            style: {
              borderRadius: 20,
            },
            
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            elevation: 5,
          }}
        />
      </View>
      
      <TouchableOpacity style={[styles.button, {alignSelf: 'center'}]} onPress={() => logOut()}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity> 
    </ScrollView>
  )
};