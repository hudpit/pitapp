/**
 * ## Overview
 * This is the controller for the Forgot Password Panel.   This controller listens for events on the 'forgotpasswordpanel' view {@link PointInTime.view.ForgotPasswordPanel}, this panel has 1 button, this controller listens for tap events and fires the corresponding function 'onForgotPwTap'.
 *
 * Controllers are responsible for responding to events that occur within your app. If your app contains a Logout button that your user can tap on, a Controller listens to the Button’s tap event and takes the appropriate action. While View classes handles the display of data and Model classes handle the loading and saving of data, Controller classes are the glue that binds Views and Models together.
 */
Ext.define('PointInTime.controller.ForgotPassword', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.Ajax'
    ],
    /**
     * @cfg {Object} config
     * Controller config object
     */
    config: {
        models: ['ForgottenPasswordModel'],
        /**
         * @cfg {Object} refs
         * Controller References / Leverages ComponentQuery
         */
        refs: {
            forgotpasswordpanel: 'forgotpasswordpanel'
        },
        /**
         * @cfg {Object} control
         *
         * Control Listens to app events
         */
        control: {
            'forgotpasswordpanel button[itemId=forgotpw]': {
                tap: 'onForgotPwTap'
            }
        }
    },

    /**
     * on Forgot Password Button tap called from Forgot Password Panel
     * this function accepts the forgot password button, finds the corresponding form that the button is attached to then validates the email address and submits the given email address to the datastore server, the server then responds with success/failure notifications, the server then emails the user a reset link.
     * {@link PointInTime.view.ForgotPasswordPanel}
     * @param  {Ext.Button} button 'Submit' Button on ForgotPasswordPanel
     */
    onForgotPwTap: function(button) {

        var forgotPw = Ext.create('PointInTime.model.ForgottenPasswordModel', button.up('formpanel[itemId=forgotpasswordform]').getValues());
        var validate = forgotPw.validate();

        if (!validate.isValid()) {
            Ext.Msg.alert("Error", validate.getAt(0).getMessage());
            return;
        }

        /**
         * Ajax Request to REST URL POST
         */
        Ext.Ajax.request({
            /**
             * Global API URL/ should reference your Control Panel {@link PointInTime.utils.Global}
             * @type {String}
             */
            url: PointInTime.utils.Global.getAPI().url + "/user/reset/",
            method: 'POST',
            params: {
                email: forgotPw.get('email')
            },
            useDefaultXhrHeader: false,
            success: function(response) {
                //parse successful response
                var responseObj = Ext.JSON.decode(response.responseText);

                if (responseObj.hasOwnProperty('success')) {
                    if (responseObj.success) {

                        Ext.Msg.alert('Password Reset', responseObj.msg, function() {
                            //Pop to Login panel
                            button.up('navigationview').pop(1);
                        });

                    } else {
                        Ext.Msg.alert('Password Reset', responseObj.msg);
                    }
                } else {
                    Ext.Msg.alert('Error', 'Something went wrong, please check your email address for errors.... or check internet connnectivity');
                }

            },
            failure: function() {
                Ext.Msg.alert('Error', 'Something went wrong, please check your email address for errors... or check internet connnectivity');
            }
        });
    }
});