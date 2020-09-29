import * as React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

//Context
import { AuthContext } from '../components/Context.js'

//Screens
import HomeScreen from '../screens/HomeScreen.js'
import ActivityScreen from '../screens/ActivityScreen.js'
import StoreScreen from '../screens/StoreScreen.js'
import ProfileScreen from '../screens/ProfileScreen.js'
import TutorialScreen from '../screens/TutorialScreen.js'
import AuthScreen from '../screens/AuthScreen.js'
import VirtualClassScreen from '../screens/VirtualClassScreen.js'
import TryoutScreen from '../screens/TryoutScreen.js'
import TryoutConductScreen from '../screens/TryoutConductScreen.js'

//Importing theme
import theme from '../styles/theme.js'

//Importing style
import styles from '../styles/mainScreenStyle.js'

const BottomTab = createBottomTabNavigator()
const AuthStack = createNativeStackNavigator()
const IntroStack = createNativeStackNavigator()
const VirtualClassTab = createMaterialTopTabNavigator()
const TryoutTab = createMaterialTopTabNavigator()
const VirtualClassStack = createNativeStackNavigator()
const TryoutStack = createNativeStackNavigator()

const BackButton = () => (
  <Text style={{margin: 15, fontSize: 27, color: 'white'}}>&lt;</Text>
)

const VirtualClassTabComponent = () => (
  <VirtualClassTab.Navigator
    initialRouteName="Catalogue"
    tabBarOptions={{
      indicatorStyle: {backgroundColor: 'white'},
      style: {backgroundColor: theme.PRIMARY_DARK_COLOR},
      activeTintColor: 'white',
      inactiveTintColor: 'white',
    }}  
  >
    <VirtualClassTab.Screen name="Catalogue" component={VirtualClassScreen[0]}/>
    <VirtualClassTab.Screen name="My Class" component={VirtualClassScreen[1]}/>
  </VirtualClassTab.Navigator>
)

const VirtualClassStackComponent = ({navigation}) => {
  return (
    <VirtualClassStack.Navigator 
      initialRouteName="Main VC" 
      screenOptions={{
        stackAnimation: 'fade',
        headerStyle: {
          backgroundColor: theme.PRIMARY_DARK_COLOR,
        }
      }}
    >
      <VirtualClassStack.Screen name="Main VC" component={VirtualClassTabComponent}
        options={{
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>Virtual Class</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackButton/>
            </TouchableOpacity>
          ),
        }}
      />
      <VirtualClassStack.Screen name="Details VC" component={VirtualClassScreen[2]}
        options={({route}) => ({
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>{route.params.judul}</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main VC')}>
              <BackButton/>
            </TouchableOpacity>
          ),
        })}
      />
      <VirtualClassStack.Screen name="Details Paid VC" component={VirtualClassScreen[3]}
        options={ ({ route }) => ({
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>{route.params.judul}</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main VC')}>
              <BackButton/>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={route.params?.notif}>
              <Icon name="notifications" size={30} color={theme.PRIMARY_ACCENT_COLOR}/>
            </TouchableOpacity>
          )
        })}
      />
    </VirtualClassStack.Navigator>
  )
}

const TryoutTabComponent = () => (
  <TryoutTab.Navigator
    initialRouteName="Catalogue"
    tabBarOptions={{
      indicatorStyle: {backgroundColor: 'white'},
      style: {backgroundColor: theme.PRIMARY_DARK_COLOR},
      activeTintColor: 'white',
      inactiveTintColor: 'white',
    }}  
  >
    <TryoutTab.Screen name="Catalogue" component={TryoutScreen[0]}/>
    <TryoutTab.Screen name="My Tryout" component={TryoutScreen[1]}/>
  </TryoutTab.Navigator>
)

