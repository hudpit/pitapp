/**
 * ## Overview
 * This is the controller for Map Panel / Location Lookup.  This controller listens for events on the 'locationlookup' {@link PointInTime.view.Location} and 'locationfm' {@link PointInTime.view.LocationEntry} views, it also handles application logic for location map functions, initialising the location map, changing location and saving location data for surveys.
 *
 * Controllers are responsible for responding to events that occur within your app. If your app contains a Logout button that your user can tap on, a Controller listens to the Button’s tap event and takes the appropriate action. While View classes handles the display of data and Model classes handle the loading and saving of data, Controller classes are the glue that binds Views and Models together.
 */
Ext.define('PointInTime.controller.LocationLookup', {
    extend: 'Ext.app.Controller',
    /**
     * @cfg {Object} config
     * Controller config object
     */
    config: {
        /**
         * @cfg {Object} refs
         * Controller References / Leverages ComponentQuery
         */
        refs: {
            mapPanel: 'locationlookup',
            locationfm: 'locationfm',
            homepanel: 'homepanel',
            map_geolocate_button: 'button[action=map_geolocate]',
            confirm_next_button: 'button[action=confirmlocation]',
            mapholder: '#mapHolder'
        },
        /**
         * @cfg {Object} control
         *
         * Control Listens to app events
         */
        control : {
            'locationlookup button[action=changelocation]': {
               tap: 'onChangeLocation'
            },
            'locationfm button[action=saveNewLocation]': {
               tap: 'onSaveNewLocation'
            },
            'locationlookup button[action=openHelpWindow]': {
               tap: 'openHelpWindow'
            },
            map_geolocate_button: {
                tap: 'onMapGeolocate'
            },
            confirm_next_button: {
                tap: 'onConfirmNext'
            },
            mapPanel: {
                onInitLocationView: 'doLocationViewInit'
            }
        }
    },

    /**
     * on Tap of Confirm Next Map Button
     * @param  {Ext.Button} button Confirm Next Button
     * User taps 'confirm_next_button' which accepts the current map location and initialises the corresponding survey with the given location information, if exact longitude and latitude information is available (from GPS, Google Maps selection or manual address entry) that information is used to configure the survey.
     */
    onConfirmNext: function(button) {
        var me = this;

        //disable next button
        button.setDisabled(true);

        //set navigation view animation
        button.up('navigationview').getLayout().setAnimation({
            type: 'slide',
            direction: 'left'
        });

        //initialise survey variables
        var mpan = me.getMapPanel();
        var gmap_center = mpan.getGmapcenter();
        var saved_cen = mpan.getMap_center();
        var saved_manual_address = mpan.getManualaddress();
        var saved_household_id = mpan.getSet_household_id();
        var saved_household_entrynumber = mpan.getSet_household_entrynumber();
        var saved_number_in_household = mpan.getSet_number_in_household();
        var surveytype = mpan.getSurveytype();
        var hp = me.getHomepanel();
        var hp_xtype = hp.getActiveItem().xtype;

        //you've got a google maps center position
        var form_lat = (gmap_center) ? gmap_center.lat() : saved_cen.lat;
        var form_lng = (gmap_center) ? gmap_center.lng() : saved_cen.lng;


        var s_type = surveytype.split(" ")[0].toLowerCase(); //get the first word to determine individual or household
        var s_title = surveytype.split(" ")[1]; //get the second word to determine Title
        var s_view = 'PointInTime.view.' + s_title + 'Entry';

        if (hp_xtype !== "shelteredentry" && hp_xtype !== "unshelteredentry" && hp_xtype !== "observationentry") {
            if (s_type == 'household') {
                //push new household survey onto Home Panel
                hp.push(Ext.create(s_view, {
                    isNew: true,
                    title: s_title,
                    set_household_id: saved_household_id,
                    set_household_entrynumber: saved_household_entrynumber,
                    set_number_in_household: saved_number_in_household,
                    lat: form_lat,
                    lng: form_lng,
                    manual_address: saved_manual_address
                }));
            } else {
                //push new individiual survey onto Home Panel
                hp.push(Ext.create(s_view, {isNew: true, lat: form_lat, lng: form_lng, manual_address: saved_manual_address}));
            }
        }
    },

    /**
     * on View Init
     * called when location view is initialised.
     * {@link PointInTime.view.Location}
     */
    doLocationViewInit: function(){
        var me = this;
        var map_center = me.getMapPanel().getMap_center();
        var gcenter;

        //has the map center object already been created? (it should contain a chosen latitude and longtitude)
        if (map_center !== null) {

            //is the app online?
            if (navigator.onLine) {
                //assign google maps LatLng object to gcenter variable
                gcenter = new google.maps.LatLng(map_center.lat,map_center.lng);
                //invoke createMap function to create map with the LatLng object
                me.createMap(gcenter);

                me.getMap_geolocate_button().setDisabled(false);
            } else {
                me.getMapholder().setHtml('<div style="padding:15px;background-color:white;font-size:medium;font-weight:bold;">Location map not available. Press \'Enter Address\' to manually change address or click next to use the saved location for this survey.</div>');
            }

        } else {

            //make location panel masked with loading message
            me.getMapPanel().setMasked({
               xtype: 'loadmask',
               message: 'Loading',
               indicator: true
            });

            //invoke updateGeolocation function
            me.updateGeolocation(
                function(position) {
                    //successful found position
                    //if app is online?
                    if (navigator.onLine) {
                        //online, no saved center, create map
                        gcenter = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                        me.createMap(gcenter);

                    } else {
                        //location map not available, display message
                        me.getMapPanel().setMap_center({lat:position.coords.latitude,lng:position.coords.longitude});
                        me.getMapholder().setHtml('<div style="padding:15px;background-color:white;font-size:medium;font-weight:bold;">Location map not available. Press \'Enter Address\' to manually enter an address or click next to use the device\'s position.</div>');

                    }

                    //turn location view mask off
                    me.getMapPanel().setMasked(false);
                },
                function() {
                    //failed to find position, display message
                    me.getMapholder().setHtml('<div style="padding:15px;background-color:white;font-size:medium;font-weight:bold;">Location Services Unavailable. Please enable them or press \'Enter Address\' to manually enter a location.</div>')
                    me.getMapPanel().setMasked(false); // remove loading mask
                }
            );
        }

        //if not online, unable to geolocate therefore hide geolocation button
        if (!navigator.onLine) {
            this.getMap_geolocate_button().setHidden(true);
        }
    },

    /**
     * Looks on page for URL Pattern, overrides links with window.open to inappbrowser,useful for Google watermarks
     * @param  {String} urlPattern URL String
     */
    directUrlToExternal: function(urlPattern) {
        var pattern = "*[href^='"+urlPattern+"']"; // detect all urls starting with urlPattern
        var el = Ext.query(pattern);

        for (i=0; i<el.length; i++) {

            var url = el[i].getAttribute('href');

            el[i].onclick = function(e) {
                e.preventDefault();
                window.open(url, '_blank', 'location=yes');
                return false; // or do something else.
            };
        }
    },

    /** Create Map Panel
    * @param {google.maps.LatLng} LatLng Google LatLng Class
    */
    createMap: function(gcenter) {

        var me = this;

        if (gcenter) {
            //if you've got gCenter, set Map center
            me.getMapPanel().setGmapcenter(gcenter);
        };

        //define Ext Map object
        me.getMapPanel().setGoogle_gmap(Ext.create('Ext.Map',{
            itemId: 'locationMap',
            mapOptions: {
                center: gcenter,
                zoom: 16
            },
            listeners: {
                maprender: function(map, gmap, e){
                    //on map render
                    //wait a moment to center
                    Ext.Function.defer(function() {

                        me.centerMarker = new google.maps.Marker({
                            position: gmap.getCenter(),
                            map: gmap,
                            icon: new google.maps.MarkerImage('resources/icons/crosshairs.png',
                                new google.maps.Size(48,48),
                                new google.maps.Point(0,0),
                                new google.maps.Point(24,24)
                                )
                        });

                        //wait a moment for google maps to load to overrride google watermarks to inAppBrowser

                        me.directUrlToExternal("https://maps.google.com/maps");
                        me.directUrlToExternal("https://www.google.com/maps");
                        me.directUrlToExternal("https://www.google.com/intl");

                    },100);

                },
                centerchange: function(map, gmap, center, e){
                    //on map change
                    //set the center marker to the center of the
                    //map whenever it changes

                    if(me.centerMarker) {
                        me.centerMarker.setPosition(center);
                        me.getMapPanel().setGmapcenter(center);
                    };
                }
            }
        }));

        //set map center to location of click
        google.maps.event.addListener(me.getMapPanel().getGoogle_gmap().getMap(), "click",function(event){
            me.setMapCenter(event.latLng);
        })

        //define map holder, add google map to holder, set loading mask to false
        var mapHolder = me.getMapholder();
        mapHolder.add(me.getMapPanel().getGoogle_gmap());
        mapHolder.setMasked(false);

        //wait a moment
        Ext.Function.defer(this.rMapCenter,100,this,[gcenter],false);
    },

    /**
     * Set map center
     * @param {google.maps.LatLng} gcenter Google LatLng Class
     */
    rMapCenter: function(gcenter) {
        var gMap = this.getMapPanel().getGoogle_gmap().getMap();

        if(gMap == null) {
            //wait
            Ext.Function.defer(this.rMapCenter,250,this,[gcenter],false);
        } else {
            this.onMapGeolocate(true);
        }
    },

    /**
     * Set map center
     * @param {google.maps.LatLng} gcenter Google LatLng Class
     */
    setMapCenter: function(gcenter) {
        if(gcenter && gcenter instanceof google.maps.LatLng){
            this.getMapPanel().getGoogle_gmap().getMap().setCenter(gcenter);
        }

    },

    /**
     * Open Help Window on Location Screen
     */
    openHelpWindow: function() {
        Ext.Msg.alert("Help","Use the bulls-eye to pinpoint the location of the count. <br>You may also select 'Enter Address' if you would prefer to assign a location using the nearest street address to identify the location.");
    },

    /**
     * Do Map Geolocate
     * @param  {Boolean} dontshowmask Whether to show mask or not
     */
    onMapGeolocate: function(dontshowmask) {
        var me = this;
        //use specific on success, and on failure

        if (!dontshowmask) {
            me.getMapPanel().setMasked({
               xtype: 'loadmask',
               message: 'Loading',
               indicator: true
            });
        }

        this.updateGeolocation(function(position) {
            //succss callback

            var geolat = position.coords.latitude;
            var geolng = position.coords.longitude;

            if(me.getMapPanel().getGoogle_gmap() && geolat && geolng) {

                me.getMapPanel().setManualaddress('');
                var center = new google.maps.LatLng(geolat,geolng);
                me.setMapCenter(center);

            }

            if (!dontshowmask) {
                me.getMapPanel().setMasked(false);
            }
        }, function(error) {
            //error callback
            //console.log('onMapGeolocate UpdateGPS fail:' +  error.message);
            me.getMapPanel().setMasked(false);
            Ext.Msg.alert("Problem","Somthing went wrong");

        });
    },

    /**
     * Update Geolocation with HTML5 navigator
     * @param  {function} success_function Success callback function
     * @param  {function} fail_function    Failure callback function
     */
    updateGeolocation: function(success_function,fail_function) {
        var me = this;

        // Problems with certain Touch/IOS/Android/CMD/Phonegap configurations, experiment at own risk, but check for broad compatibility.
        //
        // Ext.device.Geolocation.getCurrentPosition({
        //     allowHighAccuracy:true,
        //     success: success_function,
        //     failure: fail_function,
        //     maximumAge:0,
        //     timeout:50000,
        //     scope: me
        // });

        navigator.geolocation.getCurrentPosition(success_function,fail_function,{maximumAge:0,timeout:50000,enableHighAccuracy:true});

        //can't use default html5 function due to scope, refer to scope variable above
        //navigator.geolocation.getCurrentPosition(success_function,fail_function,{maximumAge:0,timeout:50000,enableHighAccuracy:true});
    },

    /** on Change Location open Location Entry View */
    onChangeLocation: function() {

        //open address page for manual address
        this.getHomepanel().push(Ext.create('PointInTime.view.LocationEntry'));
    },

    /**
     * sets Manual Address into Map Panel Window
     * @param {String} manualaddress address
     */
    setManualAddress: function(manualaddress) {
        var me = this;

        if(me.getMapPanel().getGoogle_gmap()) {
            me.getMapPanel().getGoogle_gmap().remove();
        };

        me.getMapPanel().setManualaddress(manualaddress);
        me.getMapholder().setHtml('<div style="padding:15px;background-color:white;font-size:medium;font-weight:bold;">Address given:<br/>' + manualaddress +'</div>');
    },

    /**
     * on Save New Location, sets Manual Address and finds location on map
     */
    onSaveNewLocation: function() {
        var me = this;
        var val = this.getLocationfm().getValues();
        params = {};
        params.sensor = true;
        params.address = [val.street,val.city,val.state].join(',');

        if (!navigator.onLine) {
            //not online, set manual address, pop home panel
            me.setManualAddress(params.address);
            me.getHomepanel().pop();

        } else {

            //AJAX GET gecoordinates from Google
            Ext.Ajax.request({
                url: 'http://maps.googleapis.com/maps/api/geocode/json',
                params: params,
                method: 'GET',
                useDefaultXhrHeader: false,
                success: function(response) {
                    //successfull callback
                    responseObj = Ext.JSON.decode(response.responseText);
                    var results = responseObj.results;

                    if(results.length > 0 && results[0].geometry && results[0].geometry.location){
                        if(results[0].geometry.location.lat && results[0].geometry.location.lng) {

                            //set Map Panel Manual Address
                            me.getMapPanel().setManualaddress(params.address);

                            //set Gcenter LatLng
                            var gcenter = new google.maps.LatLng(results[0].geometry.location.lat,results[0].geometry.location.lng);

                            if(me.getMapPanel().getGoogle_gmap()) {
                                //if map exists, set center
                                me.setMapCenter(gcenter);
                            } else {
                                //if map does not exist, create map at center
                                me.createMap(gcenter);
                            };
                        }
                    }
                    me.getHomepanel().pop();
                },
                failure: function(response) {
                    //failure callback
                    //set Manual Address, pop home panel
                    me.setManualAddress(params.address);
                    me.getHomepanel().pop();
                }
             })
        };

    }


});