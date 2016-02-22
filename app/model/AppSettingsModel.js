/**
 * ## Overview
 * PointInTime.model.AppSettingsModel is a Sencha data model (a set of fields and data).  The application settings model is used to define the fields and data associated with application initalisation and setup, it also defines information about the users identify and logged in state.  This model is also used to store information pertitant to the survey's project information, like the project title and the datastore URL.  This model is invoked when the user logs in and sets up a project with their assigned project key.
 *
 * Fields used in this model:
 * {@link PointInTime.model.AppSettingsModel#fields}
 */
Ext.define('PointInTime.model.AppSettingsModel', {
    extend: 'Ext.data.Model',
    /**
     * @cfg {Object} config
     * Model config object
     */
    config: {
        /**
         * @cfg {Object} identifier Identifer Object
         */
        identifier: {type: 'uuid'},
        /**
         * @cfg {Object} fields
         * Model config object  
         * is_initialised (Boolean)
         */
        fields: [
            /**
             * @property {Boolean} is_initialised Is Application Initialised?
             */
            {
                name: 'is_initialised',
                type: 'boolean',
                defaultValue: false
            },
            /**
             * @property {Boolean} is_setup Is Application Setup?
             */
            {
                name: 'is_setup',
                type: 'boolean',
                defaultValue: false
            },
            /**
             * @property {Boolean} is_logged_in Is User Logged In?
             */
            {
                name: 'is_logged_in',
                type: 'boolean',
                defaultValue: false
            },
            /**
             * @property {String} setup_key App Setup Key
             */
            {
                name: 'setup_key',
                type: 'string'
            },
            /**
             * @property {String} user_id App User ID
             */
            {
                name: 'user_id',
                type: 'string'
            },
            /**
             * @property {String} project_id Project ID
             */
            {
                name: 'project_id',
                type: 'string'
            },
            /**
             * @property {String} project_title Project Title
             */
            {
                name: 'project_title',
                type: 'string'
            },
            /**
             * @property {String} datastore_url Project Datastore URL
             */
            {
                name: 'datastore_url',
                type: 'string'
            }
        ]
    }
});