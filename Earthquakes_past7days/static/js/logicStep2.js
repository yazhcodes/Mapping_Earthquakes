// Data
let earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Declare map variables and functions
let tileLayerProps = {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
};
let streetMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',tileLayerProps);
let satelliteStreetMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',tileLayerProps);
let myMap = L.map('mapid',{
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streetMap]
});
let baseMaps = {
    Street: streetMap,
    'Satellite Street': satelliteStreetMap
};
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
};
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: '#ffae42',
        color: '#000000',
        stroke: true,
        weight: 0.5,
        radius: getRadius(feature.properties.mag)
    };
};

// Plot the map
L.control.layers(baseMaps).addTo(myMap);
d3.json(earthquakeData).then(function(data){
    L.geoJson(data,{
        style: styleInfo,
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng);
        }
    }).addTo(myMap);
})