/**
 * ## Overview
 * This Project Lookup / Project Manager controller is used to listen for events on the project manager view {@link PointInTime.view.ProjectManager}.  This controller handles logic for looking up projects by project key.
 *
 * Controllers are responsible for responding to events that occur within your app. If your app contains a Logout button that your user can tap on, a Controller listens to the Button’s tap event and takes the appropriate action. While View classes handles the display of data and Model classes handle the loading and saving of data, Controller classes are the glue that binds Views and Models together.
 */
Ext.define('PointInTime.controller.ProjectManager', {
    extend: 'Ext.app.Controller',
    /**
     * @cfg {Object} config
     * Controller config object
     */
    config: {
        stores: ['UserProjects'],
        models: ['UserProjectsModel'],
        /**
         * @cfg {Object} refs
         * Controller References / Leverages ComponentQuery
         */
        refs: {
            projectmanager: 'projectmanager',
            search_projects_key_field: '#search_projects_by_key_field'
        },
        /**
         * @cfg {Object} control
         *
         * Control Listens to app events
         */
        control : {
            'projectmanager button[itemId=projectlookupbutton]': {
                tap: 'lookupProjects'
            }
        }
    },

    /**
     * Finds buttons panel key field, loads Projects by key, error message if no key is given
     * Called from Project Manager view {@link PointInTime.view.ProjectManager}
     * @param  {Ext.Button} button Project Lookup Button
     */
    lookupProjects: function(button) {
        var key = button.up('projectmanager').down("#search_projects_by_key_field").getValue();

        if (key !== '') {
            this.loadProjectsByKey(key);
        } else {
            Ext.Msg.alert('Error', "Please enter a key.");
        }
    },

    /**
     * load projects by key
     * @param  {String} key project key/ project setup key
     */
    loadProjectsByKey: function(key) {

        //Ajax POST Request
        Ext.Ajax.request({
            method: 'POST',
            /**
             * Global API URL/ should reference your Control Panel {@link PointInTime.utils.Global}
             * @type {String}
             */
            url: PointInTime.utils.Global.getAPI().url + "/project/lookup",
            params: {
                setup_key: key
            },
            useDefaultXhrHeader: false,
            success: function(response) {
                //successful callback
                //get key data and store in appsettings, then msg it.

                var responseObj = Ext.JSON.decode(response.responseText);
                if (responseObj.length > 0) {

                    var appsetting_store = Ext.getStore('appsettings');
                    var robj = responseObj[0];
                    //get store record
                    var arec = appsetting_store.getAt(0);

                    arec.set('setup_key', robj.setup_key);
                    arec.set('project_id', robj.project_id);
                    arec.set('project_title', robj.project_title);
                    arec.set('datastore_url', robj.datastore_url);

                    appsetting_store.sync();

                    Ext.Msg.alert(
                        'Success', // the title of the alert
                        "You are now associated with " + responseObj[0].project_title, // the message of the alert
                        function() {
                            Ext.Viewport.animateActiveItem(1, { type: 'slide', direction: 'left' });
                        }
                    );
                } else {
                    Ext.Msg.alert('Problem', "There are no count projects with this Setup Key.  Please try again.");
                }
            },
            failure: function() {
                //failure callback
                Ext.Msg.alert('Error', "An error occured while retrieving projects");
            }
        });
    }
});