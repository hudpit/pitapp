/**
 * ## Overview
 * Draft Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).   The PIT drafts panel is used to list saved drafts.
 *
 * Controllers are responsible for responding to events that occur within the app.  The main controller responds to events within this view: {@link PointInTime.controller.Main}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/drafts.PNG PIT Drafts Panel}
 */
Ext.define("PointInTime.view.PITDrafts", {
    extend: 'Ext.Container',
    alias: 'widget.pitDrafts',
    xtype: 'pitdrafts',
    /**
     * @cfg {Object} config
     * View config object
     */
    config : {
        /**
         * @cfg {Boolean} fullscreen
         * True or False, Panel Full screen
         */
        fullscreen: true,
        /**
         * @cfg {Boolean} layout
         * Panel Layout
         */
        layout: 'card',
        /**
         * @cfg {Object} items
         * Panel Items
         */
        items: [
            {
                xtype: 'list',
                itemId: 'PITDraftList',
                store: 'PITEntryDrafts',
                plugins: {
                    xclass: 'Ext.plugin.SlideToRemove',
                    buttonWidth: '40%',
                    removeText: 'Remove'
                },
                emptyText: '<div style="padding:5px;">Currently there are no drafts,<br/>create a new draft by selecting the <br/>\' New Survey \' tab in the top left.</div>',
                title: 'Draft Surveys',
                itemTpl: '<div class="myContent">' +
                        '<div>Survey Type: <b>{surveytype}</b></div>' +
                        '<div class="c"><b>{created_datetime:date("F j, Y, g:i a")}</b></div>' +
                        '<div>ID: <b>{draftid}</b></div>' +
                        '<tpl if="values.householdid">' +
                        '<div>Household: <b>{householdid} {household_entry_number}/{number_in_household}</b></div>' +
                        '</tpl>' +
                        '<tpl if="values.location">' +
                        '<div>{location}</div>' +
                        '</tpl>'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
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
            }
        ]
    },

    /**
     * initialize Function
     * This method is called automatically.
     */
    initialize: function() {

        if (!navigator.onLine) {
            this.down('[action=logoutuser]').setHidden(true);
        }
        this.callParent();
    }
});