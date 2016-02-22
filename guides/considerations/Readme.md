# Considerations

Test your application on many different devices.

Consider many different viewports and orientations.

The Point In Time coded has been tested on Android & IOS, as well as desktop platforms, but compatibility is not known with Blackberry and Windows Mobile.

Consider many different location service permutations.

If deploying with PhoneGap Build make sure you have a phonegap.local.properties file configured.  Sencha CMD provides a ‘phonegap.local.properties’ file to configure the build process, it is located in the root folder of your application. Not only can you use PhoneGap locally to create your own custom native projects but Sencha CMD is also integrated into PhoneGap Build allowing you to build your application easily without having the native development tools locally. Below is a sample of the properties file you can configure.
	
	
	# The following are supported platforms for local building (blackberry is version 10)
	# android, blackberry, ios, wp7, wp8
	#
	# The following are supported platforms for remote building (blackberry is version 6)
	# android, blackberry, ios, symbian, webos, wp7
	
	# This property can be a single platform or a space delimited list
	phonegap.platform=ios
	
	# This determines if build is remote (phonegap build) or local
	phonegap.build.remote=false
	
	# Username for PhoneGap Build
	phonegap.build.remote.username={username}
	
	# Password for PhoneGap Build
	phonegap.build.remote.password={password}

If you are using PhoneGap or Cordova, Read the documentation about config.xml, there are many different plugins and options with many possible configurations.

Config.xml documentation [Configuring Basics](http://docs.build.phonegap.com/en_US/configuring_basics.md.html)

Make sure your documentation references are referring to the correct version, there are many different versions of Sencha Touch, Sencha CMD, PhoneGap & Cordova.

If hosting on a web application, make sure your website is correctly configured with the necessary MIME types (json and appcache, see [Development Environment and Dependencies](#!/guide/development_environment_and_dependencies)).


#### Tips for Launcher Icons:

Simple and uncluttered – Launcher icons should be kept simple and uncluttered. This means excluding the name of the application from the icon. Simpler icons will be more memorable, and will easier to distinguish at the smaller sizes.


Icons should not be thin – Overly thin icons will not stand out well on all backgrounds.
Use the alpha channel – Icons should make use of the alpha channel, and should not been full-framed images.
