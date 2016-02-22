/**
 * ## Overview
 * User Login Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The user login view is used to display login interactions, the view comprises of a simple form with email address and password fields with buttons.
 *
 * Controllers are responsible for responding to events that occur within the app.  The home panel controller responds to events within this view: {@link PointInTime.controller.HomePanel}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/login.PNG Login Panel}
 */
Ext.define("PointInTime.view.UserLogin", {
    extend: 'Ext.navigation.View',
    xtype: 'loginpanel',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} itemId
         * Panel itemId
         */
        itemId: 'userloginpanel',
        /**
         * @cfg {Boolean} fullscreen
         * True or False, Panel Full screen
         */
        fullscreen: true,
        /**
         * @cfg {Oject} listeners
         * View event listeners
         */
        listeners: {
            painted: function(navView) {
                PointInTime.utils.Global.setPaintedpage("userlogin");
            },
            resize: function(el) {
                var me = this;
                var elh = el.getHeight();
                //alert(elh);
                var setflex = 3;
                var homepanel = me.down('#homePanelImages');

                var homeimg = me.down('#homeImage');

                var heightarray = [480,620,900,1000];
                for (i = 0; i < heightarray.length; i++) {
                    if (elh > heightarray[i]) {
                        homepanel.setFlex(setflex+i);
                        break;
                    }
                }

            },
            back: function(navView) {
                PointInTime.utils.Global.setPaintedpage("userlogin");
            }
        },
        /**
         * @cfg {Object} items
         * Panel Items
         */
        items: [{
            title: 'Welcome',
            xtype: 'panel',
            itemId: 'welcomepanel',
            layout: 'fit',
            items: [
                {
                    xtype: 'formpanel',
                    standardSubmit: false,
                    submitOnAction : false,
                    itemId: 'userloginform',
                    id: 'userloginform',
                    items: [
                        {
                            xtype: 'panel',
                            padding: '5px',
                            items: [
                                {
                                    xtype: 'image',
                                    itemId: 'homeImage',
                                    src: 'resources/images/mock2-grey.png',
                                    height: '190px'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            defaults: {labelWidth: 95},
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Email',
                                    name: 'email',
                                    itemId: 'email',
                                    requird: true,
                                    placeHolder: 'Enter Email'
                                },
                                {
                                    xtype: 'passwordfield',
                                    label: 'Password',
                                    name: 'password',
                                    itemId: 'password',
                                    autoComplete: false,
                                    autoCorrect: false,
                                    autoCapitalize: false,
                                    placeHolder: 'Enter Password'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            style: 'padding-left:10px;padding-right:10px;',
                            items: [{
                                xtype: 'button',
                                itemId: 'loginbutton',
                                text: 'Login',
                                ui: 'confirm'
                            }]
                        },
                        {
                            xtype: 'panel',
                            itemId: 'buttonpanel',
                            style: 'padding:10px;',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    flex: 1,
                                    itemId: 'registerbutton',
                                    text: 'Register',
                                    style: 'font-size:small;font-weight:bold;',
                                    handler: function() {this.up("loginpanel").push(Ext.create('PointInTime.view.UserInfo', {
                                        title: 'Register',
                                        is_updating: false
                                    }))},
                                    ui: 'action'
                                },
                                {xtype: 'spacer', width: 10},
                                {
                                    xtype: 'button',
                                    flex : 2,
                                    itemId: 'forgotpasswordbutton',
                                    text: 'Forgot Password',
                                    style: 'font-size:small;font-weight:bold;',
                                    handler: function() {this.up("loginpanel").push(Ext.create('PointInTime.view.ForgotPasswordPanel'))},
                                    ui: 'action'
                                },
                                {xtype: 'spacer', width: 10},
                                {
                                    xtype: 'button',
                                    text: 'Help',
                                    style: 'font-size:small;font-weight:bold;',
                                    flex : 1,
                                    itemId: 'openloginhelp',
                                    ui: 'action'
                                }
                            ]
                        }],
                    flex: 2
                }]
        }]
    },

    /**
     * get User Settings Store Values, set Email address and blank password
     */
    getStoreVals: function() {
        var me = this;
        var usersetting_store = Ext.getStore('usersettings');

        //if there is a record or not
        if (usersetting_store.getCount() > 0) {

            var xrec = usersetting_store.getAt(0);
            var set_email_address;

            if (xrec.data.email_address === undefined) {
                set_email_address = '';
            } else {
                set_email_address = xrec.data.email_address;
            }

            me.down("#userloginform").down("#email").setValue(set_email_address);
            me.down("#userloginform").down("#password").setValue('');
            return true;
        } else {
            return false;
        }

    },

    /**
     * Does device have internet connection and user settings store values?
     * @return {Boolean} true or false
     */
    hasConnectionAndSettings : function() {
        if (navigator.onLine && this.getStoreVals()) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * initialize function
     * This method is called automatically.
     */
    initialize: function() {
        this.callParent();
        var me = this;

        if (navigator.onLine) {
            if (!me.getStoreVals()) {
                Ext.Msg.alert('Setup', 'It appears that you have not registered an account as of yet.  If you have then please ignore this message and log in.  Otherwise, please tap \"Register\" to create an account.');
            }
        } else if (!me.hasConnectionAndSettings()) {
            me.disable();
            me.down("#userloginform").down("#loginbutton").setDisabled(true);
            me.down("#userloginform").down("#registerbutton").setDisabled(true);
            me.down("#userloginform").down("#forgotpasswordbutton").setDisabled(true);

            Ext.Msg.alert('No Connection', 'You are not connected and have no saved signup information. You need an internet connection to signup. Click \"register\" to signup when connected.');
        } else {
            me.getStoreVals();
        }
    }
});