# Akademis.id React Native App

![Current Version](https://img.shields.io/badge/version-v1.3.2-blue)

## Table of Contents
- [Getting Started](#getting-started)
	- [Technologies Required](#technologies-required)
	- [Installation](#installation)
- [Libraries](#libraries)
- [Running the App](#running-the-app)
- [Publishing](#publishing)

## Getting Started
*Disclaimer: This project is built for Akademis.id, I do not have the rights for claiming this application* <br/>
Akademis.id mobile app v1.3.2 mainly has 3 big features which are Tryout, Virtual Class, Payment system integrated with backend web service. The project structure is visualized below: 

```
	Akademis-App
	├── android (This directory should be modified only for use that is related to Android OS)
	├── ios (This directory should be modified only for use that is related to iOS)
	├── index.js (Author only modify this for global component styling such as font)
	├── app.json
	├── package.json
	├── README.md
	├── and other file that is not needed to be modified 
	└── src
		├── assets
		│	├── icons
		│	└── images (The advertisement images are here)
		├── components
		│	├── App.js
		│	├── Context.js
		│	└── Nav.js
		├── data
		│	└── index.js (Arrays of majors and universities)
		├── screens
		│	├── ActivityScreen.js (Known as riwayat in production)
		│	├── AuthScreen.js (Both login & register screens)
		│	├── HomeScreen.js
		│	├── ProfileScreen.js
		│	├── StoreScreen.js
		│	├── TryoutConductScreen.js (When users are doing the tryout screen)
		│	├── TryoutScreen.js (Catalogue, My Tryout, Detail of unpaid Tryout, Detail of unfinished, Detail of finished tryout screens)
		│	├── TutorialScreen.js
		│	└── VirtualClassScreen.js (Catalogue, My VC, Detail of unpaid VC, Detail of paid VC screens)
		└── styles
			├── mainScreenStyle.js (All styling is located here except for AuthScreen & TutorialScreen)
			└── theme.js (Colors are located here)
```

### Technologies Required
* React Native Command Line Interface
* Node.js
* Java Development Kit
* Android Studio
* Android SDK
* Physical Android Device or an Emulator (Only available for PC equipped with Intel processor)

### Installation
For full documentation on how to install the technologies above and set up your environment, follow the instructions on this site <br/>
https://reactnative.dev/docs/environment-setup <br/>
(Choose React Native CLI Quickstart | Your PC OS | Android )

## Libraries
* https://www.npmjs.com/package/@react-native-community/async-storage
* https://www.npmjs.com/package/@react-native-community/google-signin
* https://www.npmjs.com/package/@react-native-community/masked-view
* https://www.npmjs.com/package/@react-native-community/netinfo
* https://www.npmjs.com/package/@react-native-community/picker
* https://reactnavigation.org/docs/getting-started
* https://reactnavigation.org/docs/bottom-tab-navigator/
* https://reactnavigation.org/docs/material-top-tab-navigator/
* https://reactnavigation.org/docs/stack-navigator/
* https://momentjs.com/docs/
* https://www.npmjs.com/package/react-native-app-intro-slider
* https://www.npmjs.com/package/react-native-axios
* https://www.npmjs.com/package/react-native-chart-kit
* https://www.npmjs.com/package/react-native-collapsible
* https://github.com/react-native-device-info/react-native-device-info
* https://reactnativeelements.com/docs
* https://www.npmjs.com/package/react-native-gesture-handler
* https://www.npmjs.com/package/react-native-global-props
* https://www.npmjs.com/package/react-native-image-base64
* https://github.com/react-native-image-picker/react-native-image-picker
* https://callstack.github.io/react-native-paper/
* https://www.npmjs.com/package/react-native-reanimated
* https://www.npmjs.com/package/react-native-responsive-fontsize
* https://www.npmjs.com/package/react-native-safe-area-context?activeTab=versions
* https://www.npmjs.com/package/react-native-snap-carousel
* https://www.npmjs.com/package/react-native-splash-screen
* https://www.npmjs.com/package/react-native-stars
* https://github.com/react-native-svg/react-native-svg
* https://www.npmjs.com/package/react-native-table-component
* https://www.npmjs.com/package/react-native-thumbnail-video
* https://www.npmjs.com/package/react-native-vector-icons
* https://www.npmjs.com/package/react-native-webview
## Running the App
* Installing all the npm packages
  ```
    npm install
  ```
* Starting the Metro server (Open the terminal from the root of this project directory):
  ```
    npx react-native start
  ```
* Running the app in Physical Device or Emulator (Open the terminal from the root of this project directory):<br/>
 (If using physical device, make sure your device is already on developer mode and allowed the usb debugging pop-up) <br/>
  ```
    npx react-native run-android
  ```

## Publishing
* Make sure you've changed the versionCode and versionName to your desired option in <code>android/app/build.gradle</code>
  ```
    defaultConfig {
        applicationId "com.akademis"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 6  // Change this when updating to newer version
        versionName "1.3.2" // Change this when updating to newer version, (1.2.3 means 1 is for Major update, 2 is for Minor update, 3 is for patch)
    }
  ```
* Making a bundle release (Open the terminal from the root of this project directory):
  ```
    cd android
    ./gradlew bundleRelease
  ```
* Create new release (https://play.google.com/console/developers/5505865459155794257/app/4975345541804538006/tracks/production)
* Upload app.aab in <code>android/app/build/outputs/bundle/release</code> to the new release
* Give some description for this update
* Review and Roll out
