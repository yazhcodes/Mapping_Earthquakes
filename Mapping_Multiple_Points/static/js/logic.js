let cityData = cities;
let mymap = L.map('mapid').setView([40.7, -94.5], 4);
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', 
{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
})
streets.addTo(mymap);

cityData.forEach(i => {
    L.circleMarker(i.location,
        {
            radius: i.population/200000,
            color: 'orange',
            weight: 4,
            fillColor: 'orange'
        })
    .bindPopup(`<h1>${i.city}, ${i.state}</h1><hr><h3>Population: ${i.population.toLocaleString()}`)
    .addTo(mymap);
})

