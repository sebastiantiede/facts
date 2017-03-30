/**
* Description for NSINKA_Map
* @private
* @property NSINKA_Map
*/

var NSINKA_Map = {
    vars: {
        userGeoPosition: new Array(),
        directionsService: false,
        directionsDisplay: false,
        infoWindow: false,
        map: false,
        routes: [
            {
                title : 'Route XY',
                route: [ 1, 5, 8, 12]
            },
            {
                title : 'Eigene Route',
                type: 'custom'
            }
        ],
        currentRoute: 0,
        waypoints: [

            {
                title: 'Freie Spiel- und Sportvereinigung, (FSSV) am Adenauerring',
                street: 'Adenauerring 36',
                location: {
                    lat: 49.024210,
                    lng: 8.394464
                },
                inactive: true
            },
            {
                title: 'Ludwig Marum, Ludwig-Marum-Straße',
                street: 'Ludwig-Marum-Straße',
                location: {
                    lat: 49.013931,
                    lng: 8.368547
                },
                inactive: true
            },
            {
                title: 'Adolf-Hitler-Haus,Ritterstraße 28/30',
                street: 'Ritterstraße 28/30',
                location: {
                    lat: 49.004969,
                    lng: 8.397915
                },
                inactive: true
            },
            {
                title: 'Arbeiterbildungsverein',
                street: 'Wilhelmstraße 14',
                location: {
                    lat: 49.002942,
                    lng: 8.405408
                },
                inactive: true
            },
            {
                title: 'August-Dosenbach-Straße',
                street: 'August-Dosenbach-Straße',
                location: {
                    lat: 49.001133,
                    lng: 8.341120
                },
                inactive: true
            },
            {
                title: 'Badisches Innenministerium',
                street: 'Schlossplatz 19',
                location: {
                    lat: 49.010772,
                    lng: 8.401985
                },
                inactive: true
            },
            {
                title: 'Bankhaus Veit L. Homburger',
                street: 'Karlstraße 11',
                location: {
                    lat: 48.997198,
                    lng: 8.394041
                },
                inactive: true
            },
            {
                title: 'DWM Deutsche Waffen- und Munitionsfabrik AG',
                street: 'Lorenzstraße',
                location: {
                    lat: 49.001499,
                    lng: 8.383093
                },
                inactive: true
            },
            {
                title: 'Führer-Verlag',
                street: 'Kaiserstraße 133',
                location: {
                    lat: 49.009541,
                    lng: 8.405210
                },
                inactive: true
            },
            {
                title: 'Gefängnis Riefstahlstraße',
                street: 'Riefstahlstr.9',
                location: {
                    lat: 49.013871,
                    lng: 8.385056
                },
                inactive: true
            },
            {
                title: 'Gestapo-Hauptstelle',
                street: 'Ebertstr. 26',
                location: {
                    lat: 48.995090,
                    lng: 8.391867
                },
                inactive: true
            },
            {
                title: 'Hauptbahnhof',
                street: 'Bahnhofsplatz',
                location: {
                    lat: 49.014079,
                    lng: 8.429836
                },
                inactive: true
            },
            {
                title: 'Jüdischer Friedhof',
                street: 'Haid- und Neu-Str. 41, 45',
                location: {
                    lat: 49.014279,
                    lng: 8.431264
                },
                inactive: true
            },
            {
                title: 'Wohn- und ehemaliges Gemeindehaus',
                street: 'Herrenstraße 14',
                location: {
                    lat: 49.010436,
                    lng: 8.399910
                },
                inactive: true
            },
            {
                title: 'HJ und BDM',
                street: 'Rüppurrer Straße',
                location: {
                    lat: 49.000793,
                    lng: 8.410684
                },
                inactive: true
            },
                {
                title: 'Hotel Nassauer Hof ',
                street: 'Kriegsstr. 88',
                location: {
                    lat: 49.006021,
                    lng: 8.407203
                },
                inactive: true
            },
                {
                title: 'Jüdische Schule in der Lidellschule',
                street: 'Markgrafenstraße',
                location: {
                    lat: 49.007762,
                    lng: 8.408019
                },
                inactive: true
            },
                {
                title: 'Kaufhaus Hertie',
                street: 'Kaiserstraße 92',
                location: {
                    lat: 49.010098,
                    lng: 8.401213
                },
                inactive: true
            },
            {
                title: 'Kaufhaus Karstadt',
                street: 'Kaiserstraße 147-159',
                location: {
                    lat: 49.009523,
                    lng: 8.402030
                },
                inactive: true
            },
            {
                title: 'Ludwig-Marum-Straße',
                street: 'Ludwig-Marum-Straße',
                location: {
                    lat: 49.014304,
                    lng: 8.368282
                },
                inactive: true
            },
            {
                title: 'Marktplatz',
                street: 'Karl-Friedrich-Straße 7',
                location: {
                    lat: 49.009410,
                    lng: 8.403912
                },
                inactive: true
            },
            {
                title: 'Polizeipräsidium Marktplatz',
                street: '',
                location: {
                    lat: 49.010543,
                    lng: 8.402238
                },
                inactive: true
            },
            {
                title: 'Schlossplatz - Bücherverbrennung im Juni 1933',
                street: 'Schlossplatz',
                location: {
                    lat: 49.010999,
                    lng: 8.403854
                },
                inactive: true
            },
            {
                title: 'Staatliche Kunsthalle',
                street: 'Hans-Thoma-Str. 2-6',
                location: {
                    lat: 49.012006,
                    lng: 8.399949
                },
                inactive: true
            },
            {
                title: 'Synagoge in der - Karl-Friedrich-Straße 14-18',
                street: 'Karl-Friedrich-Straße 14-18',
                location: {
                    lat: 49.007876,
                    lng: 8.403517
                },
                inactive: true
            },
            {
                title: 'Synagoge Kronenstraße',
                street: 'Kronenstraße 15',
                location: {
                    lat: 49.009926,
                    lng: 8.408276
                },
                inactive: true
            },
            {
                title: 'Technische Hochschule',
                street: 'Kaiserstraße 12',
                location: {
                    lat: 49.009675,
                    lng: 8.411613
                },
                inactive: true
            },
            {
                title: '"Volkshaus"',
                street: 'Schützenstraße 14',
                location: {
                    lat: 49.002430,
                    lng: 8.404942
                },
                inactive: true
            },
            {
                title: 'Wohnhaus Kreuzstraße 6-8',
                street: 'Kreuzstraße 6-8',
                location: {
                    lat: 49.010146,
                    lng: 8.405229
                },
                inactive: true
            },
            {
                title: 'Zentralverband der Angestellten',
                street: 'Gartenstraße 25',
                location: {
                    lat: 49.004745,
                    lng: 8.392970
                },
                inactive: true
            },

        ],
        startPoint: '',
        endPoint: '',
        markers: {
            waypoints: [],
            waypoints_inactive: [],
            userLocation: [],
            windows: []
        },
        allMarkersBound: false,
        overlay: false
    },
    init: function() {
        var map = document.getElementById('map');

        if(!map) {
            return;
        }

        NSINKA_Map.vars.startPoint = NSINKA_Map.vars.waypoints[0].location;
        NSINKA_Map.vars.endPoint = NSINKA_Map.vars.waypoints[NSINKA_Map.vars.waypoints.length-1].location;

        NSINKA_Map.vars.directionsService = new google.maps.DirectionsService;

        NSINKA_Map.vars.allMarkersBound = new google.maps.LatLngBounds();

        NSINKA_Map.vars.map = new google.maps.Map(map, {
            center: {
                lat: 49.0157643,
                lng: 8.2698457
            },
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            zoom: 13
        });

        NSINKA_Map.vars.overlay = new google.maps.OverlayView();
        NSINKA_Map.vars.overlay.draw = function() {};
        NSINKA_Map.vars.overlay.setMap(NSINKA_Map.vars.map);


        $(window).on('layerChange', function() {
            google.maps.event.trigger(NSINKA_Map.vars.map, "resize");
            /*var listener = google.maps.event.addListener(NSINKA_Map.vars.map, "idle", function() {
                NSINKA_Map.vars.map.setZoom(13);
                google.maps.event.removeListener(listener);
            });  */
            NSINKA_Map.reCenter();
        });

        $.each($.extend(true, {}, NSINKA_Map.vars.waypoints), function(i, waypoint) {
            NSINKA_Map.vars.allMarkersBound.extend(new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng));
        })

        //NSINKA_Map.vars.infoWindow = new google.maps.InfoWindow({map: NSINKA_Map.vars.map});
        NSINKA_Map.initRoute();
        NSINKA_Map.reCenter();
        NSINKA_Map.genUserLocationMaker();
        NSINKA_Map.genRoute();
    },
    initRoute: function(select) {
        NSINKA_Map.vars.currentRoute = select || NSINKA_Map.vars.currentRoute;

        $.each(NSINKA_Map.vars.waypoints, function(i, elem) {
            if($.inArray(i, NSINKA_Map.vars.routes[NSINKA_Map.vars.currentRoute].route) != -1) {
                NSINKA_Map.vars.waypoints[i].inactive = false;
            } else {
                NSINKA_Map.vars.waypoints[i].inactive = true;
            }
        });

    },
    initCustomRoute: function() {
        $.each(NSINKA_Map.vars.routes, function(i, route) {
            if(route.type) {
                if(route.type == 'custom') {
                    NSINKA_Map.vars.currentRoute = i;
                }
            }
        });
    },
    reCenter: function() {
        NSINKA_Map.getUserLocation(function(pos) {
            if(pos) {
                NSINKA_Map.vars.map.setCenter(new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude));
            } else {
                NSINKA_Map.vars.map.fitBounds(NSINKA_Map.vars.allMarkersBound);
            }
        });
    },
    genUserLocationMaker: function() {

        var r = 6;
        NSINKA_Map.vars.userGeoPosition.background = new google.maps.Marker({
            clickable: false,
            icon: {
                path: 'M-'+(r)+',0a'+(r)+','+(r)+' 0 1,0 '+(r*2)+',0a'+(r)+','+(r)+' 0 1,0 -'+(r*2)+',0',
                fillColor: '#0066CC',
                fillOpacity: 1,
                anchor: new google.maps.Point(0,0),
                strokeColor: '#0066CC',
                strokeWeight: 40,
                strokeOpacity: .25,
                scale: 1
            },
            shadow: null,
            zIndex: 999,
            map: NSINKA_Map.vars.map
        });
        var s = 4;
        NSINKA_Map.vars.userGeoPosition.arrow = new google.maps.Marker({
            clickable: false,
            icon: {
                path: 'M 0 0 L '+(s*2)+' 0 L '+(s)+' '+(s*2)+' z',
                fillColor: '#0066CC',
                fillOpacity: 0,
                anchor: new google.maps.Point((s/2),((s/2)-(r+5))),
                strokeWeight: 0,
                scale: 1,
                rotation: 45
            },
            shadow: null,
            zIndex: 999,
            map: NSINKA_Map.vars.map
        });


        NSINKA_Map.vars.userGeoPosition.setPosition = function(pos, compass) {

            if(pos) {
                NSINKA_Map.vars.userGeoPosition.background.setPosition(pos);
                NSINKA_Map.vars.userGeoPosition.arrow.setPosition(pos);
            }

            if(compass) {
                var icon = NSINKA_Map.vars.userGeoPosition.arrow.getIcon()
                icon.rotation = compass-180;
                icon.fillOpacity = 1;
                NSINKA_Map.vars.userGeoPosition.arrow.setIcon(icon);
            }

        }

        // on compass change
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(eventData) {
                var compassdir;
                if(event.webkitCompassHeading) {
                    compassdir = event.webkitCompassHeading;
                } else {
                    compassdir = event.alpha;
                }
                NSINKA_Map.vars.userGeoPosition.setPosition(null, compassdir);
                $(window).trigger('compassHeading', compassdir);
            });
        }

        navigator.geolocation.getCurrentPosition(this.setUserLocation, function() {
            console.error('no location');
        });

        // on position change
        navigator.geolocation.watchPosition(this.setUserLocation);


    },
    getUserLocation: function(fnAfter) {
        navigator.geolocation.getCurrentPosition(fnAfter, function() {
            fnAfter(false);
        });
    },

    setUserLocation: function(pos) {
        NSINKA_Map.vars.userGeoPosition.latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        NSINKA_Map.vars.userGeoPosition.setPosition(NSINKA_Map.vars.userGeoPosition.latLng);
    },
    genRoute: function() {
        var zoom = NSINKA_Map.vars.map.getZoom();
        if(NSINKA_Map.vars.directionsDisplay){
            //NSINKA_Map.vars.directionsService.setMap(null);
            NSINKA_Map.vars.directionsDisplay.setMap(null);
        }

        NSINKA_Map.vars.directionsDisplay = new google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "#000000"
            },
            suppressMarkers: true
        });

        NSINKA_Map.vars.directionsDisplay.setMap(NSINKA_Map.vars.map);

        var waypoints_active = [],
            waypoints_inactive = [];

        $.each($.extend(true, {}, NSINKA_Map.vars.waypoints), function(i, waypoint) {
            if(typeof waypoint.inactive != 'undefined') {
                if(waypoint.inactive) {
                    waypoints_inactive.push(waypoint);
                    return;
                }
            }
            waypoints_active.push(waypoint);
        })

        var active_length = Object.keys(waypoints_active).length;


        if(active_length) {

                var start = NSINKA_Map.vars.userGeoPosition.latLng ?
                        NSINKA_Map.vars.userGeoPosition.latLng :
                        new google.maps.LatLng(waypoints_active[0].location),
                    end =
                        new google.maps.LatLng(waypoints_active[active_length-1].location)
                    ;


                this.vars.directionsService.route({
                    origin: start,
                    destination: end,
                    waypoints: $.map($.extend(true, {}, waypoints_active), function(waypoint) {
                        return {
                            location : waypoint.location
                        };
                    }),
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.WALKING
                }, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        NSINKA_Map.vars.directionsDisplay.setDirections(response);

                        response.described_waypoints = $.map(response.geocoded_waypoints, function(waypoint, i) {
                            return Object.assign(waypoint, waypoints_active[i]);
                        });

                        response.system_waypoints = NSINKA_Map.vars.waypoints;

                        $(window).trigger('routeHasBeenCalculated', response);

                        $.each(NSINKA_Map.vars.markers.waypoints, function(i, item) {
                            item.setMap(null);
                        });

                        var leg = response.routes[ 0 ].legs[ 0 ];
                        var r = 5;

                        /* Active markers */
                        var legs = response.routes[ 0 ].legs;
                        $.each(waypoints_active, function(i, marker) {
                            /*if(i == (legs.length-1) || !i) {
                                return;
                            }*/

                            var _marker = new google.maps.Marker({
                                position: new google.maps.LatLng(marker.location.lat, marker.location.lng),
                                map: NSINKA_Map.vars.map,
                                icon: {
                                    path: 'M-'+(r)+',0a'+(r)+','+(r)+' 0 1,0 '+(r*2)+',0a'+(r)+','+(r)+' 0 1,0 -'+(r*2)+',0',
                                    fillColor: '#f6ae95',
                                    fillOpacity: 1,
                                    anchor: new google.maps.Point(0,0),
                                    strokeWeight: 2,
                                    scale: 2,
                                }
                            });

                            _marker.nsinkaData = waypoints_active[i];

                            NSINKA_Map.vars.markers.waypoints.push(_marker);
                            NSINKA_Map.markerWindow(_marker);

                        });

                        setTimeout(function() {
                            NSINKA_Map.vars.map.setZoom(11);
                        });
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });

        }
        /* Inactive markers */
        $.each($.extend(true, {}, waypoints_inactive), function(i, marker) {
            var r = 5;

            var _marker = new google.maps.Marker({
                position: new google.maps.LatLng(marker.location),
                icon: {
                    path: 'M-'+(r)+',0a'+(r)+','+(r)+' 0 1,0 '+(r*2)+',0a'+(r)+','+(r)+' 0 1,0 -'+(r*2)+',0',
                    fillColor: '#000000',
                    fillOpacity: .5,
                    anchor: new google.maps.Point(0,0),
                    strokeWeight: 0,
                    scale: 1,
                }
            });

            _marker.nsinkaData = marker;

            NSINKA_Map.markerWindow(_marker);

            NSINKA_Map.vars.markers.waypoints_inactive.push(_marker);

            _marker.setMap(NSINKA_Map.vars.map);

        });

        if(!Object.keys(waypoints_active).length) {
            setTimeout(function() {
                $(window).trigger('routeHasBeenCalculated', {});
            }, 1000)
        }
    },
    handleError: function(browserHasGeolocation, pos) {
        NSINKA_Map.vars.infoWindow.setPosition(pos);
        NSINKA_Map.vars.infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    },
    markerWindow: function(marker) {
        marker.addListener('click', function() {
            var $win = $(NSINKA_Global.tmpl('mapWindow', marker.nsinkaData));

            NSINKA_Map.vars.map.panTo(marker.getPosition());
            google.maps.event.addListenerOnce(NSINKA_Map.vars.map, 'idle', function(){
                $('#placeholder').append($win);
                setPos($win);

                $win[0].event_drag = NSINKA_Map.vars.map.addListener('bounds_changed', function() {
                    $win.trigger('close')
                });
                $win[0].event_zoom = NSINKA_Map.vars.map.addListener('zoom_changed', function() {
                    $win.trigger('close')
                });

                $.each(NSINKA_Map.vars.markers.windows, function(i, window) {
                    NSINKA_Map.vars.markers.windows.trigger('close');
                });

                NSINKA_Map.vars.markers.windows = $win;

                $win.find('.close').click(function() {
                    $win.remove();
                });
                //infowindow.open(NSINKA_Map.vars.map, marker);


                $win.on('close', function() {
                    $(this).remove();
                    google.maps.event.removeListener(this.event_drag);
                    google.maps.event.removeListener(this.event_zoom);
                });

            });





        });


        function setPos($elem) {
            var gmap = NSINKA_Map.vars.map;
            var topRight=gmap.getProjection().fromLatLngToPoint(gmap.getBounds().getNorthEast ());
            var bottomLeft=gmap.getProjection().fromLatLngToPoint(gmap.getBounds().getSouthWest());
            var scale=Math.pow(2,gmap.getZoom());
            var worldPoint=gmap.getProjection().fromLatLngToPoint(marker.getPosition());
            var point = new google.maps.Point((worldPoint.x-bottomLeft.x)*scale,(worldPoint.y-topRight.y)*scale);

            $elem.css({
                left:( point.x - $elem.width()/2),
                top:(point.y - $elem.height() - 30)
            });

        }
    },
    startDirections: function() {



    }
}

function NSINKA_gMap() {
    NSINKA_Map.init();
}
