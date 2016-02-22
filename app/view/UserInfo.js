/**
 * ## Overview
 * User Info Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The user info view is used for registration of new users and updating existing user information.
 *
 * Controllers are responsible for responding to events that occur within the app.  The user info controller responds to events within this view: {@link PointInTime.controller.UserInfo}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/update_user_info.PNG User Info Panel}
 */
Ext.define("PointInTime.view.UserInfo", {
    extend: 'Ext.form.Panel',
    xtype: 'userinfo',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} itemId
         * Panel itemId
         */
        itemId: 'userinfopanel',
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Update User Info',
        /**
         * @cfg {String} model
         * String of data model
         */
        model: 'UserSettingsModel',
        /**
         * @cfg {Boolean} is_updating
         * Is user info being updated true or false.
         */
        is_updating: false,
        /**
         * @cfg {Boolean} standardSubmit
         * Whether or not we want to perform a standard form submit. True or False
         */
        standardSubmit: false,
        /**
         * @cfg {Boolean} submitOnAction
         * True or False.  When this is set to true, the form will automatically submit itself whenever the action event fires on a field in this form. The action event usually fires whenever you press go or enter inside a textfield.
         */
        submitOnAction: false,
        /**
         * @cfg {Object} listeners
         * Form Panel Events
         */
        listeners: {
            painted: function(el) {
                PointInTime.utils.Global.setPaintedpage("userinfo");
            }
        }
    },

    /**
     * get User Settings Store Values, fill in form
     * @return {Boolean} has a user record or not, if exists true, if not, false
     */
    getStoreVals: function() {
        var me = this;

        //attempting to fetch user store values;
        var usersetting_store = Ext.getStore('usersettings');

        //if there is a record or not
        if (usersetting_store.getCount() > 0) {

            var xrec = usersetting_store.getAt(0);

            me.down("#user_id").setValue(xrec.data.user_id);
            me.down("#firstname").setValue(xrec.data.firstname);
            me.down("#lastname").setValue(xrec.data.lastname);
            me.down("#email_address").setValue(xrec.data.email_address);
            me.down("#phonenumber").setValue(xrec.data.phonenumber);

            return true;
        } else {
            return false;
        };
    },

    /**
     * initialize function
     * This method is called automatically.
     */
    initialize: function() {
        var me = this;

        var fs = Ext.create('Ext.form.FieldSet', {
            xtype: 'fieldset',
            itemId: 'infofs',
            title: 'blank',
            defaults: {labelWidth: 155}
        });

        fs.add([
            {
                xtype: 'hiddenfield',
                itemId: 'user_id',
                name: 'user_id'
            },
            {
                itemId: 'firstname',
                xtype: 'textfield',
                name: 'firstname',
                label: 'First Name',
                required: true
            },
            {
                itemId: 'lastname',
                xtype: 'textfield',
                name: 'lastname',
                label: 'Last Name',
                required: true
            },
            {
                itemId: 'email_address',
                xtype: 'textfield',
                name: 'email_address',
                label: 'Email',
                required: true
            },
            {
                itemId: 'phonenumber',
                xtype: 'numberfield',
                name: 'phonenumber',
                label: 'Phone',
                required: false
            }
        ]);

        if (me.getIs_updating()) {

            fs.add([{
                xtype: 'passwordfield',
                name: 'current_password',
                label: 'Current Password'
            }]);


        } else {

            fs.add([{
                xtype: 'hiddenfield',
                itemId: 'current_password',
                name: 'current_password'
            }]);

        }

        fs.add([
            {
                xtype: 'passwordfield',
                name: 'password',
                label: ((me.getIs_updating()) ? 'New Password' : 'Password'),
                required: true
            },
            {
                xtype: 'passwordfield',
                name: 'verifypassword',
                label: ((me.getIs_updating()) ? 'Verify Password' : 'Verify Password')
            }
        ]);



        this.add(fs);

        this.add([{
            xtype: 'fieldset',
            items: [{
                xtype: 'button',
                ui: 'confirm',
                disabled: ((navigator.onLine)) ? false : true,
                text: ((me.getIs_updating()) ? 'Save Changes' : 'Submit Registration'),
                itemId: ((me.getIs_updating()) ? 'saveUserInfoChangesButton' : 'submitUserInfoButton')
            }]

        }]);


        if (!navigator.onLine) {
            Ext.Msg.alert('No Connection', 'You are not connected to the Internet. You need an internet connection to signup.');
        }

        if (me.getIs_updating()) {
            me.getStoreVals();
            me.setTitle("Update User Info");
            me.down("#infofs").setTitle("Update User Information");
        } else {
            me.setTitle("Register");
            me.down("#infofs").setTitle('Enter Your Info to register<br/>for a new account');
        }

        this.callParent();
    }

});