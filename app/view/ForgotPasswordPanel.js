/**
 * ## Overview
 * Forgot Password Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The forgot password panel is used to facilitate user interaction for lost passwords, the view displays a simple email address form with a submit button.
 *
 * Controllers are responsible for responding to events that occur within the app.  The forgot password controller responds to events within this view: {@link PointInTime.controller.ForgotPassword}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/forgot_password.PNG Forgot Password Panel}
 */
Ext.define("PointInTime.view.ForgotPasswordPanel", {
    extend: 'Ext.form.Panel',
    xtype: 'forgotpasswordpanel',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} xtype
         * xtype name for panel widget
         */
        xtype: 'formpanel',
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
         * @cfg {String} title
         * Form Panel Title
         */
        title: 'Retrieve Password',
        /**
         * @cfg {String} itemId
         * Form Panel itemId
         */
        itemId: 'forgotpasswordform',
        /**
         * @cfg {String} id
         * Form Panel id
         */
        id: 'forgotpasswordform',
        /**
         * @cfg {Object} listeners
         * Form Panel Events
         */
        listeners: {
            painted: function(el) {
                PointInTime.utils.Global.setPaintedpage("forgotpassword");
            }
        },
        /**
         * @cfg {Object} items
         * Form Panel Items
         */
        items: [
            {
                xtype: 'label',
                html: 'Forgot Password<div style=\"font-size:medium;padding-top:10px;\">Enter your email address and click submit.</font>',
                itemId: 'forgotpasswordbutton',
                hidden: false,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'margin:5px 0px;padding:10px;border-bottom: solid 1px black;'
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        style: 'border-bottom: solid 1px black;',
                        items: [{
                            labelWidth: 120,
                            labelAlign: 'top',
                            xtype: 'textfield',
                            label: 'Email Address (tap below)',
                            name: 'email',
                            itemId: 'email',
                            placeHolder: 'Enter your email address here'
                        }]
                    },
                    {
                        style: 'padding:10px;',
                        items: [{
                            xtype: 'button',
                            itemId: 'forgotpw',
                            text: 'Submit',
                            ui: 'confirm'
                        }]
                    }
                ]
            }
        ]
    },
    /**
     * Initialize Function
     * This method is called automatically.
     */
    initialize : function() {
        this.callParent();
        var me = this;

        if (!navigator.onLine) {
             me.down('[action=logoutuser]').setHidden(true);
        };
    }
});