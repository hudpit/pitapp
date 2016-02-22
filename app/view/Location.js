/**
 * ## Overview
 * Location Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The location view is used to set the location for surveys, it is also used to launch the manual address entry view, it can be used to center location based on GPS or display location service errors.
 *
 * Controllers are responsible for responding to events that occur within the app.  The location lookup controller responds to events within this view: {@link PointInTime.controller.LocationLookup}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/set_location.PNG Set Location Panel}
 */
Ext.define("PointInTime.view.Location", {
    extend: 'Ext.Panel',
    xtype: 'locationlookup',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {Object} google_gmap
         * Google gMap
         */
        google_gmap: undefined,
        /**
         * @cfg {String} surveytype
         * Survey Type
         */
        surveytype: null,
        /**
         * @cfg {String} surveyid
         * Survey ID
         */
        surveyid: null,
        /**
         * @cfg {String} set_household_id
         * Household ID
         */
        set_household_id: null,
        /**
         * @cfg {String} set_household_entrynumber
         * Household Entry Number x of x
         */
        set_household_entrynumber: null,
        /**
         * @cfg {String} set_number_in_household
         * Household Total Number in Household
         */
        set_number_in_household: null,
        /**
         * @cfg {Object} gmapcenter
         * Google Maps Lat Lng for center position
         */
        gmapcenter: undefined,
        /**
         * @cfg {Object} map_center
         * Object with Lat Lng for center position, used for saved centers
         */
        map_center: null,
        /**
         * @cfg {String} manualaddress
         * String of manual address for google maps geocode lookup
         */
        manualaddress: null,
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Set Location',
        /**
         * @cfg {String} iconCls
         * String of icon Class
         */
        iconCls: 'locate',
        /**
         * @cfg {String} layout
         * String for panel layout type
         */
        layout: 'vbox',
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
                        iconCls: 'help',
                        action: 'openHelpWindow'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: 'Enter Address',
                        action: 'changelocation'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        itemId: 'mapcenterbutton',
                        action: 'map_geolocate',
                        iconCls: 'locate',
                        hidden: false
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconCls: 'xlogouticon',
                        action: 'logoutuser',
                        itemId: 'logoutbutton',
                        hidden: false
                    }
                ]
            },
            {
                xtype: 'panel',
                itemId: 'mapHolder',
                masked: true,
                style: 'padding:10px;',
                layout: 'fit',
                flex: 5
            },
            {
                xtype: 'panel',
                flex: 2,
                layout: 'vbox',
                padding: '10px',
                items: [
                    {
                        itemId: 'confirmnextbutton',
                        xtype: 'button',
                        ui: 'confirm',
                        text: 'Next',
                        action: 'confirmlocation',
                        flex: 3
                    }
                ]
            }
        ],
        listeners: {
            initialize: function() {
                this.fireEvent('onInitLocationView', this);
            },
            painted: function(el) {
                this.down('#confirmnextbutton').setDisabled(false);
            }
        }
    },

    /**
     * initialize Function
     * This method is called automatically.
     */
    initialize: function() {
        var me = this;

        if (Ext.Viewport.getOrientation() === 'landscape') {
            me.down('#confirmnextbutton').setFlex(4);
        }

        if (!navigator.onLine) {
            me.down('[action=logoutuser]').setHidden(true);
        }

        this.callParent(arguments);
    }
});