/**
 * ## Overview
 * The User Projects store is used for user projects.
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy, and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 *  {@link Ext.data.Store}
 *
 *  {@link PointInTime.model.UserProjectsModel}
 */
Ext.define('PointInTime.store.UserProjects', {
    extend: 'Ext.data.Store',
    alias: 'store.userprojects',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    /**
     * @cfg {Object} config
     * Store config object
     */
    config: {
        storeId: 'userprojects',
        model: 'PointInTime.model.UserProjectsModel',
        autoLoad: true,
        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'UserProjectsKey'
        }
    }
});