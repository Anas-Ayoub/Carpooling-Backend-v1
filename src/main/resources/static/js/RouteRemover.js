function removeRoute(r)
{

    const markers = markerMap[r];
    if (markers !== undefined)
    {
        /*markers[1].remove();
        markers[0].remove();*/
        console.log(markers.length);
        markers.forEach((marker) => {
            marker.remove();
        });
    }else{
    }

    if (map.getSource(r)) {

        if (map.getLayer(r+'arrows')) {
            map.removeLayer(r+'arrows');
            if (map.getSource(r+'arrows'))
            {
                map.removeSource(r+'arrows');
            }
        }
        if (map.getLayer(r+'_clickRange')) {
            map.removeLayer(r+'_clickRange');
            if (map.getSource(r+'_clickRange'))
            {
                map.removeSource(r+'_clickRange');
            }
        }

        map.removeLayer(r);
        map.removeSource(r);
    }
}