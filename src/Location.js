export const location = function (name, tract, coordinates) {
    return {
        name: name,
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