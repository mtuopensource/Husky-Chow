# Husky Chow
A simple app to shows today's menu in the Michigan Tech dining halls. Created in HTML, JavaScript, and CSS using Ionic and Adobe PhoneGap.

<p align="center">
  <img width="256" height="256" src="https://github.com/mtuopensource/Husky-Chow/raw/master/resources/icon.png">
</p>

## Table of Contents
 - [Documentation](#documentation)
 - [Installation](#installation)
 - [Deploying](#deploying)
 - [Copyright and License](#copyright-and-license)

## Documentation
 We require that all changes are documented clearly and concisely. Please read the [contributing guidelines](https://github.com/mtuopensource/husky-chow/blob/master/CONTRIBUTING.md) for more information.

## Installation
1.  Clone this repository: `git clone https://github.com/mtuopensource/husky-chow.git`
2.  Open a terminal and navigate to the root directory of the project
3.  Run `npm install`
4.  Install the Ionic CLI: `npm install -g ionic`
5.  Run `ionic serve`

## Deploying
* PWA - Uncomment [this](https://github.com/mtuopensource/Husky-Chow/blob/master/src/index.html#L17), run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Android - Run `ionic cordova run android --prod`
* iOS - Run `ionic cordova run ios --prod`

## Packaging for Release (Android)
1.  `ionic cordova build --release android`
2.  `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my.keystore android-release-unsigned.apk alias`
3.  `zipalign -v 4 android-release-unsigned.apk android-release.apk`

## Copyright and License
Code released under [MIT License](LICENSE).
