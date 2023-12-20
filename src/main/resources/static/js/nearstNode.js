map.on('click', (event) => {
    lng = event.lngLat.lng;
    lat = event.lngLat.lat;
    getNearestNode(lat, lng)
    console.log(`${lng}, ${lat}`);
});

function getNearestNode(lat, lng)
{
    console.log(lat, lng)
    const myLocation = turf.point([lng, lat]);
    let minDistance = Infinity;
    let nearestNode = null;

    for (let i = 0; i < route.length; i++) {
        const node = turf.point(route[i]);
        const distance = turf.distance(myLocation, node);
        if (distance < minDistance) {
            minDistance = distance;
            nearestNode = route[i];
        }
    }

    if (map.getSource('nearestNode')) {
        map.removeLayer('nearestNode');
        map.removeSource('nearestNode');
    }
// Now nearestNode contains the nearest node to your location
// Add a point to the map at the location of the nearest node
    map.addLayer({
        id: 'nearestNode',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: nearestNode
                }
            }
        },
        paint: {
            'circle-radius': 8,
            'circle-color': '#3bea11'
        }
    });
}