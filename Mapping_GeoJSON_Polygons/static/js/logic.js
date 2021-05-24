// Data
let torontoNeighborhoodData = 'https://raw.githubusercontent.com/yazhcodes/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Resources/Data/torontoNeighborhoods.json';

// Declare map variables
let streetUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
let satStreetUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let tileLayerProps = {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
};
let streetMap = L.tileLayer(streetUrl,tileLayerProps);
let satStreetMap = L.tileLayer(satStreetUrl,tileLayerProps);
let baseMaps = {
    Street: streetMap,
    'Satellite Street': satStreetMap
};
let myMap = L.map('mapid', {
    center: [43.651070,-79.347015], 
    zoom: 10,
    layers: [streetMap]
});
let myStyle = {
    weight: 1,
    color: 'blue',
    fillColor: 'yellow'
}

// Plot the Map
L.control.layers(baseMaps,null,{collapsed:false}).addTo(myMap);
d3.json(torontoNeighborhoodData).then(function(data){
    L.geoJSON(data,{
        style: myStyle,
        onEachFeature: function(feature,layer){
            layer.bindPopup(`<h2>Neighborhood: ${feature.properties.AREA_NAME}</h2>`);
        }
    }).addTo(myMap);
})