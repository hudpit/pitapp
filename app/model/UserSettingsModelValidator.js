/**
 * ## Overview
 * PointInTime.model.UserSettingsModelValidator is a Sencha data model (a set of fields and data).  The user settings model validator is used to define the fields associated with a users settings and validate them.  It is not used to store user settings. This model is used to store information about the user, their user_id, name, email address, etc, it has validators to check for the presence of name, password and email addresses, the validators also verifiy the correct format for telephone and email.
 *
 * Fields used in this model:
 * {@link PointInTime.model.UserSettingsModelValidator#fields}
 */
Ext.define('PointInTime.model.UserSettingsModelValidator', {
    extend: 'Ext.data.Model',
    /**
     * @cfg {Object} config
     * Model config object
     */
    config: {
        /**
         * @cfg {Object} identifier
         * Model config object
         */
        identifier: {type: 'uuid'},
        /**
         * @cfg {Object} fields Model Data Fields
         * Model config object
         */
        fields: [
            /**
             * @property {string} user_id User ID
             */
            {
                name: 'user_id',
                type: 'string'
            },
            /**
             * @property {string} firstname First Name
             */
            {
                name: 'firstname',
                type: 'string'
            },
            /**
             * @property {string} lastname Last Name
             */
            {
                name: 'lastname',
                type: 'string'
            },
            /**
             * @property {string} email_address Email Address
             */
            {
                name: 'email_address',
                type: 'string'
            },
            /**
             * @property {string} password Password
             */
            {
                name: 'password',
                type: 'password'
            },
            /**
             * @property {string} string Phone Number US
             */
            {
                name: 'phonenumber',
                type: 'string'
            }
        ],
        /**
         * @cfg {Object} validations Model Data Validators
         * Model data validators
         */
        validations : [
            /**
             * First Name must be present
             */
            {
                type: 'presence',
                name: 'firstname',
                message: "First Name"
            },
            /**
             * Last Name must be present
             */
            {
                type: 'presence',
                name: 'lastname',
                message: "Last Name"
            },
            /**
             * Email must be present
             */
            {
                type: 'presence',
                name: 'email_address',
                message: "Email"
            },
            /**
             * Password must be present
             */
            {
                type: 'presence',
                name: 'password',
                message: "Password"
            },
            /**
             * Email address must match format
             */
            {
                type: 'format',
                name: 'email_address',
                matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email Format"
            }
        ]
    }
});