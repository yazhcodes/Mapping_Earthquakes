// Data
let airportData = 'https://raw.githubusercontent.com/yazhcodes/Mapping_Earthquakes/Mapping_GeoJSON_Points/Resources/Data/majorAirports.json';

// Declare map variables
let streetUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let darkUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
let tileLayerProps = {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
};
let streetMap = L.tileLayer(streetUrl,tileLayerProps);
let darkMap = L.tileLayer(darkUrl,tileLayerProps);
let baseMaps = {
    Street: streetMap,
    Dark: darkMap
};
let myMap = L.map('mapid', {
    center: [30, 30], 
    zoom: 2,
    layers: [streetMap]
});

// Plot the Map
L.control.layers(baseMaps).addTo(myMap);
d3.json(airportData).then(function(data){
    L.geoJSON(data,{
        onEachFeature: function(feature,layer){
            layer.bindPopup(`<h2>${feature.properties.faa}</h2><hr><h3>${feature.properties.name}`);
        }
    }).addTo(myMap);
})