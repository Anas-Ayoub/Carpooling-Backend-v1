let srcPoint;
let destPoint;
let car;
let coordinates = [];
let route;
let DBRoute;
function createTrip()
{
}
let dMarker
let sMarker
map.on('click', function(e) {
    // HANDLE THE ERROR WHEN THE TRIPS GOT FILTERED, IT'S REMOVED, IT SHOULD ALSO UPDATE IN THE TRIPS
    if (trips !== undefined && trips.length)
    {
        const layers = trips.map(trip => trip.id);
        let features = map.queryRenderedFeatures(e.point, { layers: layers });

        if (!features.length) {
            return;
        }
        let feature = features[0];

        const foundTrip = trips.find(trip => trip.id === feature.layer.id);

        if (foundTrip) {
            let resp = confirm("ID : "+feature.layer.id+"\nCar : "+foundTrip.carModel);
            if (resp)
            {
                    let passengerData = {
                        "id": foundTrip.id,
                        "route": foundTrip.route,
                        "passenger": [{"id": "657f0f0a34af922a5185b0fe"}]
                    }
                    updateTrip(passengerData).then((x)=>{
                        console.log(x)

                        getTripById(foundTrip.id).then((trip) => {
                            console.log("trip");
                            console.log(trip);
                            if (trip !== undefined)
                            {
                                //trip.passenger.push(passengerData)
                                const passLocations = []
                                trip.passenger.forEach((pass)=> {
                                    passLocations.push(pass.location);
                                });
                                const stops = [trip.route[0], ...passLocations,trip.route[trip.route.length-1]]
                                console.log("stops :");
                                console.log(stops);
                                getOptimizedRoute(stops).then((newRoute) => {
                                    trip.route = newRoute;
                                    drawRoute(newRoute, trip.id, "#2c8801", trip.passenger)
                                    updateTrip(trip);
                                });
                            }
                        });

                    });
            }
            else
            {
                console.log("Cancel Pressed");
            }
            //alert("ID : "+feature.layer.id+"\nCar : "+foundTrip.carModel);
        } else {
            console.log('Trip not found');
        }
    }
});

function chooseSource()
{
    //alert("Choose a Source Point on map");

    map.once('click', (event) => {
        if (sMarker !== undefined)
        {
            sMarker.remove();
        }
        let lng = event.lngLat.lng;
        let lat = event.lngLat.lat;
        srcPoint = [lng,lat];

        getLocationName(lat, lng).then((val) => {
            document.getElementById("txtSource").value = val;
        });

        const srcIconEle = document.createElement('div');
        srcIconEle.className = 'sourceIcon'

        sMarker = new mapboxgl.Marker(srcIconEle);
        sMarker.setLngLat(srcPoint).addTo(map);

        if (srcPoint != null && destPoint != null)
        {
            coordinates[0] = srcPoint;
            coordinates[1] = destPoint;

            getOptimizedRoute(coordinates).then((val) => {
                route = val;
                if (dMarker !== undefined)
                {
                    dMarker.remove();
                }
                if (sMarker !== undefined)
                {
                    sMarker.remove();
                }
                drawRoute(val, 'tmpRoute', "#226400");
            });

        }
    });
}
function chooseDestination()
{
    alert("Choose a Destination Point on map");
    map.once('click', (event) => {

        let lng = event.lngLat.lng;
        let lat = event.lngLat.lat;
        destPoint = [lng,lat];

        getLocationName(lat, lng).then((val) => {
            document.getElementById("txtDestination").value = val;
        });

        const destIconEle = document.createElement('div');
        destIconEle.className = 'destIcon';

        dMarker = new mapboxgl.Marker(destIconEle);
        dMarker.setLngLat(destPoint).addTo(map);

        if (srcPoint != null && destPoint != null)
        {
            coordinates[0] = srcPoint;
            coordinates[1] = destPoint;

            getOptimizedRoute(coordinates).then((val) => {
                route = val;
                if (dMarker !== undefined)
                {
                    dMarker.remove();
                }
                if (sMarker !== undefined)
                {
                    sMarker.remove();
                }
               drawRoute(route, 'tmpRoute', "#226400");
            });
        }
    });
}

function postTrip()
{
    const trip = {
        source: route[0],
        destination: route[route.length - 1],
        carModel: document.getElementById("txtCar").value,
        startDate: "2023-12-16T15:46:57.626Z",
        driver: {"id": "657dc25b804d044d474d5ee3"},
        passenger: [],
        //coordination: [route[0],route[route.length - 1]],
        route: route,
    };
    saveTrip(trip);
}

const saveTrip = async (trip) => {
    try {
        console.log(JSON.stringify(trip, null, 2));
        const response = await fetch('http://localhost:8080/trips/saveTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trip),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        DBRoute = result;

        if (map.getSource("tmpRoute")) {
            if (map.getLayer("tmpRoutearrows")) {
                map.removeLayer("tmpRoutearrows");
            }
            if (map.getLayer("tmpRoute_clickRange")) {
                map.removeLayer("tmpRoute_clickRange");
            }
            map.removeLayer("tmpRoute");
            map.removeSource("tmpRoute");
        }

        drawRoute(DBRoute.route, DBRoute.id, "#0188b4", trip.passenger)
        console.log('Trip created successfully:', result);
    } catch (error) {
        console.error('Error creating trip:', error);
    }
};

    ///////// UPDATING ROUTE ////////
async function updateTrip(tripToUpdate){
    const response = await fetch('http://localhost:8080/trips/updateTrip', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripToUpdate),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    else
    {
        const result = await response.json();
        //console.log(result);
        return result;
    }

}

async function getTripById(id)
{
    const url = `http://localhost:8080/trips/${id}`;
    const response = await fetch(url, { method: 'GET' });
    return await response.json();
}