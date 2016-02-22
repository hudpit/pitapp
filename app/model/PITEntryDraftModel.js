/**
 * ## Overview
 * PointInTime.model.PITEntryDraftModel is a Sencha data model (a set of fields and data).  The PIT Entry draft model is used to define the fields and data associated with draft surveys, it is used to save hold information about survey entries.   Every survey (observation, sheltered and unsheltered) for individuals and households can be saved to drafts with it's own model and a corresponding PIT entry draft model, the PIT draft model stores a link to the corresponding survey data.
 *
 * Fields used in this model:
 * {@link PointInTime.model.PITEntryDraftModel#fields}
 */
Ext.define('PointInTime.model.PITEntryDraftModel', {
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
            'surveytype',
            'draftid',
            'householdid',
            'created_datetime',
            'location',
            'household_entry_number',
            'number_in_household'
        ]
    }
});