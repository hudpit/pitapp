/**
 * ## Overview
 * This is the controller for the Point In Time Survey Selection Screen.  This controller listens for events on the 'pitselect' {@link PointInTime.view.PITSelect} view.  It is used to open surveys and the survey help panel.
 *
 * Controllers are responsible for responding to events that occur within your app. If your app contains a Logout button that your user can tap on, a Controller listens to the Button’s tap event and takes the appropriate action. While View classes handles the display of data and Model classes handle the loading and saving of data, Controller classes are the glue that binds Views and Models together.
 */
Ext.define('PointInTime.controller.PITSelect', {
    extend: 'Ext.app.Controller',
    /**
     * @cfg {Object} config
     * Controller config object
     */
    config: {
        /**
         * @cfg {Object} refs
         * Controller References / Leverages ComponentQuery
         */
        refs: {
            pitselect: 'pitselect',
            homepanel: 'homepanel',
            help_button: 'button[action=openSurveyHelpButton]'
        },
        /**
         * @cfg {Object} control
         *
         * Control Listens to app events
         */
        control : {
            'pitselect button[action=openSurvey]': {
                tap: 'openSurvey'
            },
            help_button: {
                tap: 'openHelp'
            }
        }
    },

    /**
     * Opens Help About Panel
     * Called from PIT Select view {@link PointInTime.view.PITSelect}
     */
    openHelp: function() {
        var hp = this.getHomepanel();

        if (hp.getActiveItem().xtype !== "aboutpanel") {
            hp.push(Ext.create('PointInTime.view.SurveyHelpPanel'));
        }
    },

    /**
     * Opens Survey Panel
     * Checks the button text to determine whether individual or household.   Opens local panel with google maps lookup and passes respective survey type information, location panel then opens the correct survey.
     * Called from PIT Select view {@link PointInTime.view.PITSelect}
     * @param {Ext.Button} button button object from survey select panel
     */
    openSurvey: function(button) {

        var me = this;
        var bval = button.getText(); //text of button to determine survey type
        var hp = this.getHomepanel(); //the home panel
        var ind_or_hh = bval.split(" ")[0]; //get the first word to determine individual or household

        button.up('navigationview').getLayout().setAnimation(false);

        //if active panel is not location lookup
        if (hp.getActiveItem().xtype !== "locationlookup") {
            //individual or household
            switch (ind_or_hh) {
            case 'Individual':
                //open Individual Survey View'
                hp.push(Ext.create('PointInTime.view.Location', {surveytype: bval}));
                break;
            case 'Household':
                //open Household Survey View
                {
                    var number_in_hh_prompt = Ext.create('Ext.plugin.NumberPrompt');

                    number_in_hh_prompt.prompt(
                        'How Many People?',
                        'Including yourself, how many adults and children are there in this household, who are sleeping in the same location tonight?',
                        function (buttonId, value) {
                            if (buttonId === 'ok') {

                                var householdid = Math.floor(Math.random() * 99999);

                                //if valid household id
                                if (me.isWholeNumber(value) && value > 0) {
                                    var housecount = value;
                                    var householdpit = Ext.create('PointInTime.view.Location', {
                                        surveytype: bval,
                                        set_household_id: householdid,
                                        set_household_entrynumber: 1,
                                        set_number_in_household: housecount
                                    });

                                    hp.push(householdpit);
                                } else {
                                    Ext.Msg.alert('Problem', 'Number in household must be an integer greater than 0.', Ext.emptyFn);
                                }
                            }
                        },
                        null,
                        false,
                        null,
                        {
                            placeHolder: 'Enter Number'
                        }
                    );
                    break;
                }
            }
        }

    },

    /**
     * Returns true or false whether value given n is a whole number
     * @param  {Number}  n number to test
     * @return {Boolean}   true if a whole number, false if not
     */
    isWholeNumber: function(n) {
        if (this.isNumeric(n) === false || (n % 1 !== 0) === true) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * Returns whether number given is numeric or not
     * @param  {Number}  n number to test
     * @return {Boolean}   true if numeric, false if not
     */
    isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


});