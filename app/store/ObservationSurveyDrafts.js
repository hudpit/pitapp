/**
 * ## Overview
 * The observation survey draft store is used for observation survey drafts.
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy, and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 *  {@link Ext.data.Store}
 *
 *  {@link PointInTime.model.ObservationSurveyDraftModel}
 */
Ext.define('PointInTime.store.ObservationSurveyDrafts', {
    extend: 'Ext.data.Store',
    alias  : 'store.observationsurveydrafts',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    /**
     * @cfg {Object} config
     * Store config object
     */
    config: {
        storeId: 'ObservationSurveyDrafts',
        model: 'PointInTime.model.ObservationSurveyDraftModel',
        autoLoad: true,
        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'ObservationSurveyDraftsKey'
        }
    }
});