/**
 * ## Overview
 * PointInTime.model.ShelteredSurveyDraftModel is a Sencha data model (a set of fields and data).  The sheltered survey drafts model is used to define the fields and data associated with the sheltered survey, it is used to save draft sheltered surveys to local storage to be submitted later.   The survey model holds all the information from the survey and hidden values like the geolocation coordinates of the survey location.
 *
 * Fields used in this model:
 * {@link PointInTime.model.ShelteredSurveyDraftModel#fields}
 */
Ext.define('PointInTime.model.ShelteredSurveyDraftModel', {
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
            'projectname',
            'projecttype',
            'send_date',
            'draftid',
            'householdid',
            'household_entry_number',
            'number_in_household',
            'created_datetime',
            'region',
            'age',
            'age_range',
            'race_white',
            'race_black',
            'race_asian',
            'race_americanalaska',
            'race_nativehawaiian',
            'race_other',
            'race_other_specified',
            'firsttimehomeless',
            'hmt',
            'ethnicity',
            'gender',
            'disabilities_physical',
            'disabilities_hiv',
            'disabilities_specialed',
            'disabilities_ptsd',
            'disabilities_othermh',
            'disabilities_chronichealth',
            'disabilities_braininjury',
            'disabilities_drug',
            'disabilities_alcohol',
            'doyoureceivedisabilitybenefits',
            'everreceivedhealthcarebenefits',
            'initials',
            'otherlocation',
            'servedinarmedforces',
            'activatedinnationalguard',
            'domesticviolence',
            'searchlocation',
            'location',
            'geocode',
            'zlat',
            'zlng',
            'manualaddress',
            'notes',
            'relationshiptoyou',
            'relationshipother',
            'preventstable_alcohol',
            'preventstable_drug',
            'preventstable_chronichealth',
            'preventstable_ptsd',
            'preventstable_othermh',
            'preventstable_physical',
            'preventstable_braininjury',
            'howlongthistime_days',
            'howlongthistime_weeks',
            'howlongthistime_months',
            'howlongthistime_years',
            'howlongthistime_dontknowref',
            'howlongshelter_days',
            'howlongshelter_weeks',
            'howlongshelter_months',
            'howlongshelter_years',
            'howlongshelter_dontknowref',
            'keepyoufromliving'
        ]
    }
});