const TryoutStackComponent = ({navigation}) => {
  return (
    <TryoutStack.Navigator
      initialRouteName="Main Tryout"
      screenOptions={{
          stackAnimation: 'fade',
          headerStyle: {
            backgroundColor: theme.PRIMARY_DARK_COLOR,
            borderRadius: 25
          }
        }}
    >
      <TryoutStack.Screen name="Main Tryout" component={TryoutTabComponent}
        options={{
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>Tryout</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackButton/>
            </TouchableOpacity>
          ),
        }}
      />
      <TryoutStack.Screen name="Details Tryout" component={TryoutScreen[2]}
        options={ ({ route }) => ({
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>{route.params.name}</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main Tryout')}>
              <BackButton/>
            </TouchableOpacity>
          ),
        })}
      />
      <TryoutStack.Screen name="Details Unfinished Tryout" component={TryoutScreen[3]}
        options={ ({ route }) => ({
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>{route.params.name}</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main Tryout')}>
              <BackButton/>
            </TouchableOpacity>
          ),
        })}
      />
      <TryoutStack.Screen name="Details Finished Tryout" component={TryoutScreen[4]}
        options={ ({ route }) => ({
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>{route.params.name}</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main Tryout')}>
              <BackButton/>
            </TouchableOpacity>
          ),
        })}
      />
      <TryoutStack.Screen name="Conduct Tryout" component={TryoutConductScreen}
        options={({ route }) => ({
          headerTopInsetEnabled: false,
          headerCenter: () => <Text style={styles.headerText}>{route.params.name}</Text>,
          headerLeft: () => null,
        })}
      />
    </TryoutStack.Navigator>
  )
}

export const BottomTabComponent = () => {
  const { authState } = React.useContext(AuthContext)

  return (
  <BottomTab.Navigator
    disabled={true}
    initialRouteName={ (authState?.isProfileSet === false) ? "Profile" : "Home"}
    lazy={false}
    tabBarOptions={{
      activeTintColor: 'white',
      labelStyle: {fontSize: 11},
      activeBackgroundColor: theme.PRIMARY_DARK_COLOR
    }}
    resetOnBlur={false}
  >
    <BottomTab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarButton: props => <TouchableOpacity {...props} disabled={authState?.isProfileSet ? false : true}/>,
        tabBarIcon: ({color}) => (
            <Icon name="home" style={{marginTop: 9}} color={color} size={30} />
          )
      }}
    />
    <BottomTab.Screen name="Activity" component={ActivityScreen} 
      options={{
        tabBarButton: props => <TouchableOpacity {...props} disabled={authState?.isProfileSet ? false : true}/>,
        tabBarIcon: ({color}) => (
            <Icon name="assignment" style={{marginTop: 9}} color={color} size={28} />
          )
      }}
    />
    <BottomTab.Screen name="Store" component={StoreScreen}     
      options={{
        tabBarButton: props => <TouchableOpacity {...props} disabled={authState?.isProfileSet ? false : true}/>,
        tabBarIcon: ({color}) => (
            <Icon name="local-grocery-store" style={{marginTop: 9}} color={color} size={28} />
          )
      }}
    />
    <BottomTab.Screen name="Profile" component={ProfileScreen} 
      options={{
        tabBarIcon: ({color}) => (
            <Icon name="person" style={{marginTop: 9}} color={color} size={30} />
          )
      }}/>
    <BottomTab.Screen name="Virtual Class" component={VirtualClassStackComponent}  options={{
        tabBarButton: () => null,
        tabBarVisible: false, // if you don't want to see the tab bar
      }}/>
    <BottomTab.Screen name="Tryout" component={TryoutStackComponent}  options={{
        tabBarButton: () => null,
        tabBarVisible: false, // if you don't want to see the tab bar
      }}/>
  </BottomTab.Navigator>
)}

export const AuthStackComponent = () => (
  <AuthStack.Navigator
    headerMode="none"
    initialRouteName="login"
    screenOptions={{
      headerShown: false,
      stackAnimation: 'fade'
    }}
    resetOnBlur={true}
  >
    <AuthStack.Screen name='login' component={AuthScreen[0]} />
    <AuthStack.Screen name='register' component={AuthScreen[1]} />
  </AuthStack.Navigator>
)

export const IntroStackComponent = () => (
  <IntroStack.Navigator
    initialRouteName="1"
    screenOptions={{
      headerShown: false,
    }}
  >
    <IntroStack.Screen name="1" component={TutorialScreen} />
  </IntroStack.Navigator>
)