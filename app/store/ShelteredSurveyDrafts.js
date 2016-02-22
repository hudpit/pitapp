/**
 * ## Overview
 * The Sheltered Survey Draft store is used for sheltered survey drafts.
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy, and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 *  {@link Ext.data.Store}
 *
 *  {@link PointInTime.model.ShelteredSurveyDraftModel}
 */
Ext.define('PointInTime.store.ShelteredSurveyDrafts', {
    extend: 'Ext.data.Store',
    alias: 'store.shelteredsurveydrafts',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    /**
     * @cfg {Object} config
     * Store config object
     */
    config: {
        storeId: 'ShelteredSurveyDrafts',
        model: 'PointInTime.model.ShelteredSurveyDraftModel',
        autoLoad: true,
        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'ShelteredSurveyDraftsKey'
        }
    }
});