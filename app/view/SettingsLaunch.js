/**
 * ## Overview
 * Settings Launch View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).   The settings launch panel is a tab container for the project manager and user info views, it is invoked when a user clicks the settings icon.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/project_manager.PNG Project Manager Panel}
 */
Ext.define("PointInTime.view.SettingsLaunch", {
    extend: 'Ext.tab.Panel',
    xtype: 'settingslaunch',

    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Settings',
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

        var projectmanager = Ext.create('PointInTime.view.ProjectManager',{title: 'Project Manager'});
        var userinfo = Ext.create('PointInTime.view.UserInfo',{title: 'User Info', is_updating:true});

        this.add([projectmanager,userinfo]);
    }

});