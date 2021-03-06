/**
 * ## Overview
 * Main Navigation View Panel.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).   The main view is the initial launch screen for the PIT application after login, it contains a simple image and 'Conduct Survey' button.
 *
 * Controllers are responsible for responding to events that occur within the app.  The main controller responds to events within this view: {@link PointInTime.controller.Main}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/conduct_survey.PNG Set Conduct Survey/Main}
 */
Ext.define('PointInTime.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'homepanel',

    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} itemId
         * Panel itemId
         */
        itemId: 'mainNav',
        /**
         * @cfg {Boolean} fullscreen
         * True or False, panel is full screen
         */
        fullscreen: false,

        /**
         * @cfg {Boolean/Object} navigationBar
         * The NavigationBar used in this navigation view. It defaults to be docked to the top.
         *
         * You can just pass in a normal object if you want to customize the NavigationBar. For example:
         *
         *     navigationBar: {
         *         ui: 'dark',
         *         docked: 'bottom'
         *     }
         *
         * You **cannot** specify a *title* property in this configuration. The title of the navigationBar is taken
         * from the configuration of this views children:
         *
         *     view.push({
         *         title: 'This views title which will be shown in the navigation bar',
         *         html: 'Some HTML'
         *     });
         *
         * @accessor
         */
        navigationBar: {
            animation: false,
            items: [{xtype: 'container', pack: 'center', align: 'right', html : '<div><img src="resources/images/icon.png" id="abouticon" style="width:43px;height:46px;"/></div>'}]
        },
        /**
         * @cfg {Oject} listeners
         * View event listeners
         */
        listeners: {
            painted: function(el) {
                //update img url to add tap event handler to about page image, push about panel on tap
                var me = this;
                var image = el.down('img');
                //track which pages are currently painted

                PointInTime.utils.Global.setPaintedpage('mainnav');
                image.on('tap', function(e, t) {
                    if (me.getActiveItem().xtype !== 'aboutpanel') {
                        //push About Panel
                        me.push(Ext.create('PointInTime.view.AboutPanel'));
                    }
                }, el);
            }
        },
        /**
         * @cfg {Oject} items
         * Panel Items
         */
        items: [{
            title: 'Point In Time',
            xtype: 'panel',

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
            listeners: {
                painted: function(el) {
                    //track which pages are currently painted
                    PointInTime.utils.Global.setPaintedpage("homepanel");
                }
            },
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    padding: '10px',
                    items: [
                        {
                            xtype: 'image',
                            itemId: 'homeImage',
                            src: 'resources/images/mock2-grey.png',
                            height: '100%'
                        }
                    ],
                    flex: 9
                },
                {
                    xtype: 'panel',
                    padding: '10px',
                    items: [{
                        xtype: 'button',
                        itemId: 'openpittools',
                        text: 'Conduct Survey',
                        ui: 'confirm'
                    }],
                    flex: 2
                },
                {
                    xtype: 'spacer',
                    flex: 5
                },
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    layout: {
                        pack: 'center'
                    },
                    items: [
                        {
                            iconCls: 'help',
                            iconMask: true,
                            itemId: 'openhelp',
                            ui: 'plain'
                        },
                        {
                            iconCls: 'settings',
                            iconMask: true,
                            itemId: 'opensettings',
                            ui: 'plain'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'xlogouticon',
                            action: 'logoutuser',
                            itemId: 'logoutbutton',
                            text: 'Logout',
                            hidden: false
                        }
                    ]
                }
            ]
        }]
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