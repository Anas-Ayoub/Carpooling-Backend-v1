map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    })
);

map.on('geolocate', function(e) {
    var lon = e.coords.longitude;
    var lat = e.coords.latitude
    new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);
});

/*map.on('click', (event) => {
    let lng = event.lngLat.lng;
    let lat = event.lngLat.lat;

    var requestOptions = {
        method: 'GET',
    };
    console.log(lng, lat)
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=f8fea228a45848728018b7870d351eac`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});*/

async function getLocationName(lat, lng)
{
    const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&lang=fr&apiKey=f8fea228a45848728018b7870d351eac`, {
        method: 'GET',
    });

    result = await response.json();
    const data = result.features[0].properties
    let place = "";
    if (data.hasOwnProperty("district"))
    {
        place+=data["district"]+", ";
    }
    if (data.hasOwnProperty("suburb"))
    {
        place+=data["suburb"]+", ";
    }
    place+=data["city"];
    console.log(place)
    return place;
}