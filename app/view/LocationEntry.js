/**
 * ## Overview
 * Manual Location Entry View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The manual location view is used to enter the users address manually, the view contains a simple form with street, city, state and a submit button.
 *
 * Controllers are responsible for responding to events that occur within the app.  The location lookup controller responds to events within this view: {@link PointInTime.controller.LocationLookup}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/manual_address.PNG Set Manual Address}
 */
Ext.define("PointInTime.view.LocationEntry", {
    extend: 'Ext.form.Panel',
    xtype: 'locationfm',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} title
         * Panel title
         */
        title: 'Enter A Location',
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
         * @cfg {Object} items
         * Panel items
         */
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        text: 'Help',
                        iconCls: 'help',
                        itemId: 'openmanualhelp'
                    }]
            },
            {
                xtype: 'fieldset',
                defaultType: 'textfield',
                defaults: {labelWidth: 100},
                style: 'padding-top:10px;',
                items: [
                    {
                        name: 'street',
                        label: 'Street:'
                    },
                    {
                        name: 'city',
                        label: 'City:'
                    },
                    {
                        name: 'state',
                        label: 'State:'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'padding-top:10px;',
                items: [{
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Submit',
                    action: 'saveNewLocation'
                }]
            }
        ]
    },

    /**
     * initialize Function
     * This method is called automatically.
     */
    initialize: function() {
        this.callParent();
    }
});