/**
 * ## Overview
 * PointInTime.model.ObservationSurveyDraftModel is a Sencha data model (a set of fields and data).  The observation survey drafts model is used to define the fields and data associated with the observation survey, it is used to save draft observation surveys to local storage to be submitted later.   The survey model holds all the information from the survey and hidden values like the geolocation coordinates of the survey location.
 *
 * Fields used in this model:
 * {@link PointInTime.model.ObservationSurveyDraftModel#fields}
 */
Ext.define('PointInTime.model.ObservationSurveyDraftModel', {
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
            'send_date',
            'draftid',
            'householdid',
            'household_entry_number',
            'number_in_household',
            'created_datetime',
            'whyobservationtool',
            'locationwhereobserved',
            'ishomeless',
            'age_range',
            'gender',
            'race_white',
            'race_black',
            'race_asian',
            'race_americanalaska',
            'race_nativehawaiian',
            'race_white',
            'race_other',
            'race_other_specified',
            'ethnicity',
            'notes',
            'searchlocation',
            'location',
            'geocode',
            'zlat',
            'zlng',
            'manualaddress'
        ]
    }
});