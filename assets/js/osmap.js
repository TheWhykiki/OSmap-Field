jQuery(function() {

    const options = Joomla.getOptions('options');

    let latitudeMap = options.latitude[0]
    let longitudeMap = options.longitude[0];
    let zoom = options.zoom[0];
    let id = options.id;

// Open Street Maps einbinden
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {
            maxZoom: 18,
            attribution: osmAttrib
        });



// Startwert für die Map festlegen Lat/Lng und Zoom
    var map = L.map('map').setView([latitudeMap,longitudeMap], zoom).addLayer(osm);


    if(jQuery('#' + id).val() != ''){

        var value = jQuery('#' + id).val().split(',');
        var marker = L.marker([value[0],value[1]]).addTo(map);
    }
    else{
        var marker;
    }

    setInterval(function (){
        map.invalidateSize();
    }, 100);
    map.on('click', onMapClick);

// Marker bei Klick löschen falls vorhanden und neuen hinzufügen

    function onMapClick(e) {
        if(marker !== undefined){
            map.removeLayer(marker);
        }

        var geojsonFeature = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [e.latlng.lat, e.latlng.lng]
            }
        }

        L.geoJson(geojsonFeature, {

            pointToLayer: function(feature, latlng){

                marker = L.marker(e.latlng, {

                    title: "Resource Location",
                    alt: "Resource Location",
                    riseOnHover: true,
                    draggable: false,

                });

                return marker;
            }
        }).addTo(map);
        getMarker();
    }


// getting all the markers at once
    function getMarker() {

        var allMarkersObjArray = [];//new Array();
        var allMarkersGeoJsonArray = [];//new Array();

        jQuery.each(map._layers, function (ml) {
            //console.log(map._layers)
            if (map._layers[ml].feature) {
                allMarkersObjArray.push(this)
                allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()))
            }
        })
        var markerObject = jQuery.parseJSON(allMarkersGeoJsonArray);
        var longitude = markerObject.geometry.coordinates[0];
        var latitude = markerObject.geometry.coordinates[1]
        var valueField = latitude + ',' + longitude;

        jQuery('#' + id).val(valueField);



    }});