// Data
let tectonicData = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
let earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
let majorEarthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';

// Define map variables and functions
let tileLayerProps = {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
};
let streetMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',tileLayerProps);
let satelliteStreetMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',tileLayerProps);
let navNightMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}',tileLayerProps);
let baseMaps = {
    'Street': streetMap,
    'Satellite Street': satelliteStreetMap,
    'Navigation Night': navNightMap
};
let tectonicPlates = new L.layerGroup();
let allEarthquakes = new L.layerGroup();
let majorEarthquakes = new L.layerGroup();
let overlayMaps = {
    'Tectonic Plates': tectonicPlates,
    'All Earthquakes': allEarthquakes,
    'Major Earthquakes': majorEarthquakes
};
function setRadius(magnitude) {
    if (magnitude === 0) {return 1}
    return magnitude * 4;
};
function setColor(magnitude) {
    if (magnitude>5) {return '#ea2c2c'}
    if (magnitude>4) {return '#ea822c'}
    if (magnitude>3) {return '#ee9c00'}
    if (magnitude>2) {return '#eecc00'}
    if (magnitude>1) {return '#d4ee00'}
    return '#98ee00';
}
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: setColor(feature.properties.mag),
        color: '#000000',
        stroke: true,
        weight: 0.5,
        radius: setRadius(feature.properties.mag)
    };
};

// Create map
let myMap = L.map('mapid',{
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streetMap,tectonicPlates,allEarthquakes]
});

// Plot Tectonic Plates
d3.json(tectonicData).then(function(data){
    L.geoJson(data,{
        style: {
          color: 'purple',
          weight: 2
        }
    }).addTo(tectonicPlates);
});
tectonicPlates.addTo(myMap);

// Plot All Earthquake Data
d3.json(earthquakeData).then(function(data){
    L.geoJson(data,{
        style: styleInfo,
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng)
            .bindPopup(`<h3>Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`);
        }
    }).addTo(allEarthquakes);
});
allEarthquakes.addTo(myMap);

// Plot Major Earthquake Data
d3.json(majorEarthquakeData).then(function(data){
    function setColor(magnitude) {
        if (magnitude>5) {return '#ea2c2c'}
        if (magnitude>4) {return '#ea822c'}
        return '#ee9c00';
    };
    L.geoJson(data,{
        style: styleInfo,
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng)
            .bindPopup(`<h3>Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`);
        }
    }).addTo(majorEarthquakes);
});
majorEarthquakes.addTo(myMap);

// Add controls
L.control.layers(baseMaps,overlayMaps).addTo(myMap);

// Add legends
let legend = L.control({position:'bottomright'});
legend.onAdd = function(){
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
        ];
    for (var i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
    return div;
};
legend.addTo(myMap);