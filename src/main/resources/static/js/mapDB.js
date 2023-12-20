/* routeWay;
const pt1 = [-7.550669551266736, 33.61912319107718];
const pt2 = [-7.60302648299006, 33.596057806990544];
const coordinates = [pt1,pt2];

const point1 = [-7.498331324332838, 33.58844012740967]; //Anassi
const point2 = [-7.53671360441524, 33.609014980705254]; //Ain Sbaa
const point3 = [-7.550199354126818, 33.567633294779995]; //Hay moulay rchid
const point4 = [-7.604488303087322, 33.59208761216651];//EMSI
const coords = [point1,point2, point3, point4];

const src1 = [-7.627330289605766, 33.606820244608585];
const dest1 = [-7.7108550396758915, 33.54269438957499];
const cords = [src1,dest1];*/
/*function postTrip()
{
    getOptimizedRoute(cords).then((val) => {
        //routeWay = val;
        const trip = {
            source: val[0],
            destination: val[val.length - 1],
            carModel: "JEEP",
            route: val,
        };
        saveTrip(trip);
    });
}

const saveTrip = async (trip) => {
    try {
        console.log(JSON.stringify(trip, null, 2));
        const response = await fetch('http://localhost:8080/trips', {
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
        console.log('Trip created successfully:', result);
    } catch (error) {
        console.error('Error creating trip:', error);
    }
};*/
let trips

const getAllTrips = async () => {

    try {
        const response = await fetch('http://localhost:8080/trips/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        trips = await response.json();
    } catch (error) {
        console.error('Error getting trips:', error);
    }
    return trips
};

async function getAvailableRoutes()
{
    getAllTrips().then((trips) => {

        trips.forEach((trip) => {
            drawRoute(trip.route, trip.id, '#033eff', trip.passenger);
            //mapClickFn(trip.source);
            //mapClickFn(trip.destination);

        });
    });

}

function filterRoutes()
{
    getAllTrips().then((trips) => {
        let isFar = true;
        trips.forEach((trip) => {
            let distance;
            const route = trip.route;
            for (let i = 0; i < route.length; i++) {
                const node = turf.point(route[i]);
                distance = turf.distance(myLocation, node);
                if (distance <= minKM)
                {
                    isFar = false;
                    console.log(route);
                    console.log("Route "+distance+" Skipped");
                    break;
                }
            }
            if (isFar)
            {
                console.log("Route "+distance+" removed");
                if (map.getLayer(trip.id)) {
                    removeRoute(trip.id);
                }
            }
            isFar = true;
        });
    });

}

function mapClickFn(node) {
    /*const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        node[0]+
        "," +
        node[1]+
        ".json?access_token=" +
        "pk.eyJ1IjoicG9jbGFtIiwiYSI6ImNscG12aGJ0ZDBleWYyaXQzd2ttYmgxa2gifQ.SUnhhd7SdBF5J0reUg1OzA" +
        "&types=address";
    $.get(url, function (data) {
        if (data.features.length > 0) {
            const address = data.features[0].place_name;
            console.log(address);
            return address;
        } else {
            console.log("No address found");

        }
    });
    return "Unknown Place"*/

    //console.log(node[0], node[1])
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + node[0] + ',' + node[1] + '.json?access_token=pk.eyJ1IjoicG9jbGFtIiwiYSI6ImNscG12aGJ0ZDBleWYyaXQzd2ttYmgxa2gifQ.SUnhhd7SdBF5J0reUg1OzA';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //var placeName = data.features[0].place_name;
            console.log(data);
            //alert(data)
        })
        .catch(error => console.error('Error:', error));
}

const script = document.getElementById('search-js');
script.onload = () => {
    const collection = mapboxsearch.autofill({accessToken: "pk.eyJ1IjoicG9jbGFtIiwiYSI6ImNscG12aGJ0ZDBleWYyaXQzd2ttYmgxa2gifQ.SUnhhd7SdBF5J0reUg1OzA"});
};