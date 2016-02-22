/**
 * ## Overview
 * About Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html)   The about panel view displays about image & version information to the user.   The about panel about image and version information html variables are declared in {@link PointInTime.utils.Global}. (versionHtmlString & aboutImage variables respectively).
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/about_us.PNG About Us}
 *
 */
Ext.define("PointInTime.view.AboutPanel", {
    extend: 'Ext.Panel',
    xtype: 'aboutpanel',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} title
         * Panel Title defaults to 'About'
         */
        title: 'About',

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
        scrollable: true,
        /**
         * @cfg {String} aboutpanelmain
         * Xtype name for this widget
         */
        xtype: 'aboutpanelmain',
        /**
         * @cfg {Object} layout
         * layout object
         */
        layout: {
            type: 'vbox'
        },
        /**
         * @cfg {Object} items
         * Panel Items
         */
        items: [
            {
                xtype: 'panel',
                padding: '10px',
                items: [
                    {
                        xtype: 'image',
                        itemId: 'aboutImage',
                        src: PointInTime.utils.Global.getAboutImage(),
                        height: '100%'
                    }
                ],
                flex: 9
            },
            {
                html: PointInTime.utils.Global.getVersionHtmlString(),
                flex: 5
            }
        ]
    },
    /**
     * Initialize function
     * This method is called automatically.
     * */
    initialize: function() {
        this.callParent();
    }

});