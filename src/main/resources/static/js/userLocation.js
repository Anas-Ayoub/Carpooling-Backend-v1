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

map.on('click', (event) => {
    let lng = event.lngLat.lng;
    let lat = event.lngLat.lat;
    console.log(lng, lat)
});