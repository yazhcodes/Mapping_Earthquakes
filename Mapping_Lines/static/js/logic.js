let cityData = cities;
let lineCoords = [
    [37.615223, -122.389977],
    [30.1900, -97.6687],
    [43.651070, -79.347015],
    [40.641766, -73.780968]
];
let myMap = L.map('mapid').setView([40.641766, -97.6687], 4);

let streetLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', 
{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
})

function circleMarkers(city){
    return L.circleMarker(city.location,
        {
            radius: city.population/200000,
            color: 'orange',
            weight: 4,
            fillColor: 'orange'
        })
    .bindPopup(`<h1>${city.city}, ${city.state}</h1><hr><h3>Population: ${city.population.toLocaleString()}`)
}

let flightRoute = L.polyline(lineCoords, {
    color: 'blue',
    weight: 4,
    dashArray: '5,10',
    opacity: 0.5
});

streetLayer.addTo(myMap);
// cityData.forEach(city => circleMarkers(city).addTo(myMap));
flightRoute.addTo(myMap);


