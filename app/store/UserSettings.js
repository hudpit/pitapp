/**
 * ## Overview
 * The User Settings store is used for user settings.
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy, and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 * {@link Ext.data.Store}
 *
 * {@link PointInTime.model.UserSettingsModel}
 */
Ext.define('PointInTime.store.UserSettings', {
    extend: 'Ext.data.Store',
    alias: 'store.usersettings',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    /**
     * @cfg {Object} config
     * Store config object
     */
    config: {
        storeId: 'usersettings',
        model: 'PointInTime.model.UserSettingsModel',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id  : 'UserSettingsKey'
        }
    }
});