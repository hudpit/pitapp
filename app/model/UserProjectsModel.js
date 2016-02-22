/**
 * ## Overview
 * PointInTime.model.UserProjectsModel is a Sencha data model (a set of fields and data).  The user projects model is used to define the fields and data associated with a users projects, the user picks a project on first login/setup using a setup key, the information about that project is stored and defined in this model.
 *
 * Fields used in this model:
 * {@link PointInTime.model.UserProjectsModel#fields}
 */
Ext.define('PointInTime.model.UserProjectsModel', {
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
         * @cfg {Object} fields Model Data Fields
         * Model config object
         */
        fields: [
            'user_id',
            'project_id',
            'project_title',
            'setup_key',
            'datastore_id',
            'datastore_title',
            'datastore_url'
        ]
    }
});