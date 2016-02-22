# Folder Structure

The following listing provides a short description of each file and directory, the complete list of the generated Sencha Touch files can be found in the Sencha Cmd documentation [CMD 6.x Docs](https://docs.sencha.com/cmd/6.x/touch/cmd_app.html):

- **app** - The directory containing the Models, Views, Controllers, and Stores for your app.
- **docs** - The directory containing the API documentation.
- **phonegap** - Phonegap files, including icons, startup screens and PhoneGap config.xml.
	- **hooks** Hooks are pieces of code that Cordova CLI executes at certain points in your Cordova or PhoneGap application build.
	- **platforms** Phonegap platform folder, used by Phonegap CLI
	- **plugins** Phonegap plugins folder, used by Phonegap CLI
	- **www** Phonegap webroot
		- **css** Phonegap app CSS
		- **img** Phonegap app image folder
		- **js** Phonegap app javascript
		- **res** Phonegap app resource folder
			- **icon** - Phonegap app icon folder
				- **android** - Android Icons
				- **bada** - Baba Icons
				- **baba-wac** - Baba WAC Icons
				- **blackberry** - Blackberry Icons
				- **ios** - Apple IOS Icons
				- **tizen** - Tizen Icons
				- **webos** - Web OS Icons
				- **windows-phone** - Windows Phone Icons
			- **screen** - Phonegap app screen image folder
				- **android** - Android Images
				- **bada** - Baba Images
				- **baba-wac** - Baba WAC Images
				- **blackberry** - Blackberry Images
				- **ios** - Apple IOS Images
				- **tizen** - Tizen Images
				- **webos** - Web OS Images
				- **windows-phone** - Windows Phone Images
		- **resources** additional resources
		- **spec** Phonegap libraries
		- **app.js** - The main JavaScript entry point for your app.
		- **config.xml** - Phonegap Config file
		- **icon.png** - Default Icon File
		- **splash.png** - Default splash screen image
		- **spec.html** - Phonegap Code
		- **index.html** - App Index file
	- **config.xml** - Phonegap Config file
- **plugin** - Sencha Touch Plugins used in app
- **guides** - These help guides
- **app.js** - The main JavaScript entry point for your app.
- **app.json** - The configuration file for your app.
- **index.html** - The HTML file for your app.
- **resources** - The directory containing the CSS and the images for your app
- **touch** - The Sencha Touch SDK
	- **src** - Touch SRC folder
		- **plugin** - Touch Plugin folder <--- contains plugins

app.js, the main entry point for your app, it is the first script that is called when the application is executed.  If you intend to modify the application, this is a good starting point.

The launch function is the entry point to your application. In the default application, hide the application loading indicator, and create an instance of our Main view and add it to the Viewport.

The Viewport is an {@link Ext.layout.Card} Card Layout to which you can add application components. The default app adds the Main view to the viewport so it becomes visible on the screen.

Look at the code inside the Main view.

Open app/view/Main.js in your code editor and change a title line to:

    title: 'Home Tab'

Then change another line as follows:

    title: 'Woohoo!'

Refresh the app in your browser to see the effects of your changes.
