jQuery(function() {

    const options = Joomla.getOptions('options');

    let latitudeMap = options.latitude;
    let longitudeMap = options.longitude;
    let zoom = options.zoom;

    // Open Street Maps einbinden
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {
            maxZoom: 18,
            attribution: osmAttrib
        });



// Startwert für die Map festlegen Lat/Lng und Zoom
    var map = L.map('map').setView([latitudeMap,longitudeMap], zoom).addLayer(osm);


    var marker = L.marker([latitudeMap,longitudeMap]).addTo(map);



    });