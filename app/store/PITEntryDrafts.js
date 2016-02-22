/**
 * ## Overview
 * The PIT Entry Draft store is used for PIT draft information, each PIT draft entry is bound to a seperate survey model entry.
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy, and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 *  {@link Ext.data.Store}
 *
 *  {@link PointInTime.model.PITEntryDraftModel}
 */
Ext.define('PointInTime.store.PITEntryDrafts', {
    extend: 'Ext.data.Store',
    alias : 'store.PITEntryDrafts',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    /**
     * @cfg {Object} config
     * Store config object
     */
    config: {
        storeId: 'PITEntryDrafts',
        model: 'PointInTime.model.PITEntryDraftModel',
        autoLoad: true,
        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'PITDraftsKey'
        }
    }
});