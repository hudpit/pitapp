/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setPath({
    'Ext': 'touch/src',
    'PointInTime': 'app',
    'Ext.plugin' : 'plugin'
});

/**
 * @class
 * Ext application for PointInTime
 */
Ext.application({
    name: 'PointInTime',
    isNative: true,
    controllers: ['Main', 'UserInfo', 'HomePanel', 'PITSelect', 'LocationLookup', 'ProjectManager', 'ForgotPassword'],
    stores: ['AppSettings', 'UserSettings'],
    models: ['AppSettingsModel', 'UserSettingsModel', 'UserSettingsModelValidator', 'UserLoginModelValidator'],
    requires: [
        'PointInTime.utils.Global',
        'Ext.MessageBox',
        'Ext.plugin.NumberPrompt',
        'Ext.plugin.SlideToRemove',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.Img',
        'Ext.form.FieldSet',
        'Ext.field.Radio',
        'Ext.form.Select',
        'Ext.field.DatePicker',
        'Ext.field.Hidden',
        'Ext.field.Number',
        'Ext.Map',
        'Ext.data.proxy.JsonP',
        'Ext.data.Store',
        'Ext.dataview.List',
        'Ext.Container',
        'Ext.field.Password',
        'Ext.Label'
    ],
    views: ['Main', 'Location', 'LocationEntry', 'PITTools', 'PITSelect', 'PITDrafts', 'UnshelteredEntry', 'ObservationEntry', 'ShelteredEntry', 'UserLogin', 'SettingsLaunch', 'UserInfo', 'ProjectManager', 'ForgotPasswordPanel','SurveyHelpPanel','AboutPanel'],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    isIconPrecomposed: true,
    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    /**
     * Launch function on app launch
    */
    launch: function() {

        /**
         * code to fix Chrome 43 issues, and to help spacing on IOS devices for status bar.
         */
        Ext.Component.prototype.animateFn = // or Ext.override( Ext.Component, { animateFn:
            function (animation, component, newState, oldState, options, controller) {
                var me = this;
                if (animation && (!newState || (newState && this.isPainted()))) {


                    this.activeAnimation = new Ext.fx.Animation(animation);
                    this.activeAnimation.setElement(component.element);


                    if (!Ext.isEmpty(newState)) {
                        var onEndInvoked = false;
                        var onEnd = function () {
                            if (!onEndInvoked) {
                                onEndInvoked = true;
                                me.activeAnimation = null;
                                controller.resume();
                            }
                        };


                        this.activeAnimation.setOnEnd(onEnd);
                        window.setTimeout(onEnd, 50 + (this.activeAnimation.getDuration() || 500));


                        controller.pause();
                    }


                    Ext.Animator.run(me.activeAnimation);
                }
            };

        var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;

        /**
         * Status bar fix
        */
        // if (app) {

        //     if (Ext.os.is.iOS) {
        //         if (Ext.os.version.major >= 7) {
        //             if (PointInTime.app.isNative) {
        //                 // manual flag to denote "native" mode
        //                 Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
        //             }

        //             Ext.Viewport.on('orientationchange', function(viewport, orientation, width, height) {
        //                 Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
        //             });
        //         }
        //     }

        // }

        /**
         * get App settings from local storage
         */
        var appsetting_store = Ext.getStore('appsettings');

        var hasuser = false;
        var hasproject = false;
        var loginmsg = '';

        //if there is a record or not
        if (appsetting_store.getCount() === 0) {

            appsetting_store.add({
                is_initialised: 1,
                is_setup: 0,
                is_logged_in: false,
                setup_key: '',
                user_id: '',
                project_id: '',
                project_title: '',
                datastore_url: ''
            });

            //sync to local storage
            appsetting_store.sync();
        } else {
            //if app is init then there may be a user record

            //get user store
            var usersetting_store = Ext.getStore('usersettings');

            //if there is a record or not
            if (usersetting_store.getCount() > 0) {
                hasuser = true;

                //get user record
                var usersettings_record = usersetting_store.getAt(0);
                var usersname = usersettings_record.get('firstname') + ' ' + usersettings_record.get('lastname');
            };

            //get app records
            var appsettings_record = appsetting_store.getAt(0);
            var projid = appsettings_record.get('project_id');
            var projtitle = appsettings_record.get('project_title');

            if(projid === '' || projid === undefined || projid === null) {
                hasproject = false;
            } else {
                hasproject = true;
            };
        };

        var appsettings_record = appsetting_store.getAt(0);

        if (navigator.onLine) {

            PointInTime.utils.Global.setLaunchpage("userlogin");
            //add Login view to Viewport
            Ext.Viewport.add(Ext.create('PointInTime.view.UserLogin'));

        } else {

            if (appsettings_record.get("is_logged_in")) {
                // Initialize the main view
                if (hasproject) {

                    PointInTime.utils.Global.setLaunchpage("homepanel");
                    //add Main view to Viewport
                    Ext.Viewport.add(Ext.create('PointInTime.view.Main'));
                    Ext.Msg.alert("Notice","User: " + usersname + "<br/>Project: " + projtitle);

                } else {

                    PointInTime.utils.Global.setLaunchpage("projectmanager");
                    Ext.Viewport.add(Ext.create('PointInTime.view.ProjectManager'));
                    //add Project Manager view to Viewport
                    Ext.Msg.alert("Notice","User: " + usersname + "<br/>Project: Not configured");

                }
            } else {
                //push login
                PointInTime.utils.Global.setLaunchpage("userlogin");
                //add Login view to Viewport
                Ext.Viewport.add(Ext.create('PointInTime.view.UserLogin'));
            }

        }

        //at end of script destroy loading indicator
        Ext.fly('appLoadingIndicator').destroy();
    },

    /**
     * Sencha application updated reload msg.
     */
    onUpdated : function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
