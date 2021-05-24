// Data
let torontoData = 'https://raw.githubusercontent.com/yazhcodes/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Resources/Data/torontoRoutes.json';

// Declare map variables
let lightUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
let darkUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
let tileLayerProps = {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
};
let lightMap = L.tileLayer(lightUrl,tileLayerProps);
let darkMap = L.tileLayer(darkUrl,tileLayerProps);
let baseMaps = {
    Light: lightMap,
    Dark: darkMap
};
let myMap = L.map('mapid', {
    center: [30,30], 
    zoom: 2,
    layers: [darkMap]
});
let myStyle = {
    weight: 2,
    color: 'lightyellow'
}

// Plot the Map
L.control.layers(baseMaps).addTo(myMap);
d3.json(torontoData).then(function(data){
    L.geoJSON(data,{
        style: myStyle,
        onEachFeature: function(feature,layer){
            layer.bindPopup(`<h2>Airline: ${feature.properties.airline}</h2><hr><h3>Destination: ${feature.properties.dst}`);
        }
    }).addTo(myMap);
})