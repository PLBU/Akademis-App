/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  InteractionManager, 
  ActivityIndicator,
  Alert
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler'

//Context
import { AuthContext } from './Context.js'

//Components
import { BottomTabComponent, AuthStackComponent, IntroStackComponent } from './Nav.js'

enableScreens()

const App = () => {
  const authReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
          isProfileSet: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOADING':
        return {
          ...prevState,
          isLoading: true,
        }
      case 'STOP LOADING':
        return {
          ...prevState,
          isLoading: false,
        }
      case 'INTRO DONE':
        return {
          ...prevState,
          isLoading: false,
          introDone: true,
        }
      case 'PROFILE SET':
        return {
          ...prevState,
          isProfileSet: true,
        }
    }
  }

  // State with dispatch of authReducer
  const [authState, dispatch] = React.useReducer(authReducer, 
    {
      isLoading: true,
      userToken: null,
      introDone: false,
      isProfileSet: false,
    });

  //Global context that can be used on other screen
  const authContext = React.useMemo( () => ({
      logIn: (email, password) => {
        dispatch({type: 'LOADING'})
        axios.post('https://dev.akademis.id/api/user/login', {
          "email": email,
          "password": password
        })
          .then(async res => {
            const userToken = String(res.data.data.id)
            if (res.data.data.ptn && res.data.data.jurusan) dispatch({type: 'PROFILE SET'})

            try {
              await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
              {
                console.error(e)
                dispatch({type: 'STOP LOADING'})
              }
            }

            dispatch({type: 'LOGIN', token: userToken})
          })
          .catch(err => {
            Alert.alert("Error", err.response.data.message)
            console.log(err.response.data.message)
            dispatch({type: 'STOP LOADING'})

            // Email & pass required, using @, and ., pass minimum 8 chars
          })
      },
      logOut: async () => {
        try {
          dispatch({type: 'LOADING'})
          await AsyncStorage.removeItem('userToken')
        } catch (e) {
          {
            console.error(e)
            dispatch({type: 'STOP LOADING'})
          }
        }
        dispatch({type: 'LOGOUT'})
      },
      register: (name, username, email, password) => {
        dispatch({type: 'LOADING'})
        axios.post('https://dev.akademis.id/api/user/register', {
          "name": name,
          "username": username,
          "email": email,
          "password": password
        })
          .then(async res => {
            const userToken = String(res.data.message.id) //Need an id in res.data.data or token

            try {
              await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
              {
                console.error(e)
                dispatch({type: 'STOP LOADING'})
              }
            }

            dispatch({type: 'REGISTER', token: userToken})
          })
          .catch(error => {
            if (typeof error.json === "function") {
              error.json().then(jsonError => {
                console.log("Json error from API");
                Alert.alert("Error", jsonError);
                dispatch({type: 'STOP LOADING'})
              }).catch(genericError => {
                console.log("Generic error from API");
                Alert.alert("Error", error.statusText);
                dispatch({type: 'STOP LOADING'})
              });
            } else {
              console.log("Fetch error");
              console.log(error.response)
              Alert.alert(error.response.data.message);
              dispatch({type: 'STOP LOADING'})
        }
          })
      },
      //sign in function using Google Account
      _signIn: async () => {
        try {
          dispatch({type: 'LOADING'})

          await GoogleSignin.hasPlayServices()

          const userInfo = await GoogleSignin.signIn()
          const userToken = userInfo.idToken

          await AsyncStorage.setItem('userToken', userToken)

          // console.log(userToken)
          // console.log(userInfo.user.name)

          dispatch({type: 'LOGIN', token: userToken})
        } catch (error) {
          // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          //   // user cancelled the login flow
          // } else if (error.code === statusCodes.IN_PROGRESS) {
          //   // operation (e.g. sign in) is in progress already
          // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          //   // play services not available or outdated
          // } else {
          //   // some other error happened
          // }
          dispatch({type: 'STOP LOADING'})
          console.log(error)
        }
      },
      _introDone: () => dispatch({type: 'INTRO DONE'}),
      _setProfile: () => dispatch({type: 'PROFILE SET'}),
      authState,
    }), [authState])

  //React.useEffect equivalent of componentDidMount
  React.useEffect(() => {
    SplashScreen.hide();
    InteractionManager.runAfterInteractions( async () => {
      let userToken = null

      try {
        userToken = await AsyncStorage.getItem('userToken')
        console.log(userToken)

        if (userToken === null) {
          dispatch({type: 'STOP LOADING'})
        } else {
          axios.get(`https://dev.akademis.id/api/user/${userToken}`)
            .then( res => {
              if (res.data.data.ptn && res.data.data.jurusan) dispatch({type: 'PROFILE SET'})
              dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
            })
            .catch ( (e) => {
              console.log(e)
              dispatch({type: 'STOP LOADING'})
            })
        }
      } catch (e) {
          console.log(e)
          dispatch({type: 'STOP LOADING'})
      }
    })
   },
  [])

  return (
    <AuthContext.Provider value={authContext}>
      { (authState?.isLoading === true) ?
        <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="black"/>
        </View>
        :
        <NavigationContainer>
          {(authState?.introDone === false && !authState?.userToken) ? 
            <IntroStackComponent/>
            :
            authState?.userToken !== null ? 
              <BottomTabComponent/>
              :
              <AuthStackComponent/>
          }
        </NavigationContainer>
      }
    </AuthContext.Provider>
  )
}

export default App;