# Development Environment & Dependencies

Point In Time was built using the Sencha Touch SDK Version 2.4.2.  Sencha CMD version 6.0.1.76 was used for software lifecycle management and deployment.

## Point In Time

The mobile application has a server backend which is available to install on your server environment.  It handles project management and data storage.  The application sends data to the configured data store corresponding to control panel project key.  Control Panels can be developed independently and data can be sent to different destinations, see the source code for survey examples and how to edit the included assessments.

### Deployment

Point In Time is an HTML5 based application, it utilizes Phonegap/Cordova for device functionality.  The app can be deployed on a web server or can be packaged with Phonegap or Cordova to enable native device functionality/ the app once packaged appropriately can be deployed to the Apple app store or Google Play/respective app stores.

## Operating System Support

Point In Time uses the Sencha Touch 2.4 SDK, which supports:

- iOS 6+ *
- Android 2.3+ *
- Win Phone 8.1 (with IE11)
- BlackBerry 10
- Tizen

## Sencha Touch

Sencha Touch is a high-performance HTML5 mobile application framework. Built for enabling world-class user experiences, Sencha Touch enables developers to build powerful apps that work on iOS, Android, BlackBerry, Windows Phone, and others.

Learn more about Sencha Touch:
[https://www.sencha.com/products/touch/](https://www.sencha.com/products/touch/ "Sencha Touch")

Download Sencha Touch:
[https://www.sencha.com/products/touch/download/](https://www.sencha.com/products/touch/download/ "Sencha Touch Download")

## Sencha CMD

Sencha Cmd is used to build Sencha projects from scaffolding a new project, to minifying and deploying your application to production, Sencha Cmd provides a full set of lifecycle management features to compliment your Sencha applications.  Sencha CMD can be used to build the application with native packaging and is compatible with Apache Cordova & Adobe PhoneGap.

Learn more about Sencha CMD:
[https://www.sencha.com/products/extjs/#sencha-cmd](https://www.sencha.com/products/extjs/#sencha-cmd "Sencha CMD")


Sencha CMD 6.x Documentation:
[http://docs.sencha.com/cmd/6.x/index.html](http://docs.sencha.com/cmd/6.x/index.html "Sencha CMD 6")

Sencha CMD Download:
[https://www.sencha.com/products/extjs/cmd-download/](https://www.sencha.com/products/extjs/cmd-download/ "CMD Download")

Sencha CMD Requires the JRE Java Runtime Environment 1.7+ most features will work with 1.6 (the minimum supported version). The JRE Is provided as included with the Sencha CMD download.

Ruby is required to restyle the app using Compass.  Compass and Ruby requirements are outlined in the CMD documentation: [http://docs.sencha.com/cmd/6.x/intro_to_cmd.html](http://docs.sencha.com/cmd/6.x/intro_to_cmd.html)


## Apache Cordova

Point In Time was designed to be compatible with Apache Cordova CLI 5.1.1

Apache Cordova is a set of device APIs that allow a mobile app developer to access native device function such as the camera or accelerometer from JavaScript. Combined with a UI framework such as jQuery Mobile or Dojo Mobile or Sencha Touch, this allows a smartphone app to be developed with just HTML, CSS, and JavaScript.

When using the Cordova APIs, an app can be built without any native code (Java, Objective-C, etc.) from the app developer. Instead, web technologies are used, and they are hosted in the app itself locally (generally not on a remote http server).

And because these JavaScript APIs are consistent across multiple device platforms and built on web standards, the app should be portable to other device platforms with minimal to no changes.

Apps using Cordova are still packaged as apps using the platform SDKs, and can be made available for installation from each device's app store.

Cordova provides a set of uniform JavaScript libraries that can be invoked, with device-specific native backing code for those JavaScript libraries. Cordova is available for the following platforms: iOS, Android, Blackberry, Windows Phone, Palm WebOS, Bada, and Symbian.

If you want to use Cordova in your mobile application, take a look at their documentation. It includes Getting Started guides, the JavaScript APIs reference and examples, instructions on Upgrading from previous versions of Cordova, how to write your own Cordova plugin, and more. The selector in the top-right corner of the documentation will let you pick different Cordova versions and language translations. And there is a registry of third-party plugins that can be used in your mobile application.


Adobe Cordova 5.1.1 Documentation:
[http://cordova.apache.org/docs/en/5.1.1/index.html](http://cordova.apache.org/docs/en/5.1.1/index.html)

Apache Cordova graduated in October 2012 as a top level project within the Apache Software Foundation (ASF). Through the ASF, future Cordova development will ensure open stewardship of the project. It will always remain free and open source under the Apache License, Version 2.0.

Installing Apache Cordova requires NodeJs:
[https://nodejs.org/](https://nodejs.org/)

## Adobe PhoneGap & PhoneGap Build

Point In Time was designed to be compatible with Apache Cordova CLI 5.1.1 / Phonegap version 'cli-5.1.1.'.

PhoneGap is an open source framework for quickly building cross-platform mobile apps using HTML5, Javascript and CSS.

PhoneGap:
[http://phonegap.com/](http://phonegap.com/)

Building applications for each device–iPhone, Android, Windows Mobile and more–requires different frameworks and languages. PhoneGap solves this by using standards-based web technologies to bridge web applications and mobile devices. Since PhoneGap apps are standards compliant, they’re future-proofed to work with browsers as they evolve.

PhoneGap explained visually:
[http://phonegap.com/2012/05/02/phonegap-explained-visually/](http://phonegap.com/2012/05/02/phonegap-explained-visually/)

The PhoneGap code was contributed to the Apache Software Foundation (ASF) under the name Apache Cordova and graduated to top-level project status in October 2012. Through the ASF, future PhoneGap development will ensure open stewardship of the project. It will always remain free and open source under the Apache License, Version 2.0.

How Apache Cordova becomes PhoneGap and PhoneGap, Cordova, and what’s in a name?: [http://phonegap.com/2012/03/19/phonegap-cordova-and-what%E2%80%99s-in-a-name/](http://phonegap.com/2012/03/19/phonegap-cordova-and-what%E2%80%99s-in-a-name/)

Installing Apache PhoneGap requires NodeJs:
[https://nodejs.org/](https://nodejs.org/)

## PhoneGap Build

PhoneGap Build is the Adobe cloud service that allows you to quickly build mobile applications and easily compile them without SDKs, compilers and hardware.

Phonegap Build:
[https://build.phonegap.com](https://build.phonegap.com)

Sencha CMD supports PhoneGap, Cordova & Phonegap build.  Point In Time has been tested with PhoneGap & Cordova version 5.1.1.  PhoneGap is currently at version cli-5.1.1 (IOS: 3.8.0 / Android: 4.0.2 / Windows Mobile: 3.8.1).

Point In Time is designed and tested to work with the following PhoneGap/Cordova plugins / NPM Repository:


	cordova-plugin-device
	cordova-plugin-geolocation
	cordova-plugin-inappbrowser
	cordova-plugin-network-information
	cordova-plugin-settings
	cordova-plugin-splashscreen
	cordova-plugin-statusbar
	cordova-plugin-whitelist


## Sencha & Point In Time

Touch is used as the main javascript framework for the Point in Time application, it is heavily utilized on the user interface. Sencha CMD is used to package the application for web and/or native deployment.

Please read the Sencha CMD guide for information about how Sencha Touch & Sencha CMD integrate with Apache Cordova & Adobe Phonegap: [https://docs.sencha.com/cmd/6.x/cordova_phonegap.html](https://docs.sencha.com/cmd/6.x/cordova_phonegap.html)

## Apple Store

See the developer portal for App store guidelines: [https://developer.apple.com/app-store/marketing/guidelines/](https://developer.apple.com/app-store/marketing/guidelines/)

### iOS Application Provisioning Requirements

Four provisioning data files are needed for this process:

- **Certificate Signing Request (CSR) file** - The certificate signing request is a temporary file you submit to Apple when you request a digital certificate. This file includes a public encryption key that is matched with the private key file that you will create using a Digital Signing Utility.

- **Private Key file**  - The private key (PK) file is created at the same time as the CSR file. It is used in the MyEclipse Mobile Tools application build process to encrypt the key file. This file should be kept safe and private.

- **Digital Certificate file** - An iOS application must be digitally signed with a valid digital certificate provided by Apple in order for it to install and run successfully on an iOS device. This file includes the public encryption key provided by the CSR file.

- **Provision Profile file** - In addition to the digital signature requirement, an application can be installed and run only on iOS devices configured with a provision profile (e.g., distribution.mobile-provision) that authorizes the application. A provision profile is a document that lists the digital certificates, the devices, and the IDs of the applications allowed to operate on a device.

You can read about iOS Signing on Phonegap Build:
[http://docs.build.phonegap.com/en_US/signing_signing-ios.md.html](http://docs.build.phonegap.com/en_US/signing_signing-ios.md.html)


### Apple iOS Developer Program Membership Requirement

A membership in the Apple iOS Developer Program is required to access the iOS Provision Portal, a data creation service used in this tutorial. Visit [http://developer.apple.com/programs/ios](http://developer.apple.com/programs/ios) to learn about the  program benefits and cost.
Note: There is a cost from Apple for an iOS Developer Program membership.

## Android Google Play

You can read about Android signing requirements on Phonegap Build: [http://docs.build.phonegap.com/en_US/signing_signing-android.md.html#Android%20Signing](http://docs.build.phonegap.com/en_US/signing_signing-android.md.html#Android%20Signing)

See the launch checklist for detailed information about the Google Play submission process:
[http://developer.android.com/distribute/tools/launch-checklist.html](http://developer.android.com/distribute/tools/launch-checklist.html)


### Launcher Icons

A launcher icon is a graphic that represents an application. They should be a 32-bit PNG with an alpha channel for transparency. An application should have icons for all of the generalized screen densities as outlined below:

ldpi (120dpi) - 36 x 36 px
mdpi (160dpi) - 48 x 48 px
hdpi (240dpi) - 72 x 72 px
xhdpi (320dpi) - 96 x 96 px

Launcher icons are of the first thing that a user will see of an application on Google Play, so care should be taken to make the launcher icon visually appealing and meaningful.

#### High Resolution Application Icon
Applications on Google Play require a high fidelity version of the application icon. It is only used by Google Play, and does not replace the application launcher icon. The specifications for the high-resolution icon are:

32-bit PNG with an alpha channel
512 x 512 pixels
Maximum size of 1024KB

The Android Asset Studio [http://android-ui-utils.googlecode.com/hg/asset-studio/dist/icons-launcher.html](http://android-ui-utils.googlecode.com/hg/asset-studio/dist/icons-launcher.html) is a helpful tool for creating suitable launcher icons and the high-resolution application icon.

####  Screen shots
Google play requires a minimum of two and a maximum of eight screen shots for an application. They will be displayed on an application’s details page in Google Play.

The specs for screen shots are:

24 bit PNG or JPG with no alpha channel
320w x 480h OR 480w x 800h OR 480w x 854h. Landscaped images will be cropped.

#### Promotional Graphic

This is an optional image used by Google Play.

It is a 180w x 120h 24 bit PNG or JPG with no alpha channel
No border in art.

#### Feature Graphic
Used by the featured section of Google Play. This graphic may be displayed alone without an application icon.

1024w x 500h PNG or JPG with no alpha channel and no transparency.
All of the important content should be within a frame of 924x500. Pixels outside of this frame may be cropped for stylistic purposes.

This graphic may be scaled down: use large text and keep graphics simple.

#### Video Link

This is a URL to a YouTube video showcasing the application. The video should be 30 seconds to 2 minutes in length and showcase the best parts of your application.