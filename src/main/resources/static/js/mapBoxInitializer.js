var map;
mapboxgl.accessToken = 'pk.eyJ1IjoicG9jbGFtIiwiYSI6ImNscG12aGJ0ZDBleWYyaXQzd2ttYmgxa2gifQ.SUnhhd7SdBF5J0reUg1OzA';
    map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-7.498772758225584, 33.59115239083572],
    zoom: 12
});
