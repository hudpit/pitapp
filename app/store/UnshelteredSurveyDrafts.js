/**
 * ## Overview
 * The Unsheltered Survey Drafts store is used for unsheltered survey drafts.
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy, and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 *  {@link Ext.data.Store}
 *
 *  {@link PointInTime.model.UnshelteredSurveyDraftModel}
 */
Ext.define('PointInTime.store.UnshelteredSurveyDrafts', {
    extend: 'Ext.data.Store',
    alias: 'store.unshelteredsurveydrafts',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    /**
     * @cfg {Object} config
     * Store config object
     */
    config: {
        storeId: 'UnshelteredSurveyDrafts',
        model: 'PointInTime.model.UnshelteredSurveyDraftModel',
        autoLoad: true,
        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'UnshelteredSurveyDraftsKey'
        }
    }
});