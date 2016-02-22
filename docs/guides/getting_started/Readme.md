# Getting Started

{@img mobile_app_diagram.png PIT Mobile Diagram}


Point In Time is an HTML5 based application.  The app can be deployed on a web server or can be packaged with PhoneGap or Cordova, once packaged it can be deployed to the Apple app store, Google Play and other mobile application providers.

## Web Installation

Developing a Sencha Touch application is similar to developing a website.  There is no restriction about the web hosting service to use.

However, you have to consider what your Sencha Touch application needs to work:

The application requires a suitable web host.  This can be local.  There are no special web server requirements, the application has been tested on Apache & Microsoft IIS. Your web host should be configured for the Sencha Touch MIME types, notably .json and .appcache  (application/json, and text/cache-manifest respectively).

The code of the application is based on the Model View Controller architecture and the source code can be found in the 'app' folder.

To install the development version of the app, simple setup your website and copy the code into your website folder.  You should use Sencha CMD for your life-cycle management, it is not required but it is a very useful tool for deployment of code, it handles minifying and can be used to package the application for native release with PhoneGap or Cordova.   Sencha CMD production builds are located in the build\production\PointInTime folder by default.  Production code is notably faster, uses far less bandwidth and is easier to deploy.

Learn more about Sencha CMD: [https://www.sencha.com/products/extjs/#sencha-cmd](https://www.sencha.com/products/extjs/#sencha-cmd "Sencha CMD")

Sencha CMD 6.x Documentation: [http://docs.sencha.com/cmd/6.x/index.html](http://docs.sencha.com/cmd/6.x/index.html "Sencha CMD 6")

Sencha CMD Download: [https://www.sencha.com/products/extjs/cmd-download/](https://www.sencha.com/products/extjs/cmd-download/ "CMD Download")

Sencha CMD Requires the JRE Java Runtime Environment 1.7+ most features will work with 1.6 (the minimum supported version). The JRE Is provided as included with the Sencha CMD download.

Ruby is required to restyle the app using Compass.  Compass and Ruby requirements are outlined in the CMD documentation: [http://docs.sencha.com/cmd/6.x/intro_to_cmd.html](http://docs.sencha.com/cmd/6.x/intro_to_cmd.html)



### Notes

The server should be configured to support the Sencha Mime Types for known extensions, notably:

**.json** - The MIME media type for JSON text is application/json. The default encoding is UTF-8.

**.appcache** - The MIME media type for appcache is text/cache-manifest. The default encoding is UTF-8.

If you are running the IIS web server on Windows, manually add application/x-json as a MIME Type for Sencha Touch to work properly. For information on adding this MIME type see this [link](http://stackoverflow.com/a/1121114/273985).

If your application is built only on third party REST API, you need no server side languages or databases to get the application up and running.

The Point In Time application works concurrently with the PIT Control Panel, the app acts as a front end for the assessments which are transmitted to the control panel.  The control panel also handles project management.  Code is provided to get this up and running.


## Mobile Deployment / Native Packaging

The Point In Time application was designed to be natively packaged using PhoneGap Build (on the server side), but could be built locally using Cordova, an example PhoneGap Build config.xml and resource manifest have been provided for PhoneGap Build with PhoneGap CLI 5.1.1 compatibility.

Look in the 'phonegap' folder for an example config.xml. Here you will have to set your application name, id and specify resource specific information about items to include like icons and splash screens.   Images for icons and splash screens have also been provided in the res folder.

Please read about native build requirements in the guide: [Development Environment and Dependencies](#!/guide/development_environment_and_dependencies) guide.

You can learn about the config.xml file in the Phonegap documentation: [http://docs.build.phonegap.com/en_US/configuring_basics.md.html#The%20Basics](http://docs.build.phonegap.com/en_US/configuring_basics.md.html#The%20Basics "Configuring The Basics")

You can read more about Sencha Touch / Cordova / PhoneGap Integration here: [https://docs.sencha.com/cmd/6.x/cordova_phonegap.html](https://docs.sencha.com/cmd/6.x/cordova_phonegap.html "Cordova/Phonegap Sencha CMD")

### Special Notes

Sencha CMD 6.0.1.76 seems to have a bug when initializing PhoneGap or Cordova apps, under certain conditions it does not create a required empty folder called '.cordova' needs to be inside the phonegap folder, and inside the .cordova folder needs to be a file called 'config.json' which contains the text '{}'.  This file is used to by PhoneGap Build to assign the local app a remote PhoneGap Build app id.

If you are using PhoneGap Build & Sencha CMD don't forget to configure your phonegap.local.properties file in the root of your application.  It should contain the following:

    phonegap.platform=ios android
    phonegap.build.remote=true
    phonegap.build.remote.username=[Your PhoneGap Build username]
    phonegap.build.remote.password=[Your PhoneGap Build password]
