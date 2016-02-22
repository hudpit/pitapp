/**
 * ## Overview
 * PointInTime.model.ForgottenPasswordModel is a Sencha data model (a set of fields and data).  The forgotten password model is used to define the fields and data associated with the forgot password form.   The forgot password model checks for the presence of a valid email address using an email address validator.
 *
 * Fields used in this model:
 * {@link PointInTime.model.ForgottenPasswordModel#fields}
 */
Ext.define('PointInTime.model.ForgottenPasswordModel', {
    extend: 'Ext.data.Model',
    /**
     * @cfg {Object} config
     * Model config object
     */
    config: {
        /**
         * @cfg {Object} fields Model Data Fields
         * Model config object
         */
        fields: [
            /**
             *  @property {Boolean} email Forgotten Password Email Address
             */
            {name: 'email', type: 'string'}
        ],
        validations: [
            {type: 'presence', field: 'email'},
            {type: 'email', field: 'email'}
        ]
    }
});