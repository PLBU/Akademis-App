# Akademis.id React Native App

![Current Version](https://img.shields.io/badge/version-v1.3.2-blue)

## Table of Contents
- [Getting Started](#getting-started)
	- [Technologies Required](#technologies-required)
	- [Installation](#installation)
- [Libraries](#libraries)
- [Development](#development)
    - [Part 1: Heading](#part-1-heading)
	  - [Step 1: Subheading](#step-1-subheading)
	  - [Step 2: Subheading](#step-2-subheading)
	- [Part 2: Heading](#part-2-heading)
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

## Development

This section is completely optional. For big projects, the developement strategies are not discussed. But for small projects, you can give some insight to people. It has 2 benefits in my opinion:

1. It's a way to give back to the community. People get to learn from you and appreciate your work
2. You can refer the README in future as a quick refresher before an interview or for an old project to check if it can help you in your currect work

### Part 1: Heading

#### Step 1: Subheading

* Mention the steps here
  * You can also have nested steps to break a step into small tasks
  
#### Step 2: Subheading

* Mention the steps here.
  * You can also have nested steps to break a step into small tasks

For details now how everything has been implemented, refer the source code

### Part 2: Heading

* Mention the steps here

## Running the App
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

This section is completely optional. Add additional notes about how to deploy this on a live system
