# Use Case Scenarios

This guide outlines common use case scenarios for the Point In Time mobile source code:

## Why should I use the Point in Time system?

The point-in-time (PIT) system supports regions to meet the Federal requirements for the annual census of individuals and families experiencing homelessness and to better understand the scope of homelessness in the community. The system includes a mobile app that uses location services and contains survey options that include HUD-required data elements to capture required information for each category of respondent. Identifying information is not included. The app is compatible with all current mobile devices.  The data store provides a place for regions to capture data that is submitted from the field and is then available for reporting and analysis. Finally, the Command Center allows the Count Managers to monitor the event in real time using a map of the count area which shows when and where a survey is submitted. This feature allows coordinators to ensure that there is complete coverage of the area; that the teams are staying within the regional boundaries; and supports the need to dispatch additional support teams to help transport or meet the emergency needs of people experiencing homelessness.

## What good situations where using this system would help me and my group?

This system is good for any region that is required to meet the HUD point-in-time requirements where there is data that would need to be captured outside of an existing Homeless Management Information System (HMIS). It is particularly helpful for regions that have people staying outside or who are otherwise unsheltered during the night of the count, whose information would not be in an HMIS system for that day. It is also helpful for domestic violence, faith based or other providers who do not use an HMIS system.

## Software Deployment

Point In Time is a HTML5 based application designed for mobile devices.  It can be deployed using a web server.  There are no special requirements for web hosting, but your web host should be configured for the Sencha Touch MIME types, notably .json and .appcache  (application/json, and text/cache-manifest respectively).

The application has been tested to render successfully with Google Chrome, Mozilla Firefox, Microsoft Internet Explorer 11 and Microsoft Edge.

Point In Time has been successfully deployed to the Apple App & Google Play Store's using native packaging. The software has been tested with Apache Cordova and Adobe PhoneGap.   The application utilizes native device functionality by overriding the default HTML5 functionality.

Adobe PhoneGap Build can be used to perform native packaging remotely, which requires less software dependencies.

The application can be packaged using tools like Titanium Accelerator, Cocoon or Sencha Space / Web Application Manager, but these deployment methods are untested.

The software should work on all PhoneGap and Sencha Touch 2 supported devices, this includes all modern Apple iOS and Google Android devices, but may also work with Microsoft Windows Mobile, Surface or Blackberry 10.

## Common Practices / Code Modifications

The application title is easy to change, remember a new App ID will be required if you intend to publish the application on the Apple or Google app stores.  Look at the provided config.xml example for guidance.  The application ID follows the com.yourcompanyname.applicationname format.

