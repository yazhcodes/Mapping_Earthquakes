// Declare variables
let myMap = L.map('mapid').setView([37.61899948120117,-122.375], 10);
let darkMap = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
let nightNavMap = 'https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v2/tiles/{z}/{x}/{y}?access_token={accessToken}';
let outdoorMap = 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let tileLayerProps = {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
};
let sanFranAirport = {
    "type":"FeatureCollection",
    "features":[{
        "type":"Feature",
        "properties": {
            "id":"3469",
            "name":"San Francisco International Airport",
            "city":"San Francisco",
            "country":"United States",
            "faa":"SFO",
            "icao":"KSFO",
            "alt":"13",
            "tz-offset":"-8",
            "dst":"A",
            "tz":"America/Los_Angeles"
        },
        "geometry": {
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]
        }
    }]
};

// Plot the Map
L.tileLayer(outdoorMap,tileLayerProps).addTo(myMap);
L.geoJSON(sanFranAirport,{
    // pointToLayer: function(feature,latlng) {
    //     return L.marker(latlng)
    //             .bindPopup(`<h2>${feature.properties.name}</h2><hr><h3>${feature.properties.city}, ${feature.properties.country}`);
    onEachFeature: function(feature,layer) {
        layer.bindPopup(`<h2>${feature.properties.faa}</h2><hr><h3>${feature.properties.name}`);
    }    
})
.addTo(myMap);
