/**
 * ## Overview
 * Survey Selection Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html). The PIT select panel is used to select from a list of surveys to open.
 *
 * Controllers are responsible for responding to events that occur within the app.  The PIT select controller responds to events within this view: {@link PointInTime.controller.PITSelect}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/survey_select.PNG Survey Select Panel}
 */
Ext.define("PointInTime.view.PITSelect", {
    extend: 'Ext.form.Panel',
    xtype: 'pitselect',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Choose Type',
        /**
         * @cfg {String} html
         * Panel HTML
         */
        html: '',
        /**
         * @cfg {Object} items
         * Panel Items
         */
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        iconCls: 'help',
                        action: 'openSurveyHelpButton'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'xlogouticon',
                        action: 'logoutuser',
                        itemId: 'logoutbutton',
                        text: 'Logout'
                    }
                ]
            },
            {
                xtype: 'label',
                html: '<div style=\"font-size:medium;font-weight:bold;width:100%;text-align:center;\">Select a Survey to Perform</div>',
                itemId: 'projectManagerLabel',
                hidden: false,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'margin:5px 0px;padding: 5px 10px 0px 10px;',
                flex: 1
            },
            {
                xtype: 'fieldset',
                items: [{
                    xtype: 'button',
                    action: 'openSurvey',
                    itemId: 'individualPITbutton',
                    text: 'Individual Unsheltered',
                    ui: 'confirm'
                }]
            },
            {
                xtype: 'fieldset',
                items: [{
                    xtype: 'button',
                    action: 'openSurvey',
                    text: 'Household Unsheltered',
                    itemId: 'householdPITbutton',
                    ui: 'confirm'
                }]
            },
            {
                xtype: 'fieldset',
                items: [{
                    xtype: 'button',
                    action: 'openSurvey',
                    text: 'Individual Observation',
                    itemId: 'individualObservationbutton',
                    ui: 'action'
                }]
            },
            {
                xtype: 'fieldset',
                items: [{
                    xtype: 'button',
                    action: 'openSurvey',
                    text: 'Household Observation',
                    itemId: 'householdObservationbutton',
                    ui: 'action'
                }]
            },
            {
                xtype: 'fieldset',
                items: [{
                    xtype: 'button',
                    action: 'openSurvey',
                    text: 'Individual Sheltered',
                    itemId: 'individualShelteredbutton',
                    ui: 'orange'
                }]
            },
            {
                xtype: 'fieldset',
                items: [{
                    xtype: 'button',
                    action: 'openSurvey',
                    text: 'Household Sheltered',
                    itemId: 'householdShelteredbutton',
                    ui: 'orange'
                }]
            }
        ],
        /**
         * @cfg {Object} listeners
         * Panel Events
         */
        listeners: {
            painted: function(el) {
                //track painted page
                PointInTime.utils.Global.setPaintedpage("pitselect");
            }
        }
    },
    /**
     * initialize Function
     * This method is called automatically.
     */
    initialize : function() {
        var me = this;

        if (!navigator.onLine) {
            me.down('[action=logoutuser]').setHidden(true);
        }
    }

});