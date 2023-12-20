
var myLocation = [-7.804571706156139, 33.49138967845981];
var minKM = 10;
map.on('load', () => {
    const marker = new mapboxgl.Marker()
        .setLngLat(myLocation) // replace lng and lat with your coordinates
        .addTo(map);
});

//filterRoutes();
function getLocationRouteDistance(){
    return 20;
}