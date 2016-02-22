/**
 * ## Overview
 * PointInTime.model.Project is a Sencha data model (a set of fields and data).  The project model is used to save information about the users chosen project, the project manager is used to search for project keys {@link PointInTime.view.ProjectManager}.
 *
 * Fields used in this model:
 * {@link PointInTime.model.Project#fields}
 */
Ext.define('PointInTime.model.Project', {
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
            {name: 'project_id', type: 'int'},
            {name: 'project_title', type: 'string'},
            {name: 'setup_key', type: 'string' },
            {name: 'datastore_url', type: 'string'}
        ]
    }
});
