/**
 * ## Overview
 * PIT Tools View Tab Panel.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The PIT tools view is a tab container view for the new survey and PIT drafts views, each view is contained inside a tab within a tab container.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/survey_select.PNG Survey Select Panel}
 */
Ext.define("PointInTime.view.PITTools", {
    extend: 'Ext.tab.Panel',
    xtype: 'resourcelookup',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Point In Time',
        /**
         * @cfg {String} iconCls
         * String of icon Class
         */
        iconCls: 'locate',
        /**
         * @cfg {String} tabBarPosition
         * Position of tab bar
         */
        tabBarPosition: 'top'
    },

    /**
     * initialize Function
     * This method is called automatically.
     */
    initialize: function() {
        this.callParent();

        var pitselect = Ext.create('PointInTime.view.PITSelect', {title: 'New Survey'});
        var pitdrafts = Ext.create('PointInTime.view.PITDrafts', {title: 'Drafts'});

        this.add([pitselect, pitdrafts]);

    }

});