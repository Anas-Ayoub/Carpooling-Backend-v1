const myAPIKey = "f8fea228a45848728018b7870d351eac";
const cityInput = new autocomplete.GeocoderAutocomplete(
    document.getElementById("city"),
    myAPIKey, {
        type: "city",
        skipDetails: true,
        skipIcons: true,
        placeholder: " "
    });

cityInput.on('select', (city) => {
    if (city) {
        cityInput.setValue(city.properties.city || '');
    }
    if (city && city.properties.postcode) {
        postcodeElement.value = city.properties.postcode;
    }
    if (city && city.properties.state) {
        stateInput.setValue(city.properties.state);
    }
    if (city && city.properties.country) {
        countryInput.setValue(city.properties.country);
    }
});