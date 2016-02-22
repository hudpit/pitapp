/**
 * ## Overview
 * The application settings store is used to store client side data about the application.
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy, and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 * {@link Ext.data.Store}
 *
 * {@link PointInTime.model.AppSettingsModel}
 */
Ext.define('PointInTime.store.AppSettings', {
    extend: 'Ext.data.Store',
    alias  : 'store.appsettings',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    /**
     * @cfg {Object} config
     * Store config object
     */
    config: {
        storeId: 'appsettings',
        model: 'PointInTime.model.AppSettingsModel',
        autoLoad: true,
        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'AppSettingsKey'
        }
    }
});