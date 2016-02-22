/**
 * Point In Time Global Utility
 */
Ext.define('PointInTime.utils.Global', {
    /**
     * @cfg {Boolean} singleton
     * Is singleton class true/false
     */
    singleton : true,
    /**
     * @cfg {Array} mixins
     * List of classes to be mixed in
     */
    mixins: ['Ext.mixin.Observable'],
    /**
     * @cfg {String} alias
     * Class alias
     */
    alias : 'widget.global',
    /**
     * @cfg {String} alternateClassName
     * Alternative Class Name
     */
    alternateClassName: 'GlobalUtil',
    /**
     * @cfg {Object} config
     * Utility config object
     */
    config : {
            /**
             * @cfg {String} id
             * Global utility ID
             */
            id: 'utilglobal',
            /**
             * @cfg {String} versionHtmlString
             * View version html, used on about screen.
             */
            versionHtmlString: ['<div style=\"padding: 10px;\">',
                    '<div style=\"font-size: medium; font-weight:bold;text-align:center;\">Version 2.40 (12/12/2015)<div>',
                    '</div>'].join("\n"),
            /**
             * @cfg {String} itemID
             * Global utility item ID
             */
            itemId: 'utilglobal',
            /**
             * @cfg {Object} API
             * API object with API information
             */
            API: {
                /**
                 * @cfg {String} url
                 * API RESTful URL
                 */
	            url:'[CONTROL_PANEL_API_URL]'
	        },
            /**
             * @cfg {String} aboutImage
             * About image address
             */
            aboutImage:'resources/images/aboutus.png',
            /**
             * @cfg {String} paintedpage
             * used to keep reference to the last painted page
             */
            paintedpage:undefined,
            /**
             * @cfg {String} launchpage
             * used to keep reference to the launch page
             */
            launchpage:undefined
    },
    /**
     * Used to set the painted page variable for when pages are painted/rendered to the device.
     * @param  {String} page page string
     */
    setPaintedpage  : function(page){
        this.paintedpage = page;
        document.removeEventListener("backbutton",this.onBackKeyDown,false);

        if(page != this.getLaunchpage()){
            document.addEventListener("backbutton",this.onBackKeyDown,false);
        }
    },
    /**
     * on back key down event prevents the back button from working on certain devices (overrides the default event behavior).
     * @param  {Object} e event
     */
    onBackKeyDown:function(e){
        e.preventDefault;
    },
    /**
     * constructor function used to initialise this classes configuration variables
     * @param  {Object} config configuration object
     */
    constructor: function(config) {
        this.initConfig(config);
    }
});