/**
 * ## Overview
 * Observation Entry Panel View.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html).  The observation entry panel view is used to display the observation entry survey, the view contains a form with survey questions with submit and save draft buttons.
 *
 * The Observation survey is similar to the Sheltered survey {@link PointInTime.view.ShelteredEntry} and Unsheltered survey {@link PointInTime.view.UnshelteredEntry}.
 *
 * Controllers are responsible for responding to events that occur within the app.  The main controller responds to events within this view: {@link PointInTime.controller.Main}.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/observation.PNG Observation survey Panel}
 */
Ext.define('PointInTime.view.ObservationEntry', {
    extend: 'Ext.form.Panel',
    alias: 'widget.observationentry',
    xtype: 'observationentry',
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
        itemId: 'observationentryform',
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
        title: 'Observation',
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

        this.setValues({
            draftid: random_number,
            household_entry_number: this.getSet_household_entrynumber(),
            locationwhereobserved: '',
            ishomeless: '',
            age_range: '',
            gender: '',
            race_white: '',
            race_black: '',
            race_asian: '',
            race_americanalaska: '',
            race_nativehawaiian: '',
            race_other: '',
            race_other_specified: '',
            ethnicity: '',
            notes: ''
        });
    },
    /**
     * is Valid United States Zip Code
     * @param  {String}  sZip US Zip Code
     * @return {Boolean}      True if valid, false if not
     */
    isValidUSZip: function(sZip) {
        return /^\d{5}(-\d{4})?$/.test(sZip);
    },
    /**
     * Used by Household Entry to update household entry message at the top of the panel.
     */
    updateFormMsg: function() {
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

              var newfield = Ext.create('Ext.form.Field', {
                html: this.getFormmsg()
            });

            this.setFormfield(newfield);


            this.updateFormMsg();

            this.add(
                newfield
            );
        }

        var xgeolat = this.getLat();
        var xgeolng = this.getLng();
        var xmanualaddress = this.getManual_address();

        this.add([
            {
                xtype: 'hiddenfield',
                itemId: 'zlat',
                name: 'zlat',
                value: xgeolat
            },
            {
                xtype: 'hiddenfield',
                itemId: 'zlng',
                name: 'zlng',
                value: xgeolng
            },
            {
                xtype: 'hiddenfield',
                itemId: 'manualaddress',
                name: 'manualaddress',
                value: xmanualaddress
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
            {
                xtype: 'fieldset',
                title: 'Please answer the following<br/>questions:',
                defaults: {labelAlign: 'top', labelWrap: true},
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'whyobservationtool',
                        name: 'whyobservationtool',
                        label: 'Please indicate why you are using<br/>the observation tool:',
                        valueField: 'whyobservationtool',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {whyobservationtool: '', title: ''},
                                {whyobservationtool: 'Cannot enter a site', title: 'Cannot enter a site'},
                                {whyobservationtool: 'Unable to survey (refused, language barrier, etc.)', title: 'Unable to survey (refused, language barrier, etc.)'},
                                {whyobservationtool: 'Do not wish to disturb', title: 'Do not wish to disturb'}
                            ]
                        }
                    }]
            },
            {
                xtype: 'fieldset',
                defaults: {labelWrap: true},
                title: 'Is this person homeless?',
                items: [
                    {
                        xtype: 'label',
                        html: '<div style=\"font-size:small\">How certain are you that the person meets the criteria of staying in a place not meant for human habitation<br/>(i.e., tent, vehicle, park bench, etc.)?</div>',
                        hidden: false,
                        hideAnimation: 'fadeOut',
                        showAnimation: 'fadeIn',
                        style: 'margin:5px 0px;padding:10px;'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'ishomeless',
                        name: 'ishomeless',
                        valueField: 'ishomeless',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {ishomeless: '', title: ''},
                                {ishomeless: 'Definitely', title: 'Definitely'},
                                {ishomeless: 'Possibly', title: 'Possibly'},
                                {ishomeless: 'Not Sure', title: 'Not Sure'}
                            ]
                        }
                    }

                ]
            },
            {
                xtype: 'fieldset',
                defaults: {labelAlign: 'top', labelWrap: true},
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'age_range',
                        name: 'age_range',
                        label: 'Approximately, what is this person’s age?',
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
                        label: 'Is this person male or female?',
                        valueField: 'gender',
                        displayField: 'title',
                        placeHolder: 'Select Answer',
                        store: {
                            data: [
                                {gender: '', title: ''},
                                {gender: 'Male', title: 'Male'},
                                {gender: 'Female', title: 'Female'},
                                {gender: 'Not Sure', title: 'Not Sure'}
                            ]
                        }
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'What is this person\'s race?<br/><div style=\"font-size:small\">You can select one or more races.</div>',
                defaults: {xtype: 'checkboxfield', labelWrap: true, labelWidth: '75%'},
                items: [
                    {name: 'race_white', itemId: 'race_white', label: 'White'},
                    {name: 'race_black', itemId: 'race_black', label: 'Black or<br/>African-American'},
                    {name: 'race_asian', itemId: 'race_asian', label: 'Asian'},
                    {name: 'race_americanalaska', itemId: 'race_americanalaska', label: 'American Indian<br/>or Alaska Native'},
                    {name: 'race_nativehawaiian', itemId: 'race_nativehawaiian', label: 'Native Hawaiian<br/>or Other Pacific<br/>Islander'},
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
                items: [{
                    xtype: 'selectfield',
                    itemId: 'ethnicity',
                    name: 'ethnicity',
                    label: 'Is this person Hispanic or Latino?',
                    valueField: 'ethnicity',
                    labelAlign: 'top',
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
                }]
            },
            {
                xtype: 'fieldset',
                defaults: {labelWrap: true},
                title: 'Other Information or identifying<br/>characteristics',
                items: [
                    {
                        xtype: 'label',
                        html: '<div style=\"font-size:small\">If possible, please include: <ul><li>-Clothing  (hats, accessories, any military or other emblems)<li>-Other physical characteristics or conditions like tattoos, scars, braces, casts, etc.</ul></div>',
                        hidden: false,
                        hideAnimation: 'fadeOut',
                        showAnimation: 'fadeIn',
                        style: 'margin:5px 0px;padding:10px;border-bottom: solid 1px black;'

                    },
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
                items: [{
                    xtype: 'button',
                    scope: me,
                    itemId: 'submitObservationButton',
                    text: 'Submit Observation Survey',
                    ui: 'confirm',
                    disabled: this.getIsdraft() ? false : true
                }]
            },
            {
                xtype: 'fieldset',
                style: 'padding-top:10px;',
                items: [{
                    xtype: 'button',
                    scope: me,
                    itemId: 'addObservationDraft',
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

