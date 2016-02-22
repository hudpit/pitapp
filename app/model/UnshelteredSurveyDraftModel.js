/**
 * ## Overview
 * PointInTime.model.UnshelteredSurveyDraftModel is a Sencha data model (a set of fields and data).  The unsheltered survey drafts model is used to define the fields and data associated with the unsheltered survey, it is used to save draft unsheltered surveys to local storage to be submitted later.   The survey model holds all the information from the survey and hidden values like the geolocation coordinates of the survey location.
 *
 * Fields used in this model:
 * {@link PointInTime.model.UnshelteredSurveyDraftModel#fields}
 */
Ext.define('PointInTime.model.UnshelteredSurveyDraftModel', {
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
            'activatedinnationalguard',
            'age',
            'age_range',
            'created_datetime',
            'disabilities_alcohol',
            'disabilities_braininjury',
            'disabilities_chronichealth',
            'disabilities_drug',
            'disabilities_hiv',
            'disabilities_othermh',
            'disabilities_physical',
            'disabilities_ptsd',
            'disabilities_specialed',
            'domesticviolence',
            'doyoureceivedisabilitybenefits',
            'draftid',
            'ethnicity',
            'everreceivedhealthcarebenefits',
            'firsttimehomeless',
            'gender',
            'geocode',
            'hmt',
            'household_entry_number',
            'householdid',
            'howlongshelter_days',
            'howlongshelter_dontknowref',
            'howlongshelter_months',
            'howlongshelter_weeks',
            'howlongshelter_years',
            'howlongthistime_days',
            'howlongthistime_dontknowref',
            'howlongthistime_months',
            'howlongthistime_weeks',
            'howlongthistime_years',
            'initials',
            'keepyoufromliving',
            'location',
            'manualaddress',
            'notes',
            'number_in_household',
            'otherlocation',
            'preventstable_alcohol',
            'preventstable_braininjury',
            'preventstable_chronichealth',
            'preventstable_drug',
            'preventstable_othermh',
            'preventstable_physical',
            'preventstable_ptsd',
            'race_americanalaska',
            'race_asian',
            'race_black',
            'race_nativehawaiian',
            'race_other',
            'race_other_specified',
            'race_white',
            'region',
            'relationshipother',
            'relationshiptoyou',
            'searchlocation',
            'send_date',
            'servedinarmedforces',
            'wheresleepingtonight',
            'zlat',
            'zlng'
        ]
    }
});