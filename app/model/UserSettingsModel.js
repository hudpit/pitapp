/**
 * ## Overview
 * PointInTime.model.UserSettingsModel is a Sencha data model (a set of fields and data).  The user settings model is used to define the fields and data associated with a users settings, this model is used to store information about the user, their user_id, name, email address, etc.
 *
 * Fields used in this model:
 * {@link PointInTime.model.UserSettingsModel#fields}
 */
Ext.define('PointInTime.model.UserSettingsModel', {
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
             * @property {string} current_password Current Password
             */
            {
                name: 'current_password',
                type: 'password'
            },
            /**
             * @property {string} password New Password
             */
            {
                name: 'password',
                type: 'password'
            },
            /**
             * @property {string} phonenumber Telephone Number US
             */
            {
                name: 'phonenumber',
                type: 'string'
            }
        ]
    }
});