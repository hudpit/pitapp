/**
 * ## Overview
 * The User Info controller is used to listen for events on userinfo view {@link PointInTime.view.UserInfo}.  This controller handles logic for submitting new user registration and updating user information.
 *
 * Controllers are responsible for responding to events that occur within your app. If your app contains a Logout button that your user can tap on, a Controller listens to the Button’s tap event and takes the appropriate action. While View classes handles the display of data and Model classes handle the loading and saving of data, Controller classes are the glue that binds Views and Models together.
 */
Ext.define('PointInTime.controller.UserInfo', {
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
            userinfo: 'userinfo'
        },
        /**
         * @cfg {Object} control
         *
         * Control Listens to app events
         */
        control: {
            'userinfo button[itemId=saveUserInfoChangesButton]': {
                tap: 'onSaveUserInfoChanges'
            },
            'userinfo button[itemId=submitUserInfoButton]': {
                tap: 'onSubmitUser'
            }
        }
    },
    /**
     * Submit User / New User
     * Called from User Info view {@link PointInTime.view.UserInfo}
     * @param  {Ext.Button} button Submit User Button
     */
    onSubmitUser: function(button) {

        var form = button.up('formpanel'); //get form panel by traversing up from button
        var formvalues = form.getValues(); //get form values
        var model = Ext.ModelMgr.create(formvalues, 'PointInTime.model.UserSettingsModelValidator'); //create model, model has validator
        var errors = model.validate(); //use data model to validate
        var navview = button.up('navigationview'); // get navigation view by travesering up from button

        if (formvalues.password !== formvalues.verifypassword) {
            errors.add(Ext.create('Ext.data.Error', {
                field: 'verifypassword',
                message: "Passwords don\'t match"
            }));
        }

        if (formvalues.password.length < 6) {
            errors.add(Ext.create('Ext.data.Error', {
                field: 'password',
                message: "Password length is less than 6 characters"
            }));
        }

        if (errors.isValid()) {

            // Validation successful - show loader
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });

            //get data from model
            var modelData = model.getData();

            Ext.Ajax.request({
                /**
                 * Global API URL/ should reference your Control Panel {@link PointInTime.utils.Global}
                 * @type {String}
                 */
                url: PointInTime.utils.Global.getAPI().url + "/user",
                method: 'POST',
                params: {
                    fname: modelData.firstname,
                    lname: modelData.lastname,
                    email: modelData.email_address,
                    phone: modelData.phonenumber,
                    password: modelData.password
                },

                useDefaultXhrHeader: false,
                success: function(response) {

                    //parse successful response
                    var responseObj = Ext.JSON.decode(response.responseText);

                    if (responseObj.hasOwnProperty('user')) {
                        //get User Settings Store

                        var usersetting_store = Ext.getStore('usersettings');
                        var robj = responseObj.user[0];

                        //add user to store
                        usersetting_store.add({
                            user_id: robj.user_id,
                            firstname: robj.fname,
                            lastname: robj.lname,
                            email_address: robj.email,
                            phonenumber: robj.phone,
                            current_password: '',
                            password: ''
                        });

                        //sync store with local storage
                        usersetting_store.sync();

                        Ext.Msg.alert('Success', 'Your registration was successful', function() {
                            navview.pop();
                        });
                    } else {
                        Ext.Msg.alert('Error', 'An account has already been registered to this email address.  Please tap \"Back\" and then \"Forgot Password\" to obtain the lost password.');
                    }
                },
                failure: function() {
                    Ext.Msg.alert('Error', 'Registration Failed');
                },
                callback: function() {
                    Ext.Viewport.setMasked(false);
                }
            });

        } else {

            var data = '', indxcount = 0;

            errors.each(function (item, index, length) {
                // Each item in the errors collection is an instance of the Ext.data.Error class.
                data = data + '&nbsp;&nbsp;-' + item.getMessage() + '<br/>';
                indxcount++;
            });

            Ext.Msg.alert('Errors', 'There are ' + indxcount + ' problems with this registration:<br/>' + data);

            return false;
        }

    },


    /**
     * Save User Info Changes
     * Called from User Info view {@link PointInTime.view.UserInfo}
     * @param  {Ext.Button} button Save Changes Button
     */
    onSaveUserInfoChanges: function(button) {

        var form = button.up('formpanel'); //get form panel from traversing up button
        var formvalues = form.getValues(); //form values
        var model = Ext.ModelMgr.create(formvalues, 'PointInTime.model.UserSettingsModelValidator'); //model has validator
        var errors = model.validate(); //use data model to validate values

        if (formvalues.current_password === null || formvalues.current_password === '') {
            errors.add(Ext.create('Ext.data.Error', {
                field: 'current_password',
                message: "Current password cannot be blank."
            }));

        } else {

            if (formvalues.password !== formvalues.verifypassword) {
                errors.add(Ext.create('Ext.data.Error', {
                    field: 'verifypassword',
                    message: "Passwords don\'t match"
                }));
            }

            if (formvalues.password.length < 6) {
                errors.add(Ext.create('Ext.data.Error', {
                    field : 'password',
                    message: "Password length is less than 6 characters"
                }));
            }

        }

        var message = '';

        if (errors.isValid()) {

            // Validation successful - show loader
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });

            var modelData = model.getData();

            //get User Settings Store
            var usersetting_store = Ext.getStore('usersettings');

            //get store record
            var usersetting = usersetting_store.getAt(0);

            Ext.Ajax.request({
                /**
                 * Global API URL/ should reference your Control Panel {@link PointInTime.utils.Global}
                 * @type {String}
                 */
                url: PointInTime.utils.Global.getAPI().url + "/user/" + usersetting.get('user_id'),
                method: 'POST',
                params: {
                    fname: modelData.firstname,
                    lname: modelData.lastname,
                    email: modelData.email_address,
                    phone: modelData.phonenumber,
                    //use formvalues instead of modelData since the current_password isn't in the validation model
                    current_password: formvalues.current_password,
                    password: modelData.password
                },
                useDefaultXhrHeader: false,
                success: function(response) {
                    if (response.responseText) {
                        var responseObj = Ext.JSON.decode(response.responseText);
                        if (responseObj.success) {
                            //Set values to what the server sent back
                            var user = responseObj.user[0];
                            usersetting.set('user_id', user.user_id);
                            usersetting.set('firstname', user.fname);
                            usersetting.set('lastname', user.lname);
                            usersetting.set('email_address', user.email);
                            usersetting.set('phonenumber', user.phone);
                            usersetting.set('current_password', '');
                            usersetting.set('password', '');

                            //sync local storage
                            usersetting_store.sync();

                            Ext.Msg.alert('Success', 'Your user information has been updated.', Ext.emptyFn);
                        } else {
                            Ext.Msg.alert('Error', responseObj.msg);
                        }

                    } else {
                        Ext.Msg.alert('Error', 'Invalid Response.', Ext.emptyFn);

                    }
                },
                failure: function(response) {
                    Ext.Msg.alert("Error", "An Error Occurred:"+response.responseText)
                },
                callback: function(){
                    Ext.Viewport.setMasked(false);
                }
            })
        } else {

            var data = '', indxcount = 0;

            errors.each(function (item, index, length) {
                // Each item in the errors collection is an instance of the Ext.data.Error class.
                data = data + '&nbsp;&nbsp;-' + item.getMessage() +'<br/>';
                indxcount++;
            });

            Ext.Msg.alert('Errors','There are ' + indxcount + ' problems with this registration:<br/>' + data);

            return false;
        }
    }

});