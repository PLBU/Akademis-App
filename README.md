# Akademis.id React Native App

![Current Version](https://img.shields.io/badge/version-v1.3.2-blue)

## Table of Contents
- [Getting Started](#getting-started)
	- [Tools Required](#tools-required)
	- [Installation](#installation)
- [Development](#development)
    - [Part 1: Heading](#part-1-heading)
	  - [Step 1: Subheading](#step-1-subheading)
	  - [Step 2: Subheading](#step-2-subheading)
	- [Part 2: Heading](#part-2-heading)
- [Running the App](#running-the-app)
- [Deployment](#deployment)

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

### Tools Required

All tools required go here. You would require the following tools to develop and run the project:

* A text editor or an IDE (like IntelliJ)
* Mention the other tools required for the project 

### Installation

All installation steps go here.

* Installing a particular tool
  * Steps to complete it
  
* Installing another tool

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

Steps and commands for running the app are to be included here

* Example steps:
  ```
    Example command
  ```

## Deployment

This section is completely optional. Add additional notes about how to deploy this on a live system

## Acknowledgments

This section can also be called as `Resources` or `References`

* Code Honor if someone's work was referred to
* Tutorials followed
* Articles that helped
* Inspiration
* etc

[//]: # (HyperLinks)
[tags]: https://github.com/madhur-taneja/README-template/tags
