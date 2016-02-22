/**
 * ## Overview
 * Project Manager View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html). The Project Manager panel is used to enter a project key for project assignment.
 *
 * Controllers are responsible for responding to events that occur within the app.  The project manager controller responds to events within this view: {@link PointInTime.controller.ProjectManager}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/project_manager.PNG Project Manager Panel}
 */
Ext.define("PointInTime.view.ProjectManager", {
    extend: 'Ext.Panel',
    xtype: 'projectmanager',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Count Manager',

        /**
         * @cfg {Boolean/String/Object} scrollable
         * Configuration options to make this Container scrollable. Acceptable values are:
         *
         * - `'horizontal'`, `'vertical'`, `'both'` to enabling scrolling for that direction.
         * - `true`/`false` to explicitly enable/disable scrolling.
         *
         * Alternatively, you can give it an object which is then passed to the scroller instance:
         *
         *     scrollable: {
         *         direction: 'vertical',
         *         directionLock: true
         *     }
         *
         * Please look at the {@link Ext.scroll.Scroller} documentation for more example on how to use this.
         * @return {Ext.scroll.View} The scroll view.
         * @accessor
         * @evented
         */
        scrollable: 'vertical',
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
                        xtype: 'spacer'
                    },
                    {
                        iconCls: 'xlogouticon',
                        action: 'logoutuser',
                        itemId: 'logoutbutton',
                        text: 'Logout'
                    }
                ]
            }
        ],
        /**
         * @cfg {Object} listeners
         * Form Panel Events
         */
        listeners: {
            painted: function(el) {
                //track painted page
                PointInTime.utils.Global.setPaintedpage("projectmanager");
            }
        }
    },
    /**
     * initialize Function
     * This method is called automatically.
     */
    initialize: function() {

        var me = this;

        if (!navigator.onLine) {
            //hide logout user button
            me.down('[action=logoutuser]').setHidden(true);
        }

        //get App Settings Store
        var appsetting_store = Ext.getStore('appsettings');
        //get store record
        var arec = appsetting_store.getAt(0);

        var hasproject = false;
        var do_setup_key = true;
        var projid, projtitle, setupkey;

        if (appsetting_store.getCount() > 0) {

            projid = arec.get('project_id');
            projtitle = arec.get('project_title');
            setupkey = arec.get('setup_key');

            if (projid === '' || projid === undefined || projid === null) {
                hasproject = false;
            } else {
                hasproject = true;
            }
        }

        var setuplabel = '<div style=\"font-size:medium;font-weight:bold;\">Enter in the Setup Key provided by your regional point in time count administrator.</div>';

        if (!navigator.onLine) {

            //you are not online
            setuplabel = '<div style=\"font-size:medium;font-weight:bold;\">an internet connection is required to lookup key.. if you associated with a project it will be shown below.</div>';
            do_setup_key = false;

        } else if (!navigator.onLine && hasproject === false) {

            //you are not online and have no saved projects
            setuplabel = '<div style=\"font-size:medium;font-weight:bold;\">an internet connection is required to lookup key and no key has been saved.</div>';
            do_setup_key = false;

        } else {

            //you are online and have a setup key
            if (hasproject === true) {
                setuplabel = '<div style=\"font-size:medium;font-weight:bold;\">You are currently associated with ' + setupkey + ' (' + projtitle + ') if you need to change this key, please enter it below.</div>';
            }
        }

        //add a join project title bar.
        this.add({
            xtype: 'titlebar',
            docked: 'top',
            title: 'Join a Count'
        });

        var setkeyfield = Ext.create('Ext.field.Text', {
            xtype: 'textfield',
            itemId: 'search_projects_by_key_field',
            name: 'search_projects_by_key_field',
            labelAlign: 'top',
            labelWidth: 240,
            labelWrap: true,
            disabled: ((do_setup_key) ? false : true),
            value: setupkey,
            label: setuplabel,
            placeHolder: ((do_setup_key) ? 'Enter Key Here' : 'Go online to enter a project key')
        });

        this.add([
            {
                xtype: 'panel',
                items: [{
                    xtype: 'fieldset',
                    style: 'padding-top:10px;',
                    items: [
                        setkeyfield,
                        {
                            xtype: 'button',
                            scope: me,
                            itemId: 'projectlookupbutton',
                            text: ((do_setup_key) ? 'Submit Key' : 'Continue'),
                            ui: 'confirm',
                            disabled: ((navigator.onLine) ? false : true)
                        }
                    ]
                }]
            }
        ]);
    }
});