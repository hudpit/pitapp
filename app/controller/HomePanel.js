/**
 * ## Overview
 * This is the controller for Home Panel, it listens for events on the 'homepanel' view {@link PointInTime.view.Main}, it also listens for events on the 'loginpanel' {@link PointInTime.view.UserLogin} and 'locationform' {@link PointInTime.view.LocationEntry} views.   This controller handles application logic for login and for opening surveys upon successful authentication, this controller binds functions to home panel buttons for survey selection and authentication.
 *
 * Controllers are responsible for responding to events that occur within your app. If your app contains a Logout button that your user can tap on, a Controller listens to the Button’s tap event and takes the appropriate action. While View classes handles the display of data and Model classes handle the loading and saving of data, Controller classes are the glue that binds Views and Models together.
 */
Ext.define('PointInTime.controller.HomePanel', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax'
    ],
    /**
     * @cfg {Object} config
     * Controller config object
     */
    config: {
        /**
         * @cfg {Object} refs
         * Controller References / Leverages ComponentQuery
         */
        refs: {
            homepanel: 'homepanel',
            loginpanel: 'loginpanel'
        },
        /**
         * @cfg {Object} control
         *
         * Control Listens to app events
         */
        control : {
            'homepanel button[itemId=openhelp]': {
                tap: 'openEntryHelp'
            },
            'homepanel button[itemId=opensettings]': {
                tap: 'openSettings'
            },
            'homepanel image[itemId=homeImage]': {
                tap: 'openTools'
            },
            'homepanel button[itemId=openpittools]': {
                tap: 'openTools'
            },
            '[itemId=logoutbutton]': {
                tap: 'doLogout'
            },
            'loginpanel button[itemId=loginbutton]': {
                tap: 'onLoginTap'
            },
            'loginpanel button[itemId=openloginhelp]': {
                tap: 'onLoginHelpTap'
            },
            'locationfm button[itemId=openmanualhelp]': {
                tap: 'onManualHelpTap'
            }
        }
    },

    /**
     * Open Manual Address Help Panel called from Manual Location Entry / LocationEntry View
     * User taps the help button, on the manual help screen, an alert window is shown with manual address help.
     * {@link PointInTime.view.LocationEntry}
     */
    onManualHelpTap: function() {
        Ext.Msg.alert('Help','<div style=\"font-size:small\">Use the address page to enter a manual address.</div>' +
            '<div style=\"font-size:small\">If you cannot find your address on the map or have no internet connection or want to override the default position.</div>', Ext.emptyFn);
    },

    /**
     * Open Login Help Panel called from Login screen / UserLogin View
     * User taps the help button on the login screen, an alert window is shown with login help text.
     * {@link PointInTime.view.UserLogin}
     */
    onLoginHelpTap: function() {
        Ext.Msg.alert('Help','<div style=\"font-size:small\">If you have already registered, enter your email address and password and click the login button.</div>' +
            '<div style=\"font-size:small\">If you have not registered then please select \"Register\" in order to do so.</div>', Ext.emptyFn);
    },

    /**
     * Open Home Panel Help Panel called from Main View
     * Users taps help button on entry screen, an alert window is shown with help on how to enter the survey screen.
     * {@link PointInTime.view.Main}
     */
    openEntryHelp: function() {
        Ext.Msg.alert('Help', 'Tap the Point In Time Counting Tools Logo to enter.', Ext.emptyFn);
    },

    /**
     * Open Settings Panel called from Main View
     * Users taps settings button, the settingslaunch view is created and pushed to the home panel navigation view.
     * {@link PointInTime.view.Main}
     */
    openSettings: function() {

        var xpanel = Ext.create('PointInTime.view.SettingsLaunch');
        this.getHomepanel().push(xpanel);

    },

    /**
     * Open Survey Tools Panel
     * User taps open survey tools button or home image, function checks to make sure resourcelookup view is not already open, if not PITTools view (xtype: 'resourcetools') is created and pushed to the home panel navigation view.
     * {@link PointInTime.view.Main}
     */
    openTools: function() {

        if (this.getHomepanel().getActiveItem().xtype !== "resourcelookup") {
            this.getHomepanel().push(Ext.create('PointInTime.view.PITTools'));
        }
    },
    /**
     * Begin Login / on Login Button Tap called from Login screen / UserLogin View
     * {@link PointInTime.view.UserLogin}
     * Users taps 'loginbutton', function gets values from login form, validates the form, posts credentials to login server.  If successful, user and application records are created and the user is brought to the main application screen.
     * @param  {Ext.Button} button Login Button
     */
    onLoginTap: function(button) {
        var me = this;

        //get login form values
        var userLogin = Ext.create('PointInTime.model.UserLoginModelValidator', button.up('loginpanel').down("#userloginform").getValues());
        var validate = userLogin.validate();

        if (!validate.isValid()) {
            Ext.Msg.alert("Error", validate.getAt(0).getMessage());
            return;
        }

        //get App Setting Store
        var appsetting_store = Ext.getStore('appsettings');

        //get App Settings Record
        var appsettings_record = appsetting_store.getAt(0);

        //get User Setting Store
        var usersetting_store = Ext.getStore('usersettings');

        //get User Settings Record
        var usersettings_record = usersetting_store.getAt(0);

        //mask the viewport for loading
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        if (appsettings_record.data.setup_key !== null) {

            //AJAX POST Request to Login Script
            Ext.Ajax.request({
                /**
                 * Global API URL/ should reference your Control Panel {@link PointInTime.utils.Global}
                 * @type {String}
                 */
                url: PointInTime.utils.Global.getAPI().url + "/user/login",
                method: 'POST',
                params: userLogin.getData(),
                useDefaultXhrHeader: false,
                success: function(response, request) {

                    var responseObj = Ext.JSON.decode(response.responseText);

                    if (responseObj.hasOwnProperty('user')) {
                        //response has 'user' property

                        button.up('loginpanel').down("#userloginform").down("#password").setValue('');

                        //add main survey nav to viewport
                        Ext.Viewport.add(Ext.create('PointInTime.view.Main'));

                        //Set the values from the server into the user settings model
                        appsettings_record.set('is_setup', true);
                        appsettings_record.set('is_logged_in', true);

                        //set phantom to false so store knows to sync this record
                        appsettings_record.phantom = false;
                        appsetting_store.sync();

                        usersetting_store.removeAll();
                        usersetting_store.add({
                            user_id: responseObj.user.user_id,
                            firstname: responseObj.user.fname,
                            lastname: responseObj.user.lname,
                            email_address: responseObj.user.email,
                            phonenumber: responseObj.user.phone,
                            password: ''
                        });

                        usersetting_store.sync();

                        //if there is no project key, go to project manager
                        Ext.Viewport.add(Ext.create('PointInTime.view.ProjectManager'));

                        //animate to the 3rd projectmanager card
                        Ext.Viewport.animateActiveItem(2, { type: 'slide', direction: 'left' });

                        //set viewport load mask to false/hide
                        Ext.Viewport.setMasked(false);

                    } else if (responseObj.hasOwnProperty('error') && responseObj.error === "NOT_FOUND") {
                        Ext.Msg.alert('Invalid Login', "That username/password combination was not found. \nPlease try again, or use the \'Forgot Password\' button below.", function() {Ext.Viewport.setMasked(false); });
                    } else {
                        Ext.Msg.alert('Unknown Error', "Something went wrong, please try again, or check your internet connection", function() {Ext.Viewport.setMasked(false);});
                    }

                    // Server send a 200 code response. it means it understood the request and was able to deal with it
                    // you should check whether or not it is a success. Your answer JSON should contain this information
                },
                failure: function(response) {
                    Ext.Msg.alert('Unknown Error', "Something went wrong, please try again, or check your internet connection.", function() {Ext.Viewport.setMasked(false);});
                    // any other response than a 200
                }
            });


        } else {
            //if there is no project key, you need to login and set one up
            Ext.Msg.alert('No setup key', "You need to setup a key with an internet connection before you can use the application offline.");
            Ext.Viewport.setMasked(false);
        }

    },

    /**
    * Logout function
    * called from Navigation View logout button
    * User clicks logout button, function logs out user and brings user back to login screen.
    */
    doLogout: function(){
        var appsetting_store = Ext.getStore('appsettings');

        //get settings record
        var appsettings_record = appsetting_store.getAt(0);

        appsettings_record.set('is_logged_in', false);

        //mask the viewport for loading
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Logging Out...'
        });

        //slide animation to the left
        Ext.Viewport.animateActiveItem(0, { type: 'slide', direction: 'left' });

        //do logout
        Ext.Viewport.setMasked(false);

    }

});