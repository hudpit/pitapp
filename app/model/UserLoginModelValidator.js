/**
 * ## Overview
 * PointInTime.model.UserLoginModelValidator is a Sencha data model (a set of fields and data).  The user login model validator model is used to define the fields and data associated with user login, user login stores email address and password, and validates both email address and password for presence and formatting.
 *
 * Fields used in this model:
 * {@link PointInTime.model.UserLoginModelValidator#fields}
 */
Ext.define('PointInTime.model.UserLoginModelValidator', {
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
        fields:[
            /**
             * @property {Boolean} email Email Address
             * @type {String}
             */
            {name: 'email', type: 'string'},
            /**
             * @property {Boolean} password Password
             * @type {String}
             */
            {name: 'password', type: 'string'}
        ],
        /**
         * @cfg {Object} validations Model Data Validators
         * Model data validators
         */
        validations:[
            /**
             * Email address must be present
             */
            {
                type: 'presence',
                name: 'email',
                message: "Email Missing"
            },
            /**
             * Password must be present
             */
            {
                type: 'presence',
                name: 'password',
                message: "Password Missing"
            },
            /**
             * Email address must match format
             */
            {
                type: 'format',
                name: 'email',
                matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid Email Address"
            }
        ]
    }
});