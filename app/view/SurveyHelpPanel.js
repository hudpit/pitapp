/**
 * ## Overview
 * Survey Help Panel.
 *
 * Sencha Touch uses views for user interaction.  From the user's perspective the application is just a series of views.  [Read more about Sencha Touch Views](http://docs.sencha.com/touch/2.4/components/views.html). The survey help panel is used to display help text about completing surveys.
 *
 * Screen shot of panel view inside application running on IOS8:
 * {@img shots/survey_help.PNG Survey Help Panel}
 */
Ext.define("PointInTime.view.SurveyHelpPanel", {
    extend: 'Ext.Panel',
    xtype: 'surveyhelppanel',
    /**
     * @cfg {Object} config
     * View config object
     */
    config: {
        /**
         * @cfg {String} title
         * String of panel title
         */
        title: 'Help',

        /**
         * @cfg {Boolean/String/Object} scrollable
         * Configuration options to make this Container scrollable. Acceptable values are:
         *
         * - `'horizontal'`, `'vertical'`, `'both'` to enabling scrolling for that direction.
         * - `true`/`false` to explicitly enable/disable scrolling.
         *
         * Alternatively, you can give it an object which is then passed to the scroller instance:
         *
         *     scrollable: {
         *         direction: 'vertical',
         *         directionLock: true
         *     }
         *
         * Please look at the {@link Ext.scroll.Scroller} documentation for more example on how to use this.
         * @return {Ext.scroll.View} The scroll view.
         * @accessor
         * @evented
         */
        scrollable: true,
        /**
         * @cfg {String} xtype
         * xtype name for panel widget
         */
        xtype: 'surveyhelppanel',
        /**
         * @cfg {Object} items
         * Panel Items
         */
        items: [
            {
                html: ['<div style=\"padding:10px;\">',
                    '<div>There are six survey options for the Point in Time Count.</div>',
                    '<div>It is important that you select the right survey for each encounter.</div>',
                    '<div style=\"text-decoration: underline;font-weight:bold;padding-top:20px;\">Determine if you are counting an Individual or Household:</div>',
                    '<div style=\"padding-top:10px;\"><span style=\"font-weight:bold;display:inline;\">Individual:</span> If a person is by themselves, conduct a survey at the individual level. This is true regardless of age and includes unaccompanied youth. Pregnant women are also considered individuals.</div>',
                    '<div style=\"padding-top:10px;\"><span style=\"font-weight:bold;display:inline;\">Household</span>: If there is more than one person sleeping in the same location on the night of the count, including adults and children, ask if they are part of the same household, if so, use the household survey. If not, use the individual survey. The household survey selection will prompt you for the number of people in the household and then will take you through questions for each family member. If known, begin with the oldest member of the household.</div>',
                    '<div style=\"text-decoration: underline;font-weight:bold;padding-top:20px;\">Determine which survey type to use:</div>',
                    '<div style=\"padding-top:10px;\"><span style=\"font-weight:bold;display:inline\">Sheltered homeless:</span> Use this survey for individuals and families living in a supervised publicly or privately operated shelter designated to provide temporary living arrangement (including congregate shelters, transitional housing, and hotels and motels paid for by charitable organizations or by federal, state, or local government programs for low-income individuals) on the night designated for the count.</div>',
                    '<div style=\"padding-top:10px;\"><span style=\"font-weight:bold;display:inline\">Unsheltered homeless:</span> Use this survey for individuals and families with a primary nighttime residence that is a public or private place not designed for or ordinarily used as a regular sleeping accommodation for human beings, including a car, park, abandoned building, bus or train station, airport, or camping ground on the night designated for the count.</div>',
                    '<div style=\"padding-top:10px;\"><span style=\"font-weight:bold;display:inline\">Observation:</span> There are three circumstances under which you wouldn’t interview someone:</div>',
                    '<ul>',
                    '<li>',
                    '<li>1. You are unable to enter a site</li>',
                    '<li>2. You cannot conduct a PIT survey (person refused to answer questions, language or other problems)</li>',
                    '<li>3. You do not wish not to disturb people sleeping</li>',
                    '</li>',
                    '</ul>',
                    '</div>'].join("\n")
            }
        ]
    },
    /**
     * initialize Function
     * This method is called automatically.
     */
    initialize: function() {
        this.callParent();
    }

});