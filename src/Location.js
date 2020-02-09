export const location = function (name, addressDetails, tract, coordinates) {
    return {
        name: name,
        addressDetails: addressDetails,
        tract: tract,
        coordinates: coordinates
    }
};

export const coordinates = function (lat, lng) {
    return {
        lat: lat,
        lng: lng
    }
};