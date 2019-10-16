export const location = function (name, coordinates) {
    return {
        name: name,
        coordinates: coordinates
    }
};

export const coordinates = function (lat, lng) {
    return {
        lat: lat,
        lng: lng
    }
};