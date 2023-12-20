const markerMap = {};
const passengerMap = {};
map.on('load', () => {
    /*const pt1 = [-7.550669551266736, 33.61912319107718];
    const pt2 = [-7.60302648299006, 33.596057806990544];
    const coordinates = [pt1,pt2];

    getOptimizedRoute(coordinates).then((val) => {
        routes.push(val);
        console.log(val[0]);

        const trip = new Trip(val[0], val[val.length - 1], "BMW", val);
        //saveTripToJsonFile(trip, 'trip_data.json');
    });*/

    /*const point1 = [-7.498331324332838, 33.58844012740967]; //Anassi
    const point2 = [-7.53671360441524, 33.609014980705254]; //Ain Sbaa
    const point3 = [-7.550199354126818, 33.567633294779995]; //Hay moulay rchid
    const point4 = [-7.604488303087322, 33.59208761216651];//EMSI
    const coords = [point1,point2, point3, point4];
    getOptimizedRoute(coords).then((val) => {
        routes.push(val);
        //console.log(val);
    });*/

    /*const src1 = [-7.627330289605766, 33.606820244608585];
    const dest1 = [-7.7108550396758915, 33.54269438957499];
    const cords = [src1,dest1];
    getOptimizedRoute(cords).then((val) => {
        routes.push(val);
        //console.log(val);
    });*/
});
/*async function getAvailableRoutes()
{
    alert("in script")
    routes.forEach((route, index) => {drawRoute(route, index.toString(), '#033eff')});
}*/
//FOR TEST
/*const pt1 = [-7.489270104459877, 33.59515786223858];
const pt2 = [-7.499711375750991, 33.59122362162091];
const pt3 = [-7.507018182638831, 33.58841396849046];
const pt4 = [-7.505690280011947, 33.584325778981395];
const coordinates = [pt1,pt3, pt2, pt4];
getOptimizedRoute(coordinates).then((val) => {
    drawRoute(val, "r1", '#033eff');
});


//FOR TEST
const point1 = [-7.498331324332838, 33.58844012740967]; //Anassi
const point2 = [-7.53671360441524, 33.609014980705254]; //Ain Sbaa
const point3 = [-7.550199354126818, 33.567633294779995]; //Hay moulay rchid
const point4 = [-7.604488303087322, 33.59208761216651];//EMSI
const coords = [point1,point2, point3, point4];
getOptimizedRoute(coords).then((val) => {
    drawRoute(val, "EmsiRoute", '#b803ff');
});
*/



async function getOptimizedRoute(coordinates) {

    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates.join(';')}?overview=full&steps=true&geometries=geojson&source=first&destination=last&roundtrip=false&access_token=${mapboxgl.accessToken}`;

    const response = await fetch(url, { method: 'GET' });

    const data = await response.json();

    route = data.trips[0].geometry.coordinates;

    return route;
}

function drawRoute(newRoute, name, color = "#4f014c", stops = null){
    removeRoute(name);

    map.addLayer({
        id: name,
        type: 'line',
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: newRoute
                }
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': color, //'#033eff'
            'line-width': 4,
            'line-opacity': 0.6
        }
    });
    map.addLayer(
        {
            id: name+'arrows',
            type: 'symbol',
            source: `${name}`,
            layout: {
                'symbol-placement': 'line',
                'text-field': '▶',
                'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
                'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 12, 30, 22, 160],
                'text-keep-upright': false
            },
            paint: {
                'text-color': '#000000',
                'text-halo-color': 'hsl(55, 11%, 96%)',
                'text-halo-width': 3
            }
        },
        'waterway-label'
    );

    map.addLayer({
        id: name+'_clickRange',
        type: 'line',
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: newRoute
                }
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': 'rgb(220,255,0)',
            'line-width': 15, // Increase this to increase the clickable area
            'line-opacity': 0 // This makes the buffer invisible
        }
    });
    const srcIconEle = document.createElement('div');
    srcIconEle.className = 'sourceIcon'
    const srcMarker = new mapboxgl.Marker(srcIconEle);
    srcMarker.setLngLat(newRoute[0]).addTo(map);

    const destIconEle = document.createElement('div');
    destIconEle.className = 'destIcon';
    const destMarker = new mapboxgl.Marker(destIconEle);
    destMarker.setLngLat(newRoute[newRoute.length-1]).addTo(map);

    markerMap[name] = [srcMarker, destMarker];

    if (stops != null) {
        if (stops.length > 0)
        {
            console.log("in stops drawer")
            const imagePaths = [
                'https://cdn.discordapp.com/attachments/1183450094566125658/1185948243390115910/man_2.png',
                'https://cdn.discordapp.com/attachments/1183450094566125658/1185945351174246491/man_1.png',
                'https://cdn.discordapp.com/attachments/1183450094566125658/1185948242928730133/standing-up-man-.png',
                'https://cdn.discordapp.com/attachments/1183450094566125658/1185948243624988752/pedestrian-man.png'
            ];

            stops.forEach((passenger, index) => {
                const stickManEle = document.createElement('div');
                stickManEle.className = 'stickManIcon';
                const randomIndex = Math.floor(Math.random() * imagePaths.length);
                stickManEle.style.backgroundImage = `url('${imagePaths[randomIndex]}')`;

                const stickManIcon = new mapboxgl.Marker(stickManEle);
                stickManIcon.setLngLat(passenger.location).setPopup(
                    new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`<h6 style="margin-bottom: 10px;">${passenger.name}</h6>
                        <hr>
                        <p style="text-align: left"><i class="fa-solid fa-envelope"></i><strong>Email : </strong>${passenger.email}</p>
                        <p style="text-align: left"><i class="fa-solid fa-phone"></i><strong>Phone : </strong>${passenger.phone}</p>
                        <button type="button" class="btn btn-info">Info</button>`)).addTo(map);
                if (name in passengerMap)
                {
                    passengerMap[name].push(stickManIcon);
                }
                else
                {
                    passengerMap[name] = [stickManIcon];
                }
            });
        }
    }

}

/*
const src = [-7.467455772960648, 33.63286080898027];
const dest = [-7.513706490777565, 33.619373647214516];
const crds = [src,dest];
getOptimizedRoute(crds).then((val) => {
    drawRoute(val, "updatablePath", '#2c8801');
});

async function updateRoute() {
    getOptimizedRoute(crds)
        .then((newRoute) => {
            drawRoute(newRoute, "updatablePath", '#2c8801');
        });
}
map.on('click', (event) => {
    const lng = event.lngLat.lng;
    const lat = event.lngLat.lat;

    // Add the new coordinates at the length - 1 position
    crds.splice(crds.length - 1, 0, [lng, lat]);
    updateRoute()
    console.log(crds); // Check the updated cords array
});
*/
