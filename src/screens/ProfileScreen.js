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
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Picker } from '@react-native-community/picker';
import axios from 'react-native-axios';

//Context
import { AuthContext } from '../components/Context.js'

//Data
import { universities, majors } from '../data';

//Styling
import styles from '../styles/mainScreenStyle.js';

export default () => {
  const { _setProfile, logOut, authState } = React.useContext(AuthContext)

  const [avatar, setAvatar] = React.useState(null)
  const [name, setName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [university, setUniversity] = React.useState(null)
  const [major, setMajor] = React.useState(null)
  const [changed, setChanged] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const getUserProfile = () => {
    axios.get(`https://dev.akademis.id/api/user/${authState?.userToken}`)
      .then( res => {
        console.log("Ini dari getUserProfile")
        console.log(res)
        setAvatar(res.data.data.avatar)
        setName(res.data.data.name)
        setUsername(res.data.data.username)
        setEmail(res.data.data.email)
        setUniversity(res.data.data.ptn)
        setMajor(res.data.data.jurusan)
        setLoading(false)
      })
      .catch (e => {
        console.log(e)
      })
  }

  const saveChanges = () => {
    setLoading(true)
    axios.put(`https://dev.akademis.id/api/user/${authState?.userToken}`, {
      "name": name,
      "username": username,
      "email": email,
      "ptn": university,
      "jurusan": major
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

  React.useEffect( () => {
    getUserProfile()

    console.log(university)

    if (authState?.isProfileSet === false) 
      Alert.alert("Please set up your profile", "Please choose your university and major")
  }, [authState?.isProfileSet])


  if (loading === true) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  )
  else return (
    <View style={styles.centeredView}>
      <Text style={styles.sectionTitle}>Profile Screen</Text>
      {avatar ? 
        <Image source={avatar} style={{width: 100, height: 100}}/>
        :
        <Image source={require('../images/profile-icon.png')} style={{width: 100, height: 100}}/>
      }
      <Text style={styles.description}>Name: {name}</Text>
      <Text style={styles.description}>Username: {username}</Text>
      <Text style={styles.description}>Email: {email}</Text>
      <Picker
        selectedValue={university}
        style={{height: 50, width: 300}}
        onValueChange={ (itemValue) =>
          {setUniversity(itemValue)
          setMajor(majors[itemValue][0])
          setChanged(true)}
        }>
        { (university === null) && <Picker.Item label="Choose" value={null}/>}
        {universities.map( (item, index) => (
          <Picker.Item label={item} value={item} key={index}/>
        ))}
      </Picker>
      <Picker
        selectedValue={major}
        style={{height: 50, width: 300}}
        onValueChange={ (itemValue) =>
          {setMajor(itemValue)
          setChanged(true)}
        }>
        { (university === null) ?
          <Picker.Item label="Choose your university first" value={null}/>
          :
          majors[String(university) ].map( (item, index) => (
            <Picker.Item label={item} value={item} key={index}/>
          ))
        }
      </Picker>
      {changed &&
        <TouchableOpacity style={styles.button} onPress={() => saveChanges()}>
          <Text>Save</Text>
        </TouchableOpacity>}
      <TouchableOpacity style={styles.button} onPress={() => logOut()}>
        <Text>Log out</Text>
      </TouchableOpacity> 
    </View>
  )
};