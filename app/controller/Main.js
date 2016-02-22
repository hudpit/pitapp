/**
 * ## Overview
 * The main controller is a controller used to listen to events regarding survey views.  The main controller listens for events on the 'pitDrafts' {@link PointInTime.view.PITDrafts} view, the 'unshelteredentry' {@link PointInTime.view.UnshelteredEntry} survey view, the 'observationentry' {@link PointInTime.view.ObservationEntry} survey view and the 'shelteredentry' {@link PointInTime.view.ShelteredEntry} view.  This controller is used to handle functions for opening surveys, submitting surveys and saving drafts.
 *
 * Controllers are responsible for responding to events that occur within your app. If your app contains a Logout button that your user can tap on, a Controller listens to the Button’s tap event and takes the appropriate action. While View classes handles the display of data and Model classes handle the loading and saving of data, Controller classes are the glue that binds Views and Models together.
 */
Ext.define('PointInTime.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax'
    ],
    /**
     * @cfg {Object} config
     * Controller config object
     */
    config: {
        stores: ['PITEntryDrafts', 'UnshelteredSurveyDrafts', 'ShelteredSurveyDrafts', 'ObservationSurveyDrafts'],
        models: ['PITEntryDraftModel', 'UnshelteredSurveyDraftModel', 'ShelteredSurveyDraftModel', 'ObservationSurveyDraftModel'],
        /**
         * @cfg {Object} refs
         * Controller References / Leverages ComponentQuery
         */
        refs: {
            myPITDrafts: 'pitDrafts',
            homepanel: 'homepanel'
        },
        /**
         * @cfg {Object} control
         *
         * Control Listens to app events
         */
        control : {
            'pitDrafts list[itemId=PITDraftList]': {
                itemtap: 'onSelectPITDraft'
            },
            'unshelteredentry button[itemId=addUnshelteredDraft]': {
                tap: 'onSaveUnshelteredDraft'
            },
            'unshelteredentry button[itemId=submitUnsheltered]': {
                tap: 'onSubmitUnshelteredDraft'
            },
            'unshelteredentry button[itemId=openPITHelpbutton]': {
                tap: 'openHelp'
            },
            'observationentry button[itemId=addObservationDraft]': {
                tap: 'onSaveObservationSurveyDraft'
            },
            'observationentry button[itemId=submitObservationButton]': {
                tap: 'onSubmitObservationSurveyDraft'
            },
            'shelteredentry button[itemId=addShelteredDraft]': {
                tap: 'onSaveShelteredSurveyDraft'
            },
            'shelteredentry button[itemId=submitSheltered]': {
                tap: 'onSubmitShelteredSurveyDraft'
            },
            'shelteredentry button[itemId=openShelteredHelpbutton]': {
                tap: 'openHelp'
            }
        }
    },

    /**
     * Get User Project Data URL for validation
     * @return {String} URL if url check is sucessful, false if invalid.
     */
    checkSubmissionUrl: function() {

        var userProjects = Ext.getStore('appsettings');
        var url;

        if (userProjects.getCount() === 1) {
            url = userProjects.getAt(0).get('datastore_url');
        } else if (userProjects.getCount() > 1) {
            //get the selected project, once project selection implemented.
            //For now, just get the first one
            url = userProjects.getAt(0).get('datastore_url');
        } else {
            Ext.Msg.alert('No Counts', "You have not been associated to any counts. Please Save Draft and go to settings to select a count to submit for");
            return false;
        }

        var urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        var urlCheck = new RegExp(urlRegEx);

        if (!urlCheck.test(url)) {
            Ext.Msg.alert('Invalid Url', "The Url for the currently selected count is invalid. Please see your count administrator.");
            return false;
        } else {
            return url;
        }

    },

    /** open Main Panel Help
    * Users taps open help button on 'unshelteredentry' or 'observationentry' or 'shelteredentry'
    */
    openHelp: function() {

        //define help panel with help html
        var helppanel = Ext.create('Ext.Panel', {
            title: 'Help',
            scrollable: true,
            html: '<div style="font-family:tahoma;font-size:14px;padding:15px;"><b>APPENDIX B - DEFINITIONS</b><br/><br><b>Chronic Substance Abuse</b> - This category on the PIT includes persons with a substance abuse problem (alcohol abuse, drug abuse, or both) that is expected to be of long-continued and indefinite duration and substantially impairs the person\'s ability to live independently.<br/><br/><b>Chronically Homeless Individual</b> - An unaccompanied homeless adult individual (persons 18 years or older) with a disabling condition (see definition below) who has either been continuously homeless for a year or more OR has had at least four (4) separate occasions of homelessness in the past three (3) years. To be considered chronically homeless, persons must have been sleeping in a place not meant for human habitation (e.g., living on the streets) and/or in an emergency shelter/Safe Haven during that time. Persons under the age of 18 are not counted as chronically homeless. For purposes of the PIT, persons living in transitional housing at the time of the PIT count should not be included in this subpopulation category.<br/><br/><b>Chronically Homeless Family</b> - A household with at least one adult member (persons 18 or older) who has a disabling condition (see definition below) and who has either been continuously homeless for a year or more OR has had at least four (4) separate occasions of homelessness in the past three (3) years. To be considered chronically homeless, persons must have been sleeping in a place not meant for human habitation (e.g., living on the streets) and/or in an emergency shelter/Safe Haven during that time. The subpopulation count should include all members of the household. For purposes of the PIT, persons living in transitional housing at the time of the PIT count should not be included in this subpopulation category.Contributory HMIS Program - A program that contributes Protected Personal Information (PPI) or other client-level data to an HMIS.<br/><br/><b>Disabling Condition</b> - Any one of (1) a disability as defined in Section 223 of the Social Security Act; (2) a physical, mental, or emotional impairment which is (a) expected to be of long-continued and indefinite duration, (b) substantially impedes an individual\'s ability to live independently, and (c) of such a nature that such ability could be improved by more suitable housing conditions; (3) a developmental disability as defined in Section 102 of the Developmental Disabilities Assistance and Bill of Rights Act; (4) the disease of acquired immunodeficiency syndrome or any conditions arising from the etiological agency for acquired immunodeficiency syndrome; or (5) a diagnosable substance abuse disorder.<br/><br/><b>Persons with HIV/AIDS</b> - This subpopulation category of the PIT includes persons who have been diagnosed with AIDS and/or have tested positive for HIV.<br/><br/><b>Severely Mentally Ill (SMI)</b>  - This subpopulation category of the PIT includes persons with mental health problems that are expected to be of long-continued and indefinite duration and substantially impairs the person\'s ability to live independently.<br/><br/><b>Veteran</b> - This subpopulation category of the PIT includes persons who have served on active duty in the Armed Forces of the United States. This does not include inactive military reserves or the National Guard unless the person was called up to active duty.  <br/><br/><b>Victims of Domestic Violence</b> - This subpopulation category of the PIT includes persons who have been victims of domestic violence at any point in the past.</div>'
        });

        //push help panel to home panel
        this.getHomepanel().push(helppanel);
    },

    /**
     * on Select Draft From List, fired when a user taps an entry on the PIT Drafts screen
     * {@link PointInTime.view.PITDrafts}
     * @param  {Ext.dataview.DataView} view   The drafts panel associated view
     * @param  {Number} index  The index of the item tapped
     * @param  {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem tapped
     * @param  {Ext.data.Model} record The record associated to the item
     * @param  {Ext.EventObject} event  The event object
     */
    onSelectPITDraft: function(view, index, target, record, event) {
        var newpit, indx;
        var r_stype = record.data.surveytype;
        var r_hh_len = record.data.householdid.length;
        var r_hh_en = record.data.household_entry_number;
        var r_hh_nih = record.data.number_in_household;
        var r_hh_id = record.data.householdid;
        var r_draftid = record.data.draftid;

        switch (r_stype) {
            case 'Unsheltered Survey': {

                //number in household great than 0
                if (r_hh_len > 0) {
                    newpit = Ext.create('PointInTime.view.UnshelteredEntry', {
                        title: 'Updating ' + r_hh_en + ' of ' + r_hh_nih,
                        set_household_id: r_hh_id,
                        set_household_entrynumber: r_hh_en,
                        set_number_in_household: r_hh_nih});
                } else {

                    newpit = Ext.create('PointInTime.view.UnshelteredEntry');
                }

                //find draft in store
                indx = Ext.getStore('UnshelteredSurveyDrafts').find('draftid', r_draftid);
                //set survey record to draft data
                newpit.setRecord(Ext.getStore('UnshelteredSurveyDrafts').getAt(indx));
                break;
            }
            case 'Sheltered Survey': {

                //number in household great than 0
                if (r_hh_len > 0) {
                    newpit = Ext.create('PointInTime.view.ShelteredEntry', {
                        title: 'Updating ' + r_hh_en + ' of ' + r_hh_nih,
                        set_household_id: r_hh_id,
                        set_household_entrynumber: r_hh_en,
                        set_number_in_household: r_hh_nih
                    });
                } else {
                    newpit = Ext.create('PointInTime.view.ShelteredEntry');
                }

                //find draft in store
                indx = Ext.getStore('ShelteredSurveyDrafts').find('draftid', r_draftid);
                //set survey record to draft data
                newpit.setRecord(Ext.getStore('ShelteredSurveyDrafts').getAt(indx));
                break;
            }
            case 'Observation Survey': {

                //number in household great than 0
                if (r_hh_len > 0) {
                    newpit = Ext.create('PointInTime.view.ObservationEntry', {
                        title: 'Updating ' + r_hh_en + ' of ' + r_hh_nih,
                        set_household_id: r_hh_id,
                        set_household_entrynumber: r_hh_en,
                        set_number_in_household: r_hh_nih});
                } else {
                    newpit = Ext.create('PointInTime.view.ObservationEntry');
                }

                //find draft in store
                indx = Ext.getStore('ObservationSurveyDrafts').find('draftid', r_draftid);
                //set survey record to draft data
                newpit.setRecord(Ext.getStore('ObservationSurveyDrafts').getAt(indx));
                break;
            }
        }

        this.getHomepanel().push(newpit);
    },
    /**
     * on Save Observation Survey Draft
     * @param  {Ext.Button} button Save Button
     */
    onSaveObservationSurveyDraft: function(button) {

        var navview = button.up('navigationview');
        var form = button.up('panel');
        //get the record

        var record = form.getRecord();
        //get the form values

        var ghouseholdid = form.getSet_household_id();
        var values = form.getValues();

        if (!this.isObservationBlank(values)) {

            if (!record){
                var newRecord = new PointInTime.model.ObservationSurveyDraftModel(values);
                Ext.getStore('ObservationSurveyDrafts').add(newRecord);

                Ext.getStore('PITEntryDrafts').add({
                    surveytype: 'Observation Survey',
                    created_datetime: values.created_datetime,
                    draftid: values.draftid,
                    householdid: values.householdid,
                    location: values.location,
                    household_entry_number: values.household_entry_number,
                    number_in_household: values.number_in_household
                });
            }
            else {
                //existing PIT draft
                record.set(values);
            }

            //save the data to the Web local Storage
            Ext.getStore('ObservationSurveyDrafts').sync();
            Ext.getStore('PITEntryDrafts').sync();

            if (!ghouseholdid || form.getIsNew() === false) {
                // individual save and close the form
                navview.pop(navview.getInnerItems().length);
            } else {
                // household, count the increment before pop

                if (form.getSet_household_entrynumber() < form.getSet_number_in_household()) {

                    var householdobservation = Ext.create('PointInTime.view.ObservationEntry', {
                        isNew:true,
                        title:form.getSet_household_entrynumber() + 1 + ' of ' + form.getSet_number_in_household(),
                        set_household_id: form.getSet_household_id(),
                        set_household_entrynumber: form.getSet_household_entrynumber() + 1,
                        set_number_in_household: form.getSet_number_in_household(),
                        lat:form.getLat(),
                        lng:form.getLng(),
                        manual_address:form.getManual_address()
                    });

                    //fix for overlap bug
                    var anim = navview.getLayout().getAnimation();
                    navview.getLayout().setAnimation(false); //set animation to false
                    navview.pop(navview.getInnerItems().length);
                    navview.getLayout().setAnimation(anim);  //restore animation
                    navview.push(householdobservation);

                } else {
                    navview.pop(navview.getInnerItems().length);
                }
            }

            Ext.Msg.alert('Thank You', 'Observation Survey Saved.', Ext.emptyFn);
        } else {

            Ext.Msg.alert('Sorry', 'Cannot save a blank survey.', Ext.emptyFn);
        }

    },
    /**
     * on Save Unsheltered Draft
     * @param  {Ext.Button} button Save Button
     */
    onSaveUnshelteredDraft: function(button) {

        var navview = button.up('navigationview');
        var form = button.up('panel');
        //get the record

        var record = form.getRecord();
        //get the form values

        var ghouseholdid = form.getSet_household_id();
        var values = form.getValues();

        //if survey is not blank
        if (!this.isUnshelteredBlank(values)) {

            if(!record){
                var newRecord = new PointInTime.model.UnshelteredSurveyDraftModel(values);
                Ext.getStore('UnshelteredSurveyDrafts').add(newRecord);

                Ext.getStore('PITEntryDrafts').add({
                    surveytype: 'Unsheltered Survey',
                    created_datetime: values.created_datetime,
                    draftid: values.draftid,
                    householdid: values.householdid,
                    location: values.location,
                    household_entry_number: values.household_entry_number,
                    number_in_household: values.number_in_household
                });


            }
            else {
                //existing PIT draft
                record.set(values);
            }

            //save the data to the Web local Storage
            Ext.getStore('UnshelteredSurveyDrafts').sync();
            Ext.getStore('PITEntryDrafts').sync();

            if (!ghouseholdid || form.getIsNew() === false) {
                // individual save and close the form
                navview.pop(navview.getInnerItems().length);
            } else {
                // household, count the increment before pop

                if (form.getSet_household_entrynumber() < form.getSet_number_in_household()) {

                    var householdpit = Ext.create('PointInTime.view.UnshelteredEntry', {
                        isNew:true,
                        title:form.getSet_household_entrynumber() + 1 + ' of ' + form.getSet_number_in_household(),
                        set_household_id: form.getSet_household_id(),
                        set_household_entrynumber: form.getSet_household_entrynumber() + 1,
                        set_number_in_household: form.getSet_number_in_household(),
                        lat:form.getLat(),
                        lng:form.getLng(),
                        manual_address:form.getManual_address()
                    });


                    //fix for overlap bug
                    var anim = navview.getLayout().getAnimation();
                    navview.getLayout().setAnimation(false); //set animation to false
                    navview.pop(navview.getInnerItems().length);
                    navview.getLayout().setAnimation(anim);  //restore animation

                    navview.push(householdpit);

                } else {
                    navview.pop(navview.getInnerItems().length);
                }
            }

            Ext.Msg.alert('Thank You', 'Survey Saved.', Ext.emptyFn);
        } else {

            Ext.Msg.alert('Sorry', 'Cannot save a blank survey.', Ext.emptyFn);
        }

    },


    /**
     * on Save Sheltered Draft
     * @param  {Ext.Button} button Save Button
     */
    onSaveShelteredSurveyDraft: function(button) {

        var navview = button.up('navigationview');
        var form = button.up('panel');
        //get the record

        var record = form.getRecord();
        //get the form values

        var ghouseholdid = form.getSet_household_id();
        var values = form.getValues();

        //if survey is not blank
        if (!this.isShelteredBlank(values)) {

            if (!record) {
                var newRecord = new PointInTime.model.ShelteredSurveyDraftModel(values);
                Ext.getStore('ShelteredSurveyDrafts').add(newRecord);

                Ext.getStore('PITEntryDrafts').add({
                    surveytype: 'Sheltered Survey',
                    created_datetime: values.created_datetime,
                    draftid: values.draftid,
                    householdid: values.householdid,
                    location: values.location,
                    household_entry_number: values.household_entry_number,
                    number_in_household: values.number_in_household
                });
            }
            else {
                //existing PIT draft
                record.set(values);
            }

            //save the data to the Web local Storage
            Ext.getStore('ShelteredSurveyDrafts').sync();
            Ext.getStore('PITEntryDrafts').sync();

            if (!ghouseholdid || form.getIsNew() === false) {
                // individual save and close the form

                navview.pop(navview.getInnerItems().length);
            } else {
                // household, count the increment before pop

                if (form.getSet_household_entrynumber() < form.getSet_number_in_household()) {

                    var householdpit = Ext.create('PointInTime.view.ShelteredEntry', {
                        isNew:true,
                        title:form.getSet_household_entrynumber() + 1 + ' of ' + form.getSet_number_in_household(),
                        set_household_id: form.getSet_household_id(),
                        set_household_entrynumber: form.getSet_household_entrynumber() + 1,
                        set_number_in_household: form.getSet_number_in_household(),
                        lat:form.getLat(),
                        lng:form.getLng(),
                        manual_address:form.getManual_address()
                    });

                    //fix for overlap bug
                    var anim = navview.getLayout().getAnimation();
                    navview.getLayout().setAnimation(false); //set animation to false
                    navview.pop(navview.getInnerItems().length);
                    navview.getLayout().setAnimation(anim);  //restore animation
                    navview.push(householdpit);

                } else {

                    navview.pop(navview.getInnerItems().length);

                }
            }

            Ext.Msg.alert('Thank You', 'Survey Saved.', Ext.emptyFn);
        } else {

            Ext.Msg.alert('Sorry', 'Cannot save a blank survey.', Ext.emptyFn);
        }
    },


    /**
     * on Submit Observation Draft
     * @param  {Ext.Button} button Save Button
     */
    onSubmitObservationSurveyDraft: function(button) {
        var me = this;

        var navview = button.up('navigationview');
        var form = button.up('panel');

        //get the record from the form panel
        var record = form.getRecord();

        //get the form values
        var ghouseholdid = form.getSet_household_id();
        var values = form.getValues();

        //define successful response
        var responseSuccess = function(response) {

            var response_text = Ext.decode(response.responseText);

            if (response_text.success == true) {
                //find the record in the draft store and remove it
                var sindex_main = Ext.getStore('ObservationSurveyDrafts').find('draftid', values.draftid);
                var sindex = Ext.getStore('PITEntryDrafts').find('draftid', values.draftid);


                if (sindex >= 0) {

                    //index found, remove it.
                    Ext.getStore('ObservationSurveyDrafts').removeAt(sindex);
                    Ext.getStore('PITEntryDrafts').removeAt(sindex);
                    //and sync with localstorage.
                    Ext.getStore('ObservationSurveyDrafts').sync();
                    Ext.getStore('PITEntryDrafts').sync();
                }

                Ext.Msg.alert('Thank You', response_text.msg, Ext.emptyFn);

                if (!ghouseholdid || form.getIsNew() === false) {

                    navview.pop(navview.getInnerItems().length);

                } else {
                    // household, count the increment before pop
                    if (form.getSet_household_entrynumber() < form.getSet_number_in_household()) {
                        //go to next entry

                        var householdobservation = Ext.create('PointInTime.view.ObservationEntry', {
                            isNew: true,
                            title: form.getSet_household_entrynumber() + 1 + ' of ' + form.getSet_number_in_household(),
                            set_household_id: form.getSet_household_id(),
                            set_household_entrynumber: form.getSet_household_entrynumber() + 1,
                            set_number_in_household: form.getSet_number_in_household(),
                            lat: form.getLat(),
                            lng: form.getLng(),
                            manual_address: form.getManual_address()
                        });

                        form.setMasked(false);

                        //fix for overlap bug
                        var anim = navview.getLayout().getAnimation();
                        navview.getLayout().setAnimation(false); //set animation to false
                        navview.pop(navview.getInnerItems().length);
                        navview.getLayout().setAnimation(anim);  //restore animation

                        navview.push(householdobservation);


                    } else {
                        //last entry
                        console.log("lastentry");

                        navview.pop(navview.getInnerItems().length);

                    }
                }
            } else {
                Ext.Msg.alert('Problems', response_text.MSG, Ext.emptyFn);
            }
        };

        //define project variables
        var set_project_id = Ext.getStore('appsettings').getAt(0).get('project_id');
        var url = this.checkSubmissionUrl();
        var usersetting_store = Ext.getStore('usersettings');
        //get settings record
        var usersetting_record = usersetting_store.getAt(0);
        var user_id = usersetting_store.getAt(0).get('user_id');
        var formattedDate = me.formatDateForSubmission(new Date());
        var formattedCreatedDateTime = me.formatDateForSubmission(new Date(values.created_datetime));

        //if survey is not blank
        if (!this.isObservationBlank(values)) {

            //if submission url exists
            if (url) {
                //set form loading mask
                form.setMasked({
                   xtype: 'loadmask',
                   message: 'Transmitting',
                   indicator: false
                });
                //define Ajax request
                Ext.Ajax.request({
                    useDefaultXhrHeader: false,
                    method: 'POST',
                    url: url,
                    params: {
                        AppID: 'Point In Time',
                        DateTimeCreated: formattedCreatedDateTime,
                        Ethnicity: values.ethnicity,
                        Gender: values.gender,
                        HouseholdEntryNumber: values.household_entry_number,
                        HouseholdID: values.householdid,
                        HowOldInRange: values.age_range,
                        IsHomeless: values.ishomeless,
                        Loc_GPSLatitude: values.zlat,
                        Loc_GPSLongitude: values.zlng,
                        Loc_ManualAddress: values.manualaddress,
                        NotesField: values.notes,
                        NumberInHousehold: values.number_in_household,
                        ObservationReason: values.whyobservationtool,
                        Project_ID: set_project_id,
                        Race_AmericanAlaska: values.race_americanalaska,
                        Race_Asian: values.race_asian,
                        Race_Black: values.race_black,
                        Race_NativeHawaiian: values.race_nativehawaiian,
                        Race_Other: values.race_other,
                        Race_Other_Specified: values.race_other_specified,
                        Race_White: values.race_white,
                        Send_Date: formattedDate,
                        SurveyIDNum: values.draftid,
                        SurveyType: 'Observation',
                        User_ID:user_id
                    },
                    success: responseSuccess,
                    failure: function(o) {
                        form.setMasked(false);Ext.Msg.alert("Error","Connection Error")
                    }
                });
            }
        } else {
            Ext.Msg.alert('Sorry', 'Cannot submit a blank survey.', Ext.emptyFn);
        }
    },

    /**
     * on Submit Unsheltered Draft
     * @param  {Ext.Button} button Save Button
     */
    onSubmitUnshelteredDraft: function(button) {
        var me = this;

        var navview = button.up('navigationview');
        var form = button.up('panel');
        //get the record

        var record = form.getRecord();
        //get the form values

        var ghouseholdid = form.getSet_household_id();
        var values = form.getValues();

        //define sucessful response
        var responseSuccess = function(response) {

            var response_text = Ext.decode(response.responseText);

            if (response_text.success == true) {

                //find the record in the draft store and remove it
                var sindex_main = Ext.getStore('UnshelteredSurveyDrafts').find('draftid', values.draftid);
                var sindex = Ext.getStore('PITEntryDrafts').find('draftid', values.draftid);

                if (sindex >= 0) {
                    //index found, remove it.
                    Ext.getStore('UnshelteredSurveyDrafts').removeAt(sindex);
                    Ext.getStore('PITEntryDrafts').removeAt(sindex);
                    //and sync with localstorage.
                    Ext.getStore('UnshelteredSurveyDrafts').sync();
                    Ext.getStore('PITEntryDrafts').sync();
                }

                Ext.Msg.alert('Thank You', response_text.msg, Ext.emptyFn);

                if (!ghouseholdid || form.getIsNew() === false) {
                    // individual save and close the form

                    navview.pop(navview.getInnerItems().length);

                } else {
                    // household, count the increment before pop

                    if (form.getSet_household_entrynumber() < form.getSet_number_in_household()) {
                        //define survey
                        var householdpit = Ext.create('PointInTime.view.UnshelteredEntry', {
                            isNew: true,
                            title: form.getSet_household_entrynumber() + 1 + ' of ' + form.getSet_number_in_household(),
                            set_household_id: form.getSet_household_id(),
                            set_household_entrynumber: form.getSet_household_entrynumber() + 1,
                            set_number_in_household: form.getSet_number_in_household(),
                            lat: form.getLat(),
                            lng: form.getLng(),
                            manual_address: form.getManual_address()
                        });


                        form.setMasked(false);

                        //fix for overlap bug
                        var anim = navview.getLayout().getAnimation();
                        navview.getLayout().setAnimation(false); //set animation to false
                        navview.pop(navview.getInnerItems().length);
                        navview.getLayout().setAnimation(anim);  //restore animation

                        navview.push(householdpit);

                    } else {

                        navview.pop(navview.getInnerItems().length);

                    }
                }

            } else {
                Ext.Msg.alert('Problems', response_text.MSG, Ext.emptyFn)
            }
        };

        var set_project_id = Ext.getStore('appsettings').getAt(0).get('project_id');
        var user_id = Ext.getStore('usersettings').getAt(0).get('user_id');
        var url = this.checkSubmissionUrl();
        var formattedDate = me.formatDateForSubmission(new Date());
        var formattedCreatedDateTime = me.formatDateForSubmission(new Date(values.created_datetime));

        //if survey is not blank
        if (!this.isUnshelteredBlank(values)) {
            //if submission URL is defined
            if (url) {
                //set form loading mask
                form.setMasked({
                   xtype: 'loadmask',
                   message: 'Transmitting',
                   indicator: false
                });

                //define ajax request
                Ext.Ajax.request({
                    useDefaultXhrHeader: false,
                    method: 'POST',
                    url: url,
                    params : {
                        AppID: 'Point In Time',
                        DateTimeCreated: formattedCreatedDateTime,
                        Disabilities_Alcohol: values.disabilities_alcohol,
                        Disabilities_BrainInjury: values.disabilities_braininjury,
                        Disabilities_ChronicHealth: values.disabilities_chronichealth,
                        Disabilities_Drugs: values.disabilities_drug,
                        Disabilities_HIV: values.disabilities_hiv,
                        Disabilities_OtherMH: values.disabilities_othermh,
                        Disabilities_Physical: values.disabilities_physical,
                        Disabilities_PTSD: values.disabilities_ptsd,
                        Disabilities_ReceiveBenefits: values.doyoureceivedisabilitybenefits,
                        Disabilities_SpecEd: values.disabilities_specialed,
                        DomesticViolence: values.domesticviolence,
                        Ethnicity: values.ethnicity,
                        FirstTimeHomeless: values.firsttimehomeless,
                        Gender: values.gender,
                        HouseholdEntryNumber: values.household_entry_number,
                        HouseholdID: values.householdid,
                        HowLongShelter_Days: values.howlongshelter_days,
                        HowLongShelter_DontKnowRef: values.howlongshelter_dontknowref,
                        HowLongShelter_Months: values.howlongshelter_months,
                        HowLongShelter_Weeks: values.howlongshelter_weeks,
                        HowLongShelter_Years: values.howlongshelter_years,
                        HowLongThisTime_Days: values.howlongthistime_days,
                        HowLongThisTime_DontKnowRef: values.howlongthistime_dontknowref,
                        HowLongThisTime_Months: values.howlongthistime_months,
                        HowLongThisTime_Weeks: values.howlongthistime_weeks,
                        HowLongThisTime_Years: values.howlongthistime_years,
                        HowManyTimes: values.hmt,
                        HowOldInRange: values.age_range,
                        HowOldInYears: values.age,
                        Loc_GPSLatitude: values.zlat,
                        Loc_GPSLongitude: values.zlng,
                        Loc_ManualAddress: values.manualaddress,
                        NotesField: values.notes,
                        NumberInHousehold: values.number_in_household,
                        PersonInitials: values.initials,
                        PreventStable: values.keepyoufromliving,
                        PreventStable_Alcohol: values.preventstable_alcohol,
                        PreventStable_BrainInjury: values.preventstable_braininjury,
                        PreventStable_ChronicHealth: values.preventstable_chronichealth,
                        PreventStable_Drug: values.preventstable_drug,
                        PreventStable_OtherMH: values.preventstable_othermh,
                        PreventStable_Physical: values.preventstable_physical,
                        PreventStable_PTSD: values.preventstable_alcohol,
                        Project_ID: set_project_id,
                        Race_AmericanAlaska: values.race_americanalaska,
                        Race_Asian: values.race_asian,
                        Race_Black: values.race_black,
                        Race_NativeHawaiian: values.race_nativehawaiian,
                        Race_Other: values.race_other,
                        Race_Other_Specified: values.race_other_specified,
                        Race_White: values.race_white,
                        RelationshipOther: values.relationshipother,
                        RelationshipToYou: values.relationshiptoyou,
                        Send_Date: formattedDate,
                        SurveyIDNum: values.draftid,
                        SurveyType: 'Interview',
                        User_ID: user_id,
                        Vet_NatlGuardOrReserve: values.activatedinnationalguard,
                        Vet_ReceivedBenefits: values.everreceivedhealthcarebenefits,
                        Vet_ServedInArmedForces: values.servedinarmedforces,
                        WhereSleepingOther: values.otherlocation,
                        WhereSleepingTonight: values.wheresleepingtonight
                    },
                    success: responseSuccess,
                    failure: function(o) {
                        form.setMasked(false);Ext.Msg.alert("Error","Connection Error")
                    }
                });
            }
        } else {
            Ext.Msg.alert('Sorry', 'Cannot submit a blank survey.', Ext.emptyFn);
        }
    },

    /**
     * on Submit Sheltered Draft
     * @param  {Ext.Button} button Save Button
     */
    onSubmitShelteredSurveyDraft: function(button) {
        var me = this;

        var navview = button.up('navigationview');
        var form = button.up('panel');
        //get the record

        var record = form.getRecord();
        //get the form values

        //get household id
        var ghouseholdid = form.getSet_household_id();

        //get form values
        var values = form.getValues();

        //define successful response
        var responseSuccess = function(response) {

            var response_text = Ext.decode(response.responseText);

            if (response_text.success == true) {

                //find the record in the draft store and remove it
                var sindex_main = Ext.getStore('ShelteredSurveyDrafts').find('draftid', values.draftid);
                var sindex = Ext.getStore('PITEntryDrafts').find('draftid', values.draftid);

                if (sindex >= 0) {
                    //index found, remove it.
                    Ext.getStore('ShelteredSurveyDrafts').removeAt(sindex);
                    Ext.getStore('PITEntryDrafts').removeAt(sindex);
                    //and sync with localstorage.
                    Ext.getStore('ShelteredSurveyDrafts').sync();
                    Ext.getStore('PITEntryDrafts').sync();
                }

                Ext.Msg.alert('Thank You', response_text.msg, Ext.emptyFn);

                if (!ghouseholdid || form.getIsNew() == false) {
                    // individual save and close the form


                    navview.pop(navview.getInnerItems().length);

                } else {
                    // household, count the increment before pop

                    if (form.getSet_household_entrynumber() < form.getSet_number_in_household()) {

                        //define survey
                        var householdpit = Ext.create('PointInTime.view.ShelteredEntry', {
                            isNew: true,
                            title: form.getSet_household_entrynumber() + 1 + ' of ' + form.getSet_number_in_household(),
                            set_household_id: form.getSet_household_id(),
                            set_household_entrynumber: form.getSet_household_entrynumber() + 1,
                            set_number_in_household: form.getSet_number_in_household(),
                            lat: form.getLat(),
                            lng: form.getLng(),
                            manual_address: form.getManual_address()
                        });

                        //set survey mask equal to false
                        form.setMasked(false);

                        //fix for overlap bug
                        var anim = navview.getLayout().getAnimation();
                        navview.getLayout().setAnimation(false); //set animation to false
                        navview.pop(navview.getInnerItems().length);
                        navview.getLayout().setAnimation(anim);  //restore animation

                        navview.push(householdpit);

                    } else {

                        navview.pop(navview.getInnerItems().length);

                    }
                }

            } else {
                Ext.Msg.alert('Problems', response_text.MSG, Ext.emptyFn)
            }
        };

        //define project variables
        var set_project_id = Ext.getStore('appsettings').getAt(0).get('project_id');
        var user_id = Ext.getStore('usersettings').getAt(0).get('user_id');
        var url = this.checkSubmissionUrl();
        var formattedDate = me.formatDateForSubmission(new Date());
        var formattedCreatedDateTime = me.formatDateForSubmission(new Date(values.created_datetime));

        //if survey is not blank
        if (!this.isShelteredBlank(values)) {

            //if submission url is defined
            if(url){
                //set form mask equal to false
                form.setMasked({
                   xtype: 'loadmask',
                   message: 'Transmitting',
                   indicator: false
                });

                //define AJAX request
                Ext.Ajax.request({
                    useDefaultXhrHeader: false,
                    method: 'POST',
                    url: url,
                    params : {
                        AppID: 'Point In Time',
                        DateTimeCreated: formattedCreatedDateTime,
                        Disabilities_Alcohol: values.disabilities_alcohol,
                        Disabilities_BrainInjury: values.disabilities_braininjury,
                        Disabilities_ChronicHealth: values.disabilities_chronichealth,
                        Disabilities_Drugs: values.disabilities_drug,
                        Disabilities_HIV: values.disabilities_hiv,
                        Disabilities_OtherMH: values.disabilities_othermh,
                        Disabilities_Physical: values.disabilities_physical,
                        Disabilities_PTSD: values.disabilities_ptsd,
                        Disabilities_ReceiveBenefits: values.doyoureceivedisabilitybenefits,
                        Disabilities_SpecEd: values.disabilities_specialed,
                        DomesticViolence: values.domesticviolence,
                        Ethnicity: values.ethnicity,
                        FirstTimeHomeless: values.firsttimehomeless,
                        Gender: values.gender,
                        HouseholdEntryNumber: values.household_entry_number,
                        HouseholdID: values.householdid,
                        HowLongShelter_Days: values.howlongshelter_days,
                        HowLongShelter_DontKnowRef: values.howlongshelter_dontknowref,
                        HowLongShelter_Months: values.howlongshelter_months,
                        HowLongShelter_Weeks: values.howlongshelter_weeks,
                        HowLongShelter_Years: values.howlongshelter_years,
                        HowLongThisTime_Days: values.howlongthistime_days,
                        HowLongThisTime_DontKnowRef: values.howlongthistime_dontknowref,
                        HowLongThisTime_Months: values.howlongthistime_months,
                        HowLongThisTime_Weeks: values.howlongthistime_weeks,
                        HowLongThisTime_Years: values.howlongthistime_years,
                        HowManyTimes: values.hmt,
                        HowOldInRange: values.age_range,
                        HowOldInYears: values.age,
                        Loc_GPSLatitude: values.zlat,
                        Loc_GPSLongitude: values.zlng,
                        Loc_ManualAddress: values.manualaddress,
                        NotesField: values.notes,
                        NumberInHousehold: values.number_in_household,
                        PersonInitials: values.initials,
                        PreventStable: values.keepyoufromliving,
                        PreventStable_Alcohol: values.preventstable_alcohol,
                        PreventStable_BrainInjury: values.preventstable_braininjury,
                        PreventStable_ChronicHealth :values.preventstable_chronichealth,
                        PreventStable_Drug: values.preventstable_drug,
                        PreventStable_OtherMH: values.preventstable_othermh,
                        PreventStable_Physical: values.preventstable_physical,
                        PreventStable_PTSD: values.preventstable_alcohol,
                        Project_ID: set_project_id,
                        ProjectName: values.projectname,
                        ProjectType: values.projecttype,
                        Race_AmericanAlaska: values.race_americanalaska,
                        Race_Asian: values.race_asian,
                        Race_Black: values.race_black,
                        Race_NativeHawaiian: values.race_nativehawaiian,
                        Race_Other: values.race_other,
                        Race_Other_Specified: values.race_other_specified,
                        Race_White: values.race_white,
                        RelationshipOther: values.relationshipother,
                        RelationshipToYou: values.relationshiptoyou,
                        Send_Date: formattedDate,
                        SurveyIDNum: values.draftid,
                        SurveyType: 'Sheltered',
                        User_ID: user_id,
                        Vet_NatlGuardOrReserve: values.activatedinnationalguard,
                        Vet_ReceivedBenefits: values.everreceivedhealthcarebenefits,
                        Vet_ServedInArmedForces: values.servedinarmedforces
                    },
                    success: responseSuccess,
                    failure: function(o) {
                        form.setMasked(false);Ext.Msg.alert("Error","Connection Error")
                    }
                });
            }
        } else {

            Ext.Msg.alert('Sorry', 'Cannot submit a blank survey.', Ext.emptyFn);

        }
    },

    /**
     * return whether value is blank
     * @param  {String}  value String Value
     * @return {Boolean}      Is Blank ("" or Null) true, else false
     */
    isBlank: function(value) {
        if (value === "" || value === null) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Format Date for Submission
     * @param  {Date} d Date
     * @return {String}   Formatted Date
     */
    formatDateForSubmission: function(d) {

        var formattedDate = d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + (d.getDate())).slice(-2) + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + ((d.getHours() >= 12) ? 'PM' : 'AM');
        return formattedDate;
    },

    /**
     * Check object parameters for value from array of strings
     * @param  {Object} obj        Object to be evaluated
     * @param  {Array} fieldarray Array of strings for field names
     * @return {Boolean}            true or false
     */
    checkBlank: function(obj,fieldarray) {

        var blank = true;
        for (var i = 0; i < fieldarray.length; i++) {
            if (obj.hasOwnProperty(fieldarray[i])) {
                if (obj[fieldarray[i]] !== "" && obj[fieldarray[i]] !== null) {
                    blank = false;
                    break;
                }
            }

        }
        return blank;
    },

    /**
     * Is Unsheltered Survey Blank
     * @param  {Object}  v Form Values
     * @return {Boolean}   Is Blank Return True Else False
     */
    isUnshelteredBlank: function(v) {
        var x = [
            'activatedinnationalguard',
            'age',
            'age_range',
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
            'firsttimehomeless',
            'gender',
            'hmt',
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
            'notes',
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
            'servedinarmedforces',
            'wheresleepingtonight',
            'relationshiptoyou',
            'relationshipother'
        ];

        return this.checkBlank(v,x);
    },


    /**
     * Is Sheltered Survey Blank
     * @param  {Object}  v Form Values
     * @return {Boolean}   Is Blank Return True Else False
     */
    isShelteredBlank: function(v) {
        var x = [
            'activatedinnationalguard',
            'age',
            'age_range',
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
            'firsttimehomeless',
            'gender',
            'hmt',
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
            'notes',
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
            'servedinarmedforces',
            'wheresleepingtonight',
            'projectname',
            'projecttype',
            'relationshiptoyou',
            'relationshipother'
        ];

        return this.checkBlank(v,x);
    },

    /**
     * Is Observation Survey Blank
     * @param  {Object}  v Form Values
     * @return {Boolean}   Is Blank Return True Else False
     */
    isObservationBlank: function(v) {

        var x = [
            'age_range',
            'ethnicity',
            'gender',
            'ishomeless',
            'notes',
            'race_americanalaska',
            'race_asian',
            'race_black',
            'race_nativehawaiian',
            'race_other',
            'race_other_specified',
            'race_white'
        ];

        return this.checkBlank(v,x);
    }



});