If using Google Maps, you are encouraged to acquire your own map key: [Google Maps API](https://developers.google.com/maps/signup?hl=en "https://developers.google.com/maps/signup?hl=en")

You can change the home page image, about icon and about page image by replacing the images provided in the PointInTime/resources/images folder.

The application source is provided for 3 example surveys that can be executed for individuals or households.  They are "Sheltered", "Sheltered" and "Observation", you can use these templates as is, or modify them to your respective requirements.  Please ensure the receiving data source can accommodate any modifications.  Your form/survey submissions should be sent over a secured connection and submit using standard form parameters.

The application has been designed to work with the Point In Time control panel, if you have special teamwork and project requirements, you should look to adapting the control panel and modifying the project manager functionality.

Special considerations should be made to where you intend to send the data. There should be appropriate security measures in place.

The software currently invokes HTML5 local storage for client data, if you need better security requirements or more storage you may consider other storage solutions, some possibilities are outlined below:

	Local Storage = persistent and scoped to the domain. At the moment two storage types are usually mentioned:
		'default' = stores things in name/value pairs
		Web SQL (aka Web Database) = uses a SQL database

	Session Storage = non persistent and scoped only to the current window

	Cookies = Traditional form of local storage stores name/value pairs per domain.  Not recommended.

###Local and session storage

Web storage offers two different storage areas—local storage and session storage—which differ in scope and lifetime. Data placed in local storage is per origin (the combination of protocol, hostname, and port number as defined in the same-origin policy) (the data is available to all scripts loaded from pages from the same origin that previously stored the data) and persists after the browser is closed. Session storage is per-origin-per-window and is limited to the lifetime of the window. Session storage is intended to allow separate instances of the same web application to run in different windows without interfering with each other, a use case that's not well supported by cookies.  Point In Time currently uses local storage.

Web storage provides far greater storage capacity (5 MB per origin in Google Chrome, Mozilla Firefox, and Opera; 10 MB per storage area in Internet Explorer; 25MB per origin on BlackBerry 10 devices) compared to 4 kB (around 1000 times less space) available to cookies.

### Web SQL Database
Web SQL Database is a web page API for storing data in databases that can be queried using a variant of SQL. The API is supported by Google Chrome, Opera, Safari and the Android Browser.


[W3 Web Database Specification](http://www.w3.org/TR/webdatabase/).

The [W3C Web Applications Working Group](http://www.w3.org/) ceased working on the specification in November 2010, citing a lack of independent implementations (i.e., the use of a database system other than SQLite as the backend) as the reason the specification could not move forward to become a W3C Recommendation.

One potential alternative storage standard is [IndexedDB](http://www.w3.org/TR/IndexedDB/).

### IndexedDB / Indexed Database API

The Indexed Database API, or IndexedDB (formerly WebSimpleDB), is a recommended web browser standard interface for a local database of records holding simple values and hierarchical objects. IndexedDB was initially proposed by Oracle in 2009.

[W3 IndexedDB Specification](http://www.w3.org/TR/IndexedDB/)

IndexedDB could be used for browser implemented functions, such as bookmarks, as well as web applications, such as email. An open-source reference implementation of the Indexed Database API exists for testing and experimentation purposes.

Preliminary support for IndexedDB is included by Firefox (since version 4), Google Chrome (since version 11), and by Internet Explorer 10 Consumer Preview and Metro style apps. Apple support is provided through Safari 8 for both iOS 8 and Mac OS X.

Safari, Chrome 4, and Opera support also support the client-side database storage called Web SQL Database. On November 18, 2010, the W3C announced that the Web SQL database specification has reached an impasse and is no longer being actively worked on. Firefox developers have publicly stated that the lack of WebSQL Database support in Firefox is on purpose, as they believe it is a problematic standard which requires an alternative (hence IndexedDB).

##Styling and Theming

### Icons and Splash Screens

The source code includes a full suite of icons and splash screens for a myriad of devices including Apple iPhone, Google Android and tablet computers.  You are encouraged to provide your own graphics with your application.

Please read about icon and splash screen requirements in the dependencies guide:
[Development Environment and Dependencies](https://docs.sencha.com/touch/2.4/components/theming.html).


### SASS / Syntactically Awesome Style Sheets

Point In Time uses Sencha Touch SASS Theming, Sencha CMD is required to rebuild the SASS themes in this package, it is possible to define your own style sheets but not recommended.  Look at resources/sass/app.scss for icon, font and theme SASS components.

Read about Sencha Touch theming in the Sencha Touch Documentation:
[Theming in Sencha Touch](#!/guide/development_environment_and_dependencies).




SASS is a stylesheet language initially designed by Hampton Catlin and developed by Natalie Weizenbaum. SASS enables you to add programmatic features to your CSS declarations by supporting following constructs:

- Variables
- Nesting
- Inheritance
- Math Functions
- Color Transformations
- Mixins (parameterized functions)
- Declaring and Using Variables

Using SASS you can declare variables that can be used throughout your stylesheet, thereby enabling you to make global changes by tweaking a single value.

Variables begin with a dollar sign ($) and are declared just like properties. They can have any value that's allowed for a CSS property, such as colors, numbers (with units), or text.

The following example illustrates the use of variables and their effect on the generated CSS file:

		$silver: #c0c0c0;
		.myClass {
			background-color: $silver;
		}

Sencha Touch UI Code can be included, an example used in Point In Time is custom buttons:


		@include sencha-button-ui('orange',#ff8000,'glossy');

This would define an orange button.