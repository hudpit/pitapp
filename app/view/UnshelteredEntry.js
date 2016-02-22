/**
 * ## Overview
 * Unsheltered Entry Survey View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The unsheltered entry panel view is used to display the unsheltered entry survey, the view contains a form with survey questions with submit and save draft buttons.
 *
 * The Unsheltered survey is similar to the Sheltered survey {@link PointInTime.view.ShelteredEntry} and Observation survey {@link PointInTime.view.ObservationEntry}.
 *
 * Controllers are responsible for responding to events that occur within the app.  The main controller responds to events within this view: {@link PointInTime.controller.Main}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/unsheltered.PNG Unsheltered Syrvey Panel}
 */
Ext.define('PointInTime.view.UnshelteredEntry', {
    extend: 'Ext.form.Panel',
    alias: 'widget.UnshelteredEntry',
    xtype: 'unshelteredentry',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} xtype
         * xtype name for panel widget
         */
        xtype: 'formpanel',
        /**
         * @cfg {Boolean} standardSubmit
         * Whether or not we want to perform a standard form submit. True or False
         */
        standardSubmit: false,
        /**
         * @cfg {Boolean} submitOnAction
         * True or False.  When this is set to true, the form will automatically submit itself whenever the action event fires on a field in this form. The action event usually fires whenever you press go or enter inside a textfield.
         */
        submitOnAction: false,
        /**
         * @cfg {Boolean} isdraft
         * Whether or not item is a draft. True or False
         */
        isdraft: true,
        /**
         * @cfg {String} itemId
         * Panel itemId
         */
        itemId: 'UnshelteredEntryform',
        /**
         * @cfg {String} formmsg
         * Form msg heading, used for household entry text
         */
        formmsg: null,
        /**
         * @cfg {String} formfield
         * Form field for heading, used for household entry text
         */
        formfield: null,
        /**
         * @cfg {String} set_household_id
         * Household ID
         */
        set_household_id: null,
        /**
         * @cfg {String} set_household_entrynumber
         * Household Entry Number x of x
         */
        set_household_entrynumber: null,
        /**
         * @cfg {String} set_number_in_household
         * Household Total Number in Household
         */
        set_number_in_household: null,
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Unsheltered',
        /**
         * @cfg {String} iconCls
         * String of icon Class
         */
        iconCls: 'user',
        /**
         * @cfg {Boolean} isNew
         * Whether or not item is new, True or False
         */
        isNew: false,
        /**
         * @cfg {Object} defaults
         * Object with panel defaults
         */
        defaults: {labelWrap: true},
        /**
         * @cfg {Numeric} lat
         * Latitude
         */
        lat: null,
        /**
         * @cfg {Numeric} lng
         * Longitude
         */
        lng: null,
        /**
         * @cfg {String} manual_address
         * String of manual address
         */
        manual_address: null,
        /**
         * @cfg {Object} listeners
         * Form Panel Events
         */
        listeners: {
            order: 'before',
            beforesubmit: function() {
                return false;
            }
        }
    },

    /** used for Household Entries to clear them for the next entry */
    clearForNextEntry: function() {

        //it would be great to call the form panel reset() method but missing from sencha touch2 for no explicable reason. a bug.

        var random_number = Math.floor(Math.random() * 99999);

         //increment entry and update msg;

        this.setSet_household_entrynumber(this.getSet_household_entrynumber() + 1);

        this.updateFormMsg();
        //blank form for next submission

        this.setValues({
            draftid: random_number,
            household_entry_number: this.getSet_household_entrynumber(),
            age: '',
            age_range: '',
            initials: '',
            race_white: '',
            race_black: '',
            race_asian: '',
            race_americanalaska: '',
            race_nativehawaiian: '',
            race_other: '',
            race_other_specified: '',
            firsttimehomeless: '',
            ethnicity: '',
            disabilities_alcohol: '',
            disabilities_drug: '',
            disabilities_chronichealth: '',
            disabilities_ptsd: '',
            disabilities_othermh: '',
            disabilities_physical: '',
            disabilities_braininjury: '',
            disabilities_specialed: '',
            disabilities_hiv: '',
            doyoureceivedisabilitybenefits: '',
            hmt: '',
            servedinarmedforces: '',
            activatedinnationalguard: '',
            domesticviolence: '',
            gender: '',
            notes: '',
            relationshiptoyou: '',
            relationshipother: '',
            preventstable_alcohol: '',
            preventstable_drug: '',
            preventstable_chronichealth: '',
            preventstable_ptsd: '',
            preventstable_othermh: '',
            preventstable_physical: '',
            preventstable_braininjury: '',
            howlongthistime_days: '',
            howlongthistime_weeks: '',
            howlongthistime_months: '',
            howlongthistime_years: '',
            howlongthistime_dontknowref: '',
            howlongshelter_days: '',
            howlongshelter_weeks: '',
            howlongshelter_months: '',
            howlongshelter_years: '',
            howlongshelter_dontknowref: '',
            everreceivedhealthcarebenefits: '',
            keepyoufromliving: '',
            wheresleepingtonight: '',
            otherlocation: ''
        });
    },
    /**
     * is Valid United States Zip Code
     * @param  {String}  sZip US Zip Code
     * @return {Boolean}      True if valid, false if not
     */
    isValidUSZip : function(sZip) {
       return /^\d{5}(-\d{4})?$/.test(sZip);
    },

    /**
     * Used by Household Entry to update household entry message at the top of the panel.
     */
    updateFormMsg : function() {
        var fieldhtml = '<div style="padding:5px">You are editing Household ID:' + this.getSet_household_id() + ' - Entry: ' + this.getSet_household_entrynumber() + ' of ' + this.getSet_number_in_household() + '<br/>Please do not navigate away from this screen or you will have to start again.</div>';

        this.setFormmsg(fieldhtml);
        this.getFormfield().setHtml(fieldhtml);

        this.setTitle(this.getSet_household_entrynumber() + ' of ' + this.getSet_number_in_household());

    },
    /**
     * Initalize functions, fires on view init
     * This method is called automatically.
     */
    initialize: function() {

        this.callParent();

        var me = this;
        var random_number = Math.floor(Math.random() * 99999);
        var currentTime = new Date();

        if (this.getSet_household_id()) {

            //is household set to 1
            var newfield = Ext.create('Ext.form.Field', {
                html: this.getFormmsg()
            });

            this.setFormfield(newfield);
            this.updateFormMsg();
            this.add(newfield);
        }

        var entry_lat = this.getLat();
        var entry_lng = this.getLng();
        var entry_manualaddress = this.getManual_address();

        var mainfieldset = Ext.create('Ext.form.FieldSet', {
            title: 'Please answer the following<br/>questions:',
            defaults: {labelAlign: 'top', labelWrap: true}
        });

        if (this.getSet_household_id()) {
            mainfieldset.add([
                {
                    xtype: 'selectfield',
                    itemId: 'relationshiptoyou',
                    name: 'relationshiptoyou',
                    label: 'How is this person related to you/Person 1?',
                    valueField: 'relationship',
                    displayField: 'title',
                    placeHolder: 'Select One',
                    store: {
                        data: [
                            {relationship: '', title: ''},
                            {relationship: 'Self', title: 'Self'},
                            {relationship: 'Child', title: 'Child'},
                            {relationship: 'Spouse', title: 'Spouse'},
                            {relationship: 'Other Family', title: 'Other Family'},
                            {relationship: 'Non-Married Partner', title: 'Non-Married Partner'},
                            {relationship: 'Other, Non Family', title: 'Other, Non Family'}
                        ]
                    }
                },
                {
                    xtype: 'textfield',
                    label: 'If Other...',
                    name: 'relationshipother',
                    itemId: 'relationshipother'
                }
            ]);
        }

        mainfieldset.add([
            {
                xtype: 'selectfield',
                itemId: 'wheresleepingtonight',
                name: 'wheresleepingtonight',
                label: 'Where are you sleeping tonight?',
                valueField: 'where',
                displayField: 'title',
                placeHolder: 'Select One',
                store: {
                    data: [
                        {where: '', title: ''},
                        {where: 'Street or sidewalk', title: 'Street or sidewalk'},
                        {where: 'Vehicle (car, van, RV, truck) ', title: 'Vehicle (car, van, RV, truck) '},
                        {where: 'Park', title: 'Park'},
                        {where: 'Abandoned building', title: 'Abandoned building'},
                        {where: 'Bus, train station, airport', title: 'Bus, train station, airport'},
                        {where: 'Under bridge/overpass', title: 'Under bridge/overpass'},
                        {where: 'Woods or outdoor encampment', title: 'Woods or outdoor encampment'},
                        {where: 'Emergency shelter', title: 'Emergency shelter'},
                        {where: 'Transitional housing', title: 'Transitional housing'},
                        {where: 'Motel/hotel ', title: 'Motel/hotel'},
                        {where: 'House or apartment', title: 'House or apartment'},
                        {where: 'Jail, hospital, treatment program', title: 'Jail, hospital, treatment program'},
                        {where: 'Other', title: 'Other'}
                    ]
                }
            },
            {
                xtype: 'textfield',
                label: 'If Other Location',
                name: 'otherlocation',
                itemId: 'otherlocation'
            },
            {
                xtype: 'textfield',
                label: 'What are your initials?',
                name: 'initials',
                itemId: 'initials',
                autoCorrect: false,
                autoCapitalize: false
            },
            {
                xtype: 'numberfield',
                label: 'How old are you?',
                minValue: 0,
                maxValue: 150,
                maxLength: 3,
                name: 'age',
                itemId: 'age'
            },
            {
                xtype: 'selectfield',
                itemId: 'age_range',
                name: 'age_range',
                label: 'If hesitant, ask \"Are you...\"',
                valueField: 'age_range',
                displayField: 'title',
                placeHolder: 'Select Answer',
                store: {
                    data: [
                        {age_range: '', title: ''},
                        {age_range: 'Under 18', title: 'Under 18'},
                        {age_range: '18-24', title: '18-24'},
                        {age_range: '25+', title: '25+'},
                        {age_range: 'Not sure', title: 'Not sure'}
                    ]
                }
            },
            {
                xtype: 'selectfield',
                itemId: 'gender',
                name: 'gender',
                label: 'Are you male, female or transgender?',
                valueField: 'gender',
                displayField: 'title',
                placeHolder: 'Select Answer',
                store: {
                    data: [
                        {gender: '', title: ''},
                        {gender: 'Male', title: 'Male'},
                        {gender: 'Female', title: 'Female'},
                        {gender: 'Transgender Male to Female', title: 'Transgender Male to Female'},
                        {gender: 'Transgender Female to Male', title: 'Transgender Female to Male'}

                    ]
                }
            },
            {
                xtype: 'selectfield',
                itemId: 'ethnicity',
                name: 'ethnicity',
                label: 'Are you Hispanic or Latino?',
                valueField: 'ethnicity',
                displayField: 'title',
                placeHolder: 'Select Answer',
                store: {
                    data: [
                        {ethnicity: '', title: ''},
                        {ethnicity: 'Yes', title: 'Yes'},
                        {ethnicity: 'No', title: 'No'},
                        {ethnicity: 'Don\'t Know', title: 'Don\'t Know'},
                        {ethnicity: 'Refused', title: 'Refused'}
                    ]
                }
            }
        ]);

        this.add([
            {
                xtype: 'hiddenfield',
                itemId: 'zlat',
                name: 'zlat',
                value: entry_lat
            },
            {
                xtype: 'hiddenfield',
                itemId: 'zlng',
                name: 'zlng',
                value: entry_lng
            },
            {
                xtype: 'hiddenfield',
                itemId: 'manualaddress',
                name: 'manualaddress',
                value: entry_manualaddress
            },
            {
                xtype: 'hiddenfield',
                itemId: 'householdid',
                name: 'householdid',
                value: me.getSet_household_id()
            },
            {
                xtype: 'hiddenfield',
                itemId: 'household_entry_number',
                name: 'household_entry_number',
                value: me.getSet_household_entrynumber()
            },
            {
                xtype: 'hiddenfield',
                itemId: 'number_in_household',
                name: 'number_in_household',
                value: me.getSet_number_in_household()
            },
            {
                xtype: 'hiddenfield',
                itemId: 'draftid',
                name: 'draftid',
                value: random_number
            },
            {
                xtype: 'hiddenfield',
                itemId: 'created_datetime',
                name: 'created_datetime',
                value: currentTime
            },
            mainfieldset,

            {
                xtype: 'fieldset',
                title: 'What is your race?<br/><div style=\"font-size:small;\">You can select one or more races.</div>',
                defaults: {xtype: 'checkboxfield', labelWidth: '75%'},
                items: [
                    {name: 'race_americanalaska', itemId: 'race_americanalaska', label: 'American Indian<br/>or Alaska Native'},
                    {name: 'race_asian', itemId: 'race_asian', label: 'Asian'},
                    {name: 'race_black', itemId: 'race_black', label: 'Black or African-American'},
                    {name: 'race_nativehawaiian', itemId: 'race_nativehawaiian', label: 'Native Hawaiian<br/>or Other Pacific Islander'},
                    {name: 'race_white', itemId: 'race_white', label: 'White'},
                    {name: 'race_other', itemId: 'race_other', label: 'Other'},
                    {
                        xtype: 'textfield',
                        labelAlign: 'top',
                        label: 'If Other Race...',
                        name: 'race_other_specified',
                        itemId: 'race_other_specified'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {labelAlign: 'top', labelWrap: true},
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'firsttimehomeless',
                        name: 'firsttimehomeless',
                        label: 'Is this the first time you have been homeless?',
                        valueField: 'ans',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {ans: '', title: ''},
                                {ans: 'Yes', title: 'Yes'},
                                {ans: 'No', title: 'No'},
                                {ans: 'Don\'t Know', title: 'Don\'t Know' },
                                {ans: 'Refused', title: 'Refused' }
                            ]
                        }
                    },
                    {
                        xtype: 'label',
                        html: '<div style="Font-size:smaller;font-weight:bold;">How long have you been homeless <u>this time</u>? Only include time spent staying in shelters and/or on the streets.</div>',
                        style: 'margin:5px 0px;padding:10px;'
                    },
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongthistime_days', itemId: 'howlongthistime_days', label: 'Days'},
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongthistime_weeks', itemId: 'howlongthistime_weeks', label: 'Weeks'},
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongthistime_months', itemId: 'howlongthistime_months', label: 'Months'},
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongthistime_years', itemId: 'howlongthistime_years', label: 'Years'},
                    {xtype: 'checkboxfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongthistime_dontknowref', itemId: 'howlongthistime_dontknowref', label: 'Don\'t Know/Refused'},
                    {
                        xtype: 'selectfield',
                        itemId: 'hmt',
                        name: 'hmt',
                        label: 'Including this time, how many separate times have you stayed in shelters or on the streets in the past 3 years?',
                        valueField: 'lot',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {lot: '', title: ''},
                                {lot: 'Less than 4 times', title: 'Less than 4 times'},
                                {lot: '4 or more times', title: '4 or more times'},
                                {lot: 'Don\'t Know/Refused', title: 'Don\'t Know/Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'label',
                        html: '<div style="Font-size:smaller;font-weight:bold;">In total, how long did you stay in shelters or on the streets during those times?</div>',
                        style: 'margin:5px 0px;padding:10px;'
                    },
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongshelter_days', itemId: 'howlongshelter_days', label: 'Days'},
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongshelter_weeks', itemId: 'howlongshelter_weeks', label: 'Weeks'},
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongshelter_months', itemId: 'howlonshelter_months', label: 'Months'},
                    {xtype: 'numberfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongshelter_years', itemId: 'howlongshelter_years', label: 'Years'},
                    {xtype: 'checkboxfield', labelWidth: '70%', labelWrap: true, labelAlign: 'right', name: 'howlongshelter_dontknowref', itemId: 'howlongshelter_dontknowref', label: 'Don\'t Know/Refused'}
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {labelWrap: true},
                title: 'ADULTS ONLY QUESTIONS<br/>(18 years or older)',
                items: [
                    {
                        xtype: 'label',
                        html: '<div style="Font-size:smaller">If this survey is being conducted for a person age 18 or older then please ask the remaining questions. Otherwise, please submit or save the survey and leave the remaining survey questions blank.</div>',
                        style: 'margin:5px 0px;padding:10px;'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {labelWrap: true, labelAlign: 'top'},
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'servedinarmedforces',
                        name: 'servedinarmedforces',
                        label: 'Have you ever served in the US Armed Forces (Army, Navy, Air Force, Marine Corps, or Coast Guard)?',
                        valueField: 'ans',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {ans: '', title: ''},
                                {ans: 'Yes', title: 'Yes'},
                                {ans: 'No', title: 'No'},
                                {ans: 'Don\'t Know', title: 'Don\'t Know' },
                                {ans: 'Refused', title: 'Refused' }
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'activatedinnationalguard',
                        name: 'activatedinnationalguard',
                        label: 'Were you ever called into active duty as a member of the National Guard or as a Reservist?',
                        valueField: 'ans',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {ans: '', title: ''},
                                {ans: 'Yes', title: 'Yes'},
                                {ans: 'No', title: 'No'},
                                {ans: 'Don\'t Know', title: 'Don\'t Know' },
                                {ans: 'Refused', title: 'Refused' }
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'everreceivedhealthcarebenefits',
                        name: 'everreceivedhealthcarebenefits',
                        label: 'Have you ever received health care or benefits from a VA medical center?',
                        valueField: 'everreceivedhealthcarebenefits',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {everreceivedhealthcarebenefits: '', title: ''},
                                {everreceivedhealthcarebenefits: 'Yes', title: 'Yes'},
                                {everreceivedhealthcarebenefits: 'No', title: 'No'},
                                {everreceivedhealthcarebenefits: 'Don\'t Know', title: 'Don\'t Know'},
                                {everreceivedhealthcarebenefits: 'Refused', title: 'Refused'}
                            ]
                        }
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {labelWrap: true},
                items: [{
                    xtype: 'label',
                    html: '<div style="Font-size:smaller">Many situations can cause someone to become homeless or make it hard for them to live on their own. <br/><br/>Are any of these situations true of you?</div>',
                    style: 'margin:5px 0px;padding:10px;'
                }]
            },
            {
                xtype: 'fieldset',
                defaults: {labelWidth: '75%', labelWrap: true, labelAlign: 'top'},
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_alcohol',
                        name: 'disabilities_alcohol',
                        label: 'Do you drink alcohol?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_drug',
                        name: 'disabilities_drug',
                        label: 'Do you use illegal drugs?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_chronichealth',
                        name: 'disabilities_chronichealth',
                        label: 'Do you have any onging health problems or medical conditions such as diabetes, cancer or heart disease?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_ptsd',
                        name: 'disabilities_ptsd',
                        label: 'Do you have Post-Traumatic Stress Disorder or PTSD?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_othermh',
                        name: 'disabilities_othermh',
                        label: 'Do you have pyschiatric or emotional conditions such as depression or schizophrenia?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_physical',
                        name: 'disabilities_physical',
                        label: 'Do you have a physical disability?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },

                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_braininjury',
                        name: 'disabilities_braininjury',
                        label: 'Have you ever had a traumatic injury to your brain from a bump, blow, or wound to the head?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {xtype: 'checkboxfield', labelWidth: '75%', labelWrap: true},
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'keepyoufromliving',
                        name: 'keepyoufromliving',
                        label: 'Do any situations we just discussed keep you from holding a job or living in stable housing?',
                        valueField: 'answer',
                        displayField: 'title',
                        labelAlign: 'top',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'label',
                        html: '<div style="Font-size:smaller">If Yes to any of those situations, which ones keep you from holding a job or living in stable housing?</div>',
                        style: 'margin:5px 0px;padding:10px;'
                    },
                    {name: 'preventstable_alcohol', itemId: 'preventstable_alcohol', label: 'Alcohol Abuse'},
                    {name: 'preventstable_drug', itemId: 'preventstable_drug', label: 'Drug Dependency'},
                    {name: 'preventstable_chronichealth', itemId: 'preventstable_ongoinghealth', label: 'Ongoing Health Condition'},
                    {name: 'preventstable_ptsd', itemId: 'preventstable_ptsd', label: 'PTSD'},
                    {name: 'preventstable_othermh', itemId: 'preventstable_othermd', label: 'Psychiatric/Emotional Condition'},
                    {name: 'preventstable_physical', itemId: 'preventstable_physical', label: 'Physical Disability'},
                    {name: 'preventstable_braininjury', itemId: 'preventstable_braininjury', label: 'Brain Injury'}
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Questions',
                defaults: {labelAlign: 'top', labelWrap: true},
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_specialed',
                        name: 'disabilities_specialed',
                        label: 'Have you ever received special education [or special ed.] services for more than 6 months?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'disabilities_hiv',
                        name: 'disabilities_hiv',
                        label: 'Do you have AIDS or an HIV-related illness?',
                        valueField: 'answer',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {answer: '', title: ''},
                                {answer: 'Yes', title: 'Yes'},
                                {answer: 'No', title: 'No'},
                                {answer: 'Don\'t Know', title: 'Don\'t Know'},
                                {answer: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'doyoureceivedisabilitybenefits',
                        name: 'doyoureceivedisabilitybenefits',
                        label: 'Do you receive disability benefits? (e.g. SSI, SSDI, Veterans disability benefits)',
                        valueField: 'doyoureceivedisabilitybenefits',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {doyoureceivedisabilitybenefits: '', title: ''},
                                {doyoureceivedisabilitybenefits: 'Yes', title: 'Yes'},
                                {doyoureceivedisabilitybenefits: 'No', title: 'No'},
                                {doyoureceivedisabilitybenefits: 'Don\'t Know', title: 'Don\'t Know'},
                                {doyoureceivedisabilitybenefits: 'Refused', title: 'Refused'}
                            ]
                        }
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'domesticviolence',
                        name: 'domesticviolence',
                        label: 'Have you ever been physically, emotionally, or sexually abused by a relative or another person you have stayed with?',
                        valueField: 'ans',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {ans: '', title: ''},
                                {ans: 'Yes', title: 'Yes'},
                                {ans: 'No', title: 'No'},
                                {ans: 'Don\'t Know', title: 'Don\'t Know'},
                                {ans: 'Refused', title: 'Refused'}
                            ]
                        }
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {labelAlign: 'top', labelWrap: true},
                title: 'Notes',
                items: [
                    {
                        xtype: 'textareafield',
                        name: 'notes',
                        itemId: 'notes',
                        maxRows: 4
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'padding-top:10px;',
                items: [
                    {
                        xtype: 'button',
                        scope: me,
                        itemId: 'submitUnsheltered',
                        text: navigator.onLine ? 'Submit Survey' : 'Submit Requires Internet',
                        ui: 'confirm',
                        disabled: ((this.getIsdraft() ? false : true) || (navigator.onLine ? false : true))
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'padding-top:10px;',
                items: [{
                    xtype: 'button',
                    scope: me,
                    itemId: 'addUnshelteredDraft',
                    text: 'Save Draft',
                    ui: 'confirm',
                    disabled: this.getIsdraft() ? false : true
                }]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'xlogouticon',
                        align: 'right',
                        action: 'logoutuser',
                        itemId: 'logoutbutton',
                        text: 'Logout',
                        hidden: (!navigator.onLine ? true : false)
                    }
                ]
            }
        ]);
    }
});

