import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../components/Context.js'
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-community/google-signin';
import { TextInput } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";

//Importing theme
import theme from '../styles/theme.js'

export default [
  // Login Screen
  ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [validationText, setValidationText] = React.useState('')
    const { logIn, _signIn } = React.useContext(AuthContext)

    const loginValidation = () => {
      if (email.length === 0 || password.length === 0) {
        setValidationText('Tolong isi semua informasi')
      } else if (!(email.includes('@') && email.includes('.') ) ) {
        setValidationText('Tolong gunakan alamat email yang valid')
      } else if (password.length < 8) {
        setValidationText('Panjang password seharusnya lebih dari 8')
      } else {
        logIn(email, password)
      }
    }

    React.useEffect(() => {
      GoogleSignin.configure({
        //scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '649038781582-t9skoelrbqn9hv1asvh1039sjuetomls.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: '', // specifies a hosted domain restriction
        // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        //accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      })
    })

    return (
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <Text style={styles.sectionTitle}> 
            Selamat Datang!
          </Text>
          <Text style={{fontSize: RFValue(23), color: theme.PRIMARY_DARK_COLOR, marginBottom: 32}} >
            Calon Mahasiswa Baru PTN 2021
          </Text>
          <Text style={{fontSize: RFValue(18), color: theme.PRIMARY_DARK_COLOR, marginBottom: 32}}>
            Silakan masuk untuk melanjutkan
          </Text>
          <TextInput 
            style={styles.textInput}
            label="Email"
            onChangeText={val => setEmail(val)}
            value={email}
            mode='flat'
            theme={{
              colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
              roundness: 10,
            }}
          />
          <TextInput 
            style={styles.textInput}
            label="Password"
            onChangeText={val => setPassword(val)}
            value={password}
            mode='flat'
            secureTextEntry={true}
            theme={{
              colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
              roundness: 10,
            }}
          />
          <Text style={{color: 'orangered', fontSize: 15, marginBottom: 16}}>{validationText}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={loginValidation}
          >
            <Text style={{fontSize: 18,}}>Masuk</Text>
          </TouchableOpacity> 
          {/* <Text style={{color: 'gray', marginVertical: 20}}> Atau dengan metode lain </Text>
          <GoogleSigninButton
            style={{ width: 300, height: 65,}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={ () => _signIn()}
            disabled={false} /> */}
        </View>
        <View>
          <Text
            style={{color: theme.PRIMARY_DARK_COLOR, fontSize: 15, marginBottom: 8}} 
          > 
            Belum punya akun? {" "}
            <Text 
              onPress={() => navigation.navigate('register')} 
              style={{color: theme.PRIMARY_ACCENT_COLOR, textDecorationLine: 'underline', fontSize: 16}}
            > 
              Klik di sini 
            </Text>
          </Text>
        </View>
      </View>
  )},
  // Registration Screen
  ({navigation}) => {
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirm, setPasswordConfirm] = React.useState('')
    const { register } = React.useContext(AuthContext)

    return (
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <Text style={[styles.sectionTitle, {marginBottom: 8}]}>Mari daftar! </Text>
          <Text style={{fontSize: RFValue(20), color: theme.PRIMARY_DARK_COLOR, marginBottom: 32}}>
            Tolong isi keterangan personal anda
          </Text>
          <TextInput 
            style={styles.textInput}
            label="Nama Lengkap"
            onChangeText={val => setName(val)}
            value={name}
            mode='flat'
            theme={{
              colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
              roundness: 10,
            }}
          />
          <TextInput 
            style={styles.textInput}
            label="Username"
            onChangeText={val => setUsername(val)}
            value={username}
            mode='flat'
            theme={{
              colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
              roundness: 10,
            }}
          />
          <TextInput 
            style={styles.textInput}
            label="Email"
            onChangeText={val => setEmail(val)}
            value={email}
            mode='flat'
            theme={{
              colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
              roundness: 10,
            }}
          />
          <TextInput 
            style={styles.textInput}
            label="Password"
            onChangeText={val => setPassword(val)}
            value={password}
            mode='flat'
            secureTextEntry={true}
            theme={{
              colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
              roundness: 10,
            }}
          />
          <TextInput 
            style={styles.textInput}
            label="Konfirmasi Password"
            onChangeText={val => setPasswordConfirm(val)}
            value={passwordConfirm}
            mode='flat'
            secureTextEntry={true}
            theme={{
              colors: { placeholder: 'gray', text: 'gray', primary: theme.PRIMARY_DARK_COLOR,},
              roundness: 10,
            }}
          />
          <Text style={{color: 'orangered', marginBottom: 16}}>
            {(passwordConfirm === password) ? null : 'Pastikan konfirmasi passwordmu benar'}
          </Text>
          <TouchableOpacity 
            style={
              (name.length !== 0 && 
              username.length !== 0 && 
              email.length !== 0 && 
              email.includes('@') && 
              email.includes('.') &&
              password === passwordConfirm &&
              password.length >= 8) 
              ? styles.button 
              : styles.disabledButton} 
            onPress={() => register(name, username, email, password)}
            disabled={
              !(name.length !== 0 && 
              username.length !== 0 && 
              email.length !== 0 && 
              email.includes('@') && 
              email.includes('.') &&
              password === passwordConfirm &&
              password.length >= 8)
            }
          >
            <Text style={{fontSize: 18,}}>Daftar</Text>
          </TouchableOpacity> 
        </View>
        <View>
          <Text
            style={{color: theme.PRIMARY_DARK_COLOR, fontSize: 15, marginBottom: 8}} 
          > 
            Sudah punya akun? {" "}
            <Text 
              onPress={() => navigation.navigate('login')} 
              style={{color: theme.PRIMARY_ACCENT_COLOR, textDecorationLine: 'underline', fontSize: 16}}
            > 
              Klik di sini 
            </Text>
          </Text>
        </View>
      </View>
  )},
]

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: theme.PRIMARY_DARK_COLOR,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  withMarginBottom: {
      marginBottom: 16,
  },
  disabledButton: {
    alignItems: "center",
    opacity: 0.3,
    backgroundColor: theme.PRIMARY_ACCENT_COLOR,
    padding: 15,
    borderRadius: 15,
    width: 300,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.PRIMARY_ACCENT_COLOR,
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    width: 300,
  },
  textInput: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
  }